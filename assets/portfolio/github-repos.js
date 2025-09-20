/**
 * GitHub Repositories Manager pour 0xCyberLiTech
 * Récupère et affiche dynamiquement les repositories avec style cyber
 */

class GitHubReposManager {
    constructor(username = '0xCyberLiTech') {
        this.username = username;
        this.apiUrl = `https://api.github.com/users/${username}/repos`;
        this.repos = [];
        this.filteredRepos = [];
        this.currentFilter = 'all';
        this.currentSort = 'updated';
    }

    /**
     * Récupère les repositories depuis l'API GitHub
     */
    async fetchRepositories() {
        try {
            const response = await fetch(`${this.apiUrl}?sort=updated&per_page=100`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const repos = await response.json();
            
            // Filtrer les repos utiles (exclure les forks et repos vides)
            this.repos = repos
                .filter(repo => !repo.fork && repo.size > 0)
                .map(repo => ({
                    name: repo.name,
                    description: repo.description || 'Aucune description disponible',
                    html_url: repo.html_url,
                    language: repo.language || 'N/A',
                    stargazers_count: repo.stargazers_count,
                    forks_count: repo.forks_count,
                    updated_at: repo.updated_at,
                    topics: repo.topics || [],
                    size: repo.size
                }));

            this.filteredRepos = [...this.repos];
            return this.repos;
        } catch (error) {
            console.error('Erreur lors de la récupération des repositories:', error);
            this.displayError();
            return [];
        }
    }

    /**
     * Trie les repositories selon le critère choisi
     */
    sortRepositories(sortBy) {
        this.currentSort = sortBy;
        
        this.filteredRepos.sort((a, b) => {
            switch(sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'stars':
                    return b.stargazers_count - a.stargazers_count;
                case 'updated':
                    return new Date(b.updated_at) - new Date(a.updated_at);
                case 'language':
                    return (a.language || 'ZZZ').localeCompare(b.language || 'ZZZ');
                default:
                    return 0;
            }
        });
    }

    /**
     * Filtre les repositories par langage
     */
    filterByLanguage(language) {
        this.currentFilter = language;
        
        if (language === 'all') {
            this.filteredRepos = [...this.repos];
        } else {
            this.filteredRepos = this.repos.filter(repo => 
                repo.language && repo.language.toLowerCase() === language.toLowerCase()
            );
        }
        
        this.sortRepositories(this.currentSort);
    }

    /**
     * Obtient la liste des langages utilisés
     */
    getLanguages() {
        const languages = [...new Set(this.repos
            .map(repo => repo.language)
            .filter(lang => lang)
        )].sort();
        
        return ['all', ...languages];
    }

    /**
     * Formate la date de dernière mise à jour
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'il y a 01 jour';
        if (diffDays < 30) return `il y a ${diffDays.toString().padStart(2, '0')} jours`;
        if (diffDays < 365) return `il y a ${Math.floor(diffDays / 30).toString().padStart(2, '0')} mois`;
        return `il y a ${Math.floor(diffDays / 365).toString().padStart(2, '0')} an(s)`;
    }

    /**
     * Obtient la couleur du badge selon le langage
     */
    getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'C': '#555555',
            'HTML': '#e34c26',
            'CSS': '#1572B6',
            'Shell': '#89e051',
            'PHP': '#4F5D95',
            'TypeScript': '#2b7489',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Ruby': '#701516',
            'C#': '#239120',
            'Dockerfile': '#384d54'
        };
        return colors[language] || '#00fff0';
    }

    /**
     * Crée le HTML pour un repository
     */
    createRepoHTML(repo) {
        const languageColor = this.getLanguageColor(repo.language);
        // Nettoyer et tronquer les descriptions pour maintenir l'uniformité parfaite
        const rawDesc = repo.description || 'Aucune description disponible';
        
        // Debug: afficher la description brute pour les repos problématiques
        if (repo.name === 'Firewall' || repo.name === 'Smokeping' || repo.name === 'Zabbix') {
            console.log(`DEBUG ${repo.name}: "${rawDesc}"`);
        }
        
        const cleanedDesc = rawDesc
            .replace(/\?\?\?/g, '...') // Remplacer les caractères spéciaux corrompus
            .replace(/\?\?/g, 'é') // Corriger les caractères accentués doubles
            .replace(/cl\?s/g, "clés") // Correction spécifique pour "clés" 
            .replace(/s\?curis\?es/g, "sécurisées") // Correction spécifique pour "sécurisées"
            .replace(/d\?installation/g, "d'installation") // Correction spécifique
            .replace(/param\?tres/g, "paramètres") // Correction spécifique
            .replace(/r\?seau/g, "réseau") // Correction spécifique
            .replace(/\?/g, "è") // Corriger les autres caractères accentués après les corrections spécifiques
            .replace(/\s+/g, ' ') // Normaliser les espaces
            .trim();
            
        // Debug: afficher la description nettoyée
        if (repo.name === 'Firewall' || repo.name === 'Smokeping' || repo.name === 'Zabbix') {
            console.log(`DEBUG ${repo.name} nettoyé: "${cleanedDesc}"`);
        }
            
        const truncatedDesc = cleanedDesc.length > 120 ? cleanedDesc.substring(0, 117) + '...' : cleanedDesc;
        
        return `
            <div class="project-tile github-repo" data-language="${repo.language}" data-stars="${repo.stargazers_count}">
                <div class="scan-effect"></div>
                <div class="terminal-bar">
                    <div class="btn red"></div>
                    <div class="btn yellow"></div>
                    <div class="btn green"></div>
                    <div class="terminal-bar-title">${repo.name}.git</div>
                </div>
                <div class="project-tile-content">
                    <h3 class="linkhub-card-title">${repo.name}</h3>
                    <div class="terminal-output project-description">
                        <span>${truncatedDesc}</span>
                    </div>
                    <div class="github-repo-stats">
                        <div class="repo-stat">
                            <span class="top-banner__prompt-prompt">★</span>
                            <span>${repo.stargazers_count}</span>
                        </div>
                        <div class="repo-stat">
                            <span class="top-banner__prompt-prompt">⑂</span>
                            <span>${repo.forks_count}</span>
                        </div>
                        <div class="repo-stat">
                            <span class="top-banner__prompt-prompt">↻</span>
                            <span>${this.formatDate(repo.updated_at)}</span>
                        </div>
                    </div>
                    <div class="linkhub-project-badges">
                        ${repo.language ? `<span class="linkhub-badge language" style="border-color: ${languageColor}44; color: ${languageColor};">${repo.language}</span>` : ''}
                        ${repo.topics.slice(0, 2).map(topic => 
                            `<span class="linkhub-badge topic">${topic}</span>`
                        ).join('')}
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="btn-readme">
                        <span class="top-banner__prompt-prompt">></span> Repository
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Crée les filtres de contrôle
     */
    createFiltersHTML() {
        const languages = this.getLanguages();
        
        return `
            <div class="github-filters">
                <div class="terminal-output">
                    <div class="terminal-bar">
                        <div class="btn red"></div>
                        <div class="btn yellow"></div>
                        <div class="btn green"></div>
                        <div class="terminal-bar-title">filters.sh</div>
                    </div>
                    <div class="project-tile-content">
                        <div class="filter-controls">
                            <div class="filter-group">
                                <span class="filter-label">Langage:</span>
                                <select id="language-filter" class="cyber-select">
                                    ${languages.map(lang => 
                                        `<option value="${lang}" ${lang === this.currentFilter ? 'selected' : ''}>${lang === 'all' ? 'Tous' : lang}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            <div class="filter-group">
                                <span class="filter-label">Tri:</span>
                                <select id="sort-filter" class="cyber-select">
                                    <option value="updated" ${this.currentSort === 'updated' ? 'selected' : ''}>Récent</option>
                                    <option value="name" ${this.currentSort === 'name' ? 'selected' : ''}>Nom</option>
                                    <option value="stars" ${this.currentSort === 'stars' ? 'selected' : ''}>Étoiles</option>
                                    <option value="language" ${this.currentSort === 'language' ? 'selected' : ''}>Langage</option>
                                </select>
                            </div>
                            <div class="repos-count">
                                <span class="top-banner__prompt-prompt">#</span>
                                <span>${this.filteredRepos.length} repository(s)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Affiche les repositories
     */
    displayRepositories() {
        const container = document.getElementById('github-repos-container');
        const filtersContainer = document.getElementById('github-filters-container');
        
        if (!container) return;

        // Afficher les filtres
        if (filtersContainer) {
            filtersContainer.innerHTML = this.createFiltersHTML();
            this.bindFilterEvents();
        }

        // Afficher les repositories
        if (this.filteredRepos.length === 0) {
            container.innerHTML = '<div class="no-repos">Aucun repository trouvé.</div>';
            return;
        }

        container.innerHTML = this.filteredRepos
            .map(repo => this.createRepoHTML(repo))
            .join('');

        // Ajouter l'animation d'apparition
        setTimeout(() => {
            document.querySelectorAll('.github-repo').forEach((repo, index) => {
                repo.style.animationDelay = `${index * 0.1}s`;
                repo.classList.add('fade-in-repo');
            });
        }, 100);
    }

    /**
     * Lie les événements des filtres
     */
    bindFilterEvents() {
        const languageFilter = document.getElementById('language-filter');
        const sortFilter = document.getElementById('sort-filter');

        if (languageFilter) {
            languageFilter.addEventListener('change', (e) => {
                this.filterByLanguage(e.target.value);
                this.displayRepositories();
            });
        }

        if (sortFilter) {
            sortFilter.addEventListener('change', (e) => {
                this.sortRepositories(e.target.value);
                this.displayRepositories();
            });
        }
    }

    /**
     * Affiche un message d'erreur
     */
    displayError() {
        const container = document.getElementById('github-repos-container');
        if (container) {
            container.innerHTML = `
                <div class="terminal-output error">
                    <div class="terminal-bar">
                        <div class="btn red"></div>
                        <div class="btn yellow"></div>
                        <div class="btn green"></div>
                        <div class="terminal-bar-title">error.log</div>
                    </div>
                    <div class="project-tile-content">
                        <div class="terminal-output project-description">
                            <span class="top-banner__prompt-prompt">!</span>
                            <span>Impossible de charger les repositories GitHub</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Initialise le gestionnaire de repositories
     */
    async init() {
        const loadingContainer = document.getElementById('github-repos-container');
        if (loadingContainer) {
            loadingContainer.innerHTML = `
                <div class="loading-repos">
                    <div class="terminal-output">
                        <div class="project-tile-content">
                            <div class="terminal-output project-description">
                                <span class="top-banner__prompt-prompt">></span>
                                <span>Chargement des repositories GitHub<span class="terminal-cursor">_</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        await this.fetchRepositories();
        this.sortRepositories(this.currentSort);
        this.displayRepositories();
    }
}

// Initialisation automatique
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('github-repos-container')) {
        const reposManager = new GitHubReposManager();
        reposManager.init();
    }
});