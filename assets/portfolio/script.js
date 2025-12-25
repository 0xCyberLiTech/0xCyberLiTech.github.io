/**
 * script.js — Portfolio principal
 *
 * Dépendances :
 *   - ../utils/utils.js (utilEscapeHTML)
 *   - API GitHub (fetch)
 *   - Nécessite <script type="module">
 *
 * Utilisation :
 *   - Affichage dynamique des dépôts GitHub
 *   - Sécurisation XSS via utilEscapeHTML
 */


// Import de la fonction utilitaire d'échappement XSS depuis utils.js
import { utilEscapeHTML } from '../utils/utils.js';

// Cache des éléments DOM fréquemment utilisés
const DOMCache = {
    searchInput: null,
    clearButton: null,
    infoElement: null,
    projectsList: null,
    footer: null,
    preloader: null,
    
    init() {
        this.searchInput = document.getElementById('search-input');
        this.clearButton = document.getElementById('search-clear');
        this.infoElement = document.getElementById('search-results-info');
        this.projectsList = document.getElementById('projects-list');
        this.footer = document.getElementById('site-footer');
        this.preloader = document.getElementById('preloader');
    },
    
    isReady() {
        return this.searchInput && this.clearButton && this.infoElement && this.projectsList;
    }
};

/**
 * Affiche dynamiquement la liste des dépôts GitHub dans la grille du portfolio.
 * Utilise utilEscapeHTML pour sécuriser chaque champ affiché contre les attaques XSS.
 * 
 * @param {Array<Object>} repos - Tableau des repositories GitHub
 * @param {string} repos[].name - Nom du repository
 * @param {string} repos[].description - Description du repository (peut être null)
 * @param {string} repos[].html_url - URL du repository sur GitHub
 * @param {string} repos[].updated_at - Date de dernière modification (ISO 8601)
 * @param {string} repos[].default_branch - Branche par défaut (ex: 'main', 'master')
 * 
 * @returns {void}
 * 
 * @example
 * // Utilisation avec des données API GitHub
 * const repos = [
 *   {
 *     name: "mon-projet",
 *     description: "Un super projet",
 *     html_url: "https://github.com/user/mon-projet",
 *     updated_at: "2023-09-15T10:30:00Z",
 *     default_branch: "main"
 *   }
 * ];
 * renderRepos(repos);
 * 
 * @since 1.0.0
 * @author 0xCyberLiTech
 */
function renderRepos(repos) {
    if (!DOMCache.projectsList) return;
    
    // ⚠️ Toujours utiliser utilEscapeHTML pour toute donnée dynamique injectée dans le DOM !
    DOMCache.projectsList.innerHTML = '';
    if (!repos || repos.length === 0) {
        // ⚠️ Toujours utiliser utilEscapeHTML pour toute donnée dynamique injectée dans le DOM !
        DOMCache.projectsList.innerHTML = '<div style="color:#00fff0;text-align:center;margin:2em auto;">Aucun dépôt public trouvé.</div>';
        return;
    }
    
    repos.forEach(repo => {
        const lastUpdate = new Date(repo.updated_at);
        const now = new Date();
        const daysElapsed = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
        const isNew = daysElapsed <= 30;
        
        const tile = document.createElement('div');
        tile.className = 'project-tile';
        if (isNew) tile.setAttribute('data-new', 'true');
        
        const safeName = utilEscapeHTML(repo.name);
        const safeDesc = utilEscapeHTML(repo.description || 'Aucune description disponible.');
        const safeUrl = utilEscapeHTML(repo.html_url);
        const safeBranch = utilEscapeHTML(repo.default_branch || 'main');
        
        // ⚠️ Toujours utiliser utilEscapeHTML pour toute donnée dynamique injectée dans le DOM !
        tile.innerHTML = renderPromptTile({safeName, safeDesc, safeUrl, safeBranch, isNew, daysElapsed});
        DOMCache.projectsList.appendChild(tile);
    });
}

/**
 * Génère le HTML d'une tuile projet façon terminal avec thème Tron/Cyberpunk.
 * Inclut un badge "NEW" si le projet est récent (moins de 30 jours).
 * 
 * @param {Object} params - Paramètres de la tuile
 * @param {string} params.safeName - Nom du projet (déjà échappé HTML)
 * @param {string} params.safeDesc - Description du projet (échappée HTML)
 * @param {string} params.safeUrl - URL du projet (échappée HTML)
 * @param {string} params.safeBranch - Nom de la branche (échappée HTML)
 * @param {boolean} params.isNew - True si le projet est récent
 * @param {number} params.daysElapsed - Nombre de jours depuis la dernière mise à jour
 * 
 * @returns {string} HTML de la tuile projet prête à être injectée
 * 
 * @example
 * const html = renderPromptTile({
 *   safeName: "mon-projet",
 *   safeDesc: "Description du projet",
 *   safeUrl: "https://github.com/user/projet",
 *   safeBranch: "main",
 *   isNew: true,
 *   daysElapsed: 15
 * });
 * 
 * @since 1.0.0
 * @author 0xCyberLiTech
 */
function renderPromptTile({safeName, safeDesc, safeUrl, safeBranch, isNew, daysElapsed}) {
    return `
        <div class="terminal-bar">
            <span class="btn red"></span>
            <span class="btn yellow"></span>
            <span class="btn green"></span>
            <span class="terminal-bar-title">kali@root:~$</span>
        </div>
        <div class="project-tile-content">
            <div class="terminal-prompt tron-terminal">
                <div class="tron-prompt-line1"><span class="prompt-user tron-prompt-user">◢◤ <span class="tron-username">0xCyberLiTech</span></span></div>
                <div class="tron-prompt-line2"><span class="tron-at">@</span> <span class="tron-host">TRON-CORE</span></div>
                <div class="tron-prompt-line3"><span class="tron-path">[~/grid/${safeName}]</span></div>
                <span class="prompt-command tron-prompt-command">◢◤ <span class="tron-cmd">$</span> <span class="tron-cmdline">ls -la</span></span>
            </div>
            <h3><a href="${safeUrl}/blob/${safeBranch}/README.md" style="color:inherit;text-decoration:none;">${safeName}</a></h3>
            <p class="terminal-output project-description">${safeDesc}</p>
            <div class="infos" style="display:flex;align-items:center;gap:0.7em;justify-content:space-between;">
                ${isNew ? `<span class="badge-new tron-glow">NEW</span><span class="days-left tron-glow" style="font-size:0.98em;color:#00fff0;opacity:0.92;">${30 - daysElapsed}j restantes</span>` : ''}
            </div>
        </div>
    `;
}

/**
 * Moteur de recherche pour filtrer les repositories par nom et description.
 * Effectue une recherche insensible à la casse dans les titres et descriptions.
 * 
 * @param {Array<Object>} repos - Tableau des repositories à filtrer
 * @param {string} searchTerm - Terme de recherche (insensible à la casse)
 * @returns {Array<Object>} Repositories filtrés correspondant au terme de recherche
 * 
 * @example
 * const results = searchRepos(window.__allRepos, 'python');
 * renderRepos(results);
 * 
 * @since 1.2.0
 * @author 0xCyberLiTech
 */
function searchRepos(repos, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return repos; // Retourne tous les repos si pas de terme de recherche
    }
    
    const term = searchTerm.toLowerCase().trim();
    
    return repos.filter(repo => {
        const name = (repo.name || '').toLowerCase();
        const description = (repo.description || '').toLowerCase();
        
        // Recherche dans le nom ET dans la description
        return name.includes(term) || description.includes(term);
    });
}

/**
 * Met à jour l'affichage des informations de recherche.
 * Affiche le nombre de résultats et le terme recherché.
 * Pour les erreurs (aucun résultat), affiche temporairement le message dans le champ.
 * 
 * @param {number} totalResults - Nombre total de résultats
 * @param {number} filteredResults - Nombre de résultats filtrés
 * @param {string} searchTerm - Terme de recherche actuel
 * 
 * @since 1.2.0
 * @author 0xCyberLiTech
 */
function updateSearchInfo(totalResults, filteredResults, searchTerm) {
    if (!DOMCache.infoElement || !DOMCache.searchInput) return;
    
    if (!searchTerm || searchTerm.trim() === '') {
        // État initial : pas de message d'info
        DOMCache.infoElement.textContent = '';
    } else {
        const term = utilEscapeHTML(searchTerm);
        if (filteredResults === 0) {
            // Aucun résultat : afficher temporairement dans le champ
            showErrorInField(DOMCache.searchInput, `Aucun résultat pour "${searchTerm}"`); 
            DOMCache.infoElement.textContent = ''; // Pas de message sous le champ
        } else {
            // Résultats trouvés : message dans la zone info
            const safeTerm = utilEscapeHTML(term);
            // ⚠️ Toujours utiliser utilEscapeHTML pour toute donnée dynamique injectée dans le DOM !
            DOMCache.infoElement.innerHTML = `${filteredResults} résultat${filteredResults > 1 ? 's' : ''} pour "<span style="color: var(--tron-orange);">${safeTerm}</span>"`;
            DOMCache.infoElement.style.color = 'var(--tron-cyan)';
            DOMCache.infoElement.style.textAlign = 'center';
        }
    }
}

/**
 * Affiche temporairement un message d'erreur dans le champ de recherche.
 * Le message remplace le texte saisi pendant 3 secondes puis le champ redevient vide.
 * 
 * @param {HTMLInputElement} inputElement - L'élément input du champ de recherche
 * @param {string} errorMessage - Le message d'erreur à afficher
 * 
 * @since 1.2.0
 * @author 0xCyberLiTech
 */
function showErrorInField(inputElement, errorMessage) {
    // Annuler le précédent timeout s'il existe
    if (window.searchErrorTimeout) {
        clearTimeout(window.searchErrorTimeout);
    }
    
    // Afficher le message d'erreur dans le champ
    inputElement.value = errorMessage;
    inputElement.style.color = 'var(--tron-orange)';
    inputElement.readOnly = true; // Empêcher la modification pendant l'affichage
    
    // Masquer le bouton clear pendant l'affichage du message
    if (DOMCache.clearButton) {
        DOMCache.clearButton.style.opacity = '0';
    }
    
    // Vider le champ et revenir à l'état initial après 3 secondes
    window.searchErrorTimeout = setTimeout(() => {
        inputElement.value = ''; // Vider le champ au lieu de restaurer le texte
        inputElement.style.color = '#00fff0'; // Restaurer la couleur cyan
        inputElement.readOnly = false; // Permettre à nouveau la saisie
        inputElement.focus(); // Remettre le focus
        
        // Afficher tous les repos (état initial)
        if (window.__allRepos && Array.isArray(window.__allRepos)) {
            renderRepos(window.__allRepos);
        }
        
        // Vider la zone d'information
        if (DOMCache.infoElement) {
            DOMCache.infoElement.textContent = '';
        }
        
        window.searchErrorTimeout = null;
    }, 3000);
}

/**
 * Affiche un message d'aide quand moins de 3 caractères sont saisis.
 * Le message apparaît sous le champ de recherche pour ne pas interrompre la saisie.
 * 
 * @param {number} currentLength - Nombre de caractères actuellement saisis
 * 
 * @since 1.2.0
 * @author 0xCyberLiTech
 */
function updateSearchInfoMinChars(currentLength) {
    if (!DOMCache.infoElement) return;
    
    const remaining = 3 - currentLength;
    DOMCache.infoElement.textContent = `Encore ${remaining} caractère${remaining > 1 ? 's' : ''} pour lancer la recherche`;
    DOMCache.infoElement.style.color = '#00fff0'; // Cyan vif pour une meilleure visibilité
    DOMCache.infoElement.style.opacity = '1'; // Opacité maximale
}

/**
 * Initialise le moteur de recherche avec les écouteurs d'événements.
 * Configure la recherche en temps réel et le bouton d'effacement.
 * 
 * @since 1.2.0
 * @author 0xCyberLiTech
 */
function initializeSearch() {
    if (!DOMCache.searchInput || !DOMCache.clearButton) return;
    
    // Recherche en temps réel avec debounce
    let searchTimeout;
    DOMCache.searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        
        // Annuler le timeout d'erreur si l'utilisateur tape à nouveau
        if (window.searchErrorTimeout) {
            clearTimeout(window.searchErrorTimeout);
            window.searchErrorTimeout = null;
            DOMCache.searchInput.readOnly = false;
            DOMCache.searchInput.style.color = '#00fff0';
        }
        
        // Afficher/masquer le bouton clear
        DOMCache.clearButton.style.opacity = searchTerm ? '1' : '0';
        
        // Debounce pour éviter trop d'appels
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(searchTerm);
        }, 300);
    });
    
    // Bouton pour effacer la recherche
    DOMCache.clearButton.addEventListener('click', () => {
        // Annuler le timeout d'erreur si actif
        if (window.searchErrorTimeout) {
            clearTimeout(window.searchErrorTimeout);
            window.searchErrorTimeout = null;
        }
        
        DOMCache.searchInput.value = '';
        DOMCache.clearButton.style.opacity = '0';
        DOMCache.searchInput.readOnly = false;
        DOMCache.searchInput.style.color = '#00fff0';
        
        // Vider la zone d'information
        if (DOMCache.infoElement) {
            DOMCache.infoElement.textContent = '';
        }
        
        performSearch(''); // Afficher tous les repos
        DOMCache.searchInput.focus();
    });
    
    // Raccourci clavier pour focus sur la recherche (Ctrl+K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            DOMCache.searchInput.focus();
        }
    });
    
    // Focus automatique sur la recherche avec effet visuel
    DOMCache.searchInput.addEventListener('focus', () => {
        DOMCache.searchInput.style.boxShadow = '0 0 25px rgba(0, 255, 240, 0.5)';
        DOMCache.searchInput.style.borderColor = 'var(--tron-orange)';
    });
    
    DOMCache.searchInput.addEventListener('blur', () => {
        DOMCache.searchInput.style.boxShadow = '0 0 15px rgba(0, 255, 240, 0.3)';
        DOMCache.searchInput.style.borderColor = 'var(--tron-cyan)';
    });
    
    // Stocker le timeout pour pouvoir l'annuler
    window.searchErrorTimeout = null;
}

/**
 * Effectue la recherche et met à jour l'affichage.
 * Ne déclenche la recherche que si le terme fait 3 caractères ou plus,
 * ou si le terme est vide (pour réinitialiser).
 * 
 * @param {string} searchTerm - Terme de recherche
 * 
 * @since 1.2.0
 * @author 0xCyberLiTech
 */
function performSearch(searchTerm) {
    if (!window.__allRepos || !Array.isArray(window.__allRepos)) {
        console.warn('Aucun repository chargé pour la recherche');
        return;
    }
    
    const trimmedTerm = searchTerm.trim();
    
    // Ne rechercher que si:
    // - Le terme est vide (réinitialisation)
    // - Le terme fait 3 caractères ou plus
    if (trimmedTerm === '' || trimmedTerm.length >= 3) {
        const filteredRepos = searchRepos(window.__allRepos, searchTerm);
        renderRepos(filteredRepos);
        updateSearchInfo(window.__allRepos.length, filteredRepos.length, searchTerm);
    } else {
        // Afficher un message d'aide si moins de 3 caractères
        updateSearchInfoMinChars(trimmedTerm.length);
    }
}

/**
 * Récupère les dépôts publics GitHub via l'API et déclenche l'affichage.
 * Gère les erreurs réseau, filtre les repositories non pertinents et
 * stocke les données dans window.__allRepos pour usage global.
 * 
 * @async
 * @function
 * 
 * @throws {Error} Erreur HTTP si la requête API échoue
 * @throws {Error} Erreur réseau si pas de connexion
 * 
 * @returns {Promise<void>} Promise qui se résout quand les repositories sont chargés et affichés
 * 
 * @example
 * // Chargement automatique au démarrage
 * await loadRepos();
 * console.log('Repositories chargés:', window.__allRepos);
 * 
 * @description
 * Cette fonction :
 * 1. Initialise window.__allRepos comme tableau vide
 * 2. Fait un appel fetch vers l'API GitHub
 * 3. Filtre les repositories (exclut le portfolio lui-même)
 * 4. Appelle renderRepos() pour afficher les résultats
 * 5. Gère les erreurs avec une alerte utilisateur
 * 
 * @see {@link https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user}
 * 
 * @since 1.0.0
 * @author 0xCyberLiTech
 */
async function loadRepos() {
    window.__allRepos = [];
    try {
        const response = await fetch('https://api.github.com/users/0xCyberLiTech/repos');
        if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        const repos = await response.json();
        const filteredRepos = repos.filter(repo => repo.name !== '0xCyberLiTech.github.io' && repo.name !== '0xCyberLiTech');
        window.__allRepos = filteredRepos;
        renderRepos(filteredRepos);
        
        // Initialiser le moteur de recherche après le chargement des repos
        initializeSearch();
        updateSearchInfo(filteredRepos.length, filteredRepos.length, '');
    } catch (e) {
        alert('Erreur lors du chargement des dépôts : ' + (e.message || e));
    }
}

/**
 * Initialisation principale du portfolio au chargement de la page.
 * Gère le fade-in du body, le chargement des repositories GitHub,
 * et l'affichage conditionnel du footer après la transition du preloader.
 * 
 * @listens window:DOMContentLoaded
 * 
 * @description
 * Processus d'initialisation :
 * 1. Active le fade-in du body pour éviter le flash blanc
 * 2. Démarre le chargement des repositories GitHub
 * 3. Configure l'affichage différé du footer (après preloader)
 * 4. Utilise un MutationObserver pour surveiller la fin du preloader
 * 5. Fallback temporisé si pas de preloader détecté
 * 
 * @example
 * // L'événement se déclenche automatiquement
 * // Aucune intervention manuelle nécessaire
 * 
 * @since 1.0.0
 * @author 0xCyberLiTech
 */
window.addEventListener('DOMContentLoaded', () => {
    // Fade-in du body pour éviter le flash blanc
    document.body.style.opacity = '1';
    document.body.classList.add('fade-in');
    setTimeout(() => document.body.classList.remove('fade-in'), 1200);
    
    // Initialiser le cache DOM et le moteur de recherche
    DOMCache.init();
    if (DOMCache.isReady()) {
        initializeSearch();
    }
    
    loadRepos();

    // === GESTION DU FOOTER ===
    // Le footer doit s'afficher seulement après la transition du preloader
    // pour éviter qu'il apparaisse pendant l'animation de chargement
    const footer = DOMCache.footer;
    if (footer) {
        // 1. Masquer le footer initialement
        footer.style.display = 'none';
        
        // 2. Observer les changements du preloader
        const preloader = DOMCache.preloader;
        if (preloader) {
            // Utilise MutationObserver pour détecter quand le preloader se termine
            const observer = new MutationObserver(() => {
                // Vérifie si le preloader est masqué (fin de l'animation)
                if (preloader.style.display === 'none' || 
                    preloader.style.opacity === '0' || 
                    preloader.hidden) {
                    // Afficher le footer et arrêter l'observation
                    footer.style.display = '';
                    observer.disconnect();
                }
            });
            // Observer les changements d'attributs style et hidden
            observer.observe(preloader, { 
                attributes: true, 
                attributeFilter: ['style', 'hidden'] 
            });
        } else {
            // Fallback : si pas de preloader détecté, afficher après délai
            setTimeout(() => { 
                footer.style.display = ''; 
            }, 600);
        }
    }

    // Suppression de la gestion d'opacité du bandeau : il reste toujours opaque
});