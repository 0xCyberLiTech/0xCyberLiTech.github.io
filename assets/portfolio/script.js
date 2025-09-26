/**
 * script.js — Portfolio principal
 *
 * Dépendances :
 *   - ../utils/utils.js (utilEscapeHTML)
 *   - API GitHub (fetch)
 *   - Nécessite <script type="module">
 *   - Optionnel : modal.js pour affichage de modale
 *
 * Utilisation :
 *   - Affichage dynamique des dépôts GitHub
 *   - Sécurisation XSS via utilEscapeHTML
 *   - Peut ouvrir un modal via openModal()
 */


// Import de la fonction utilitaire d'échappement XSS depuis utils.js
import { utilEscapeHTML } from '../utils/utils.js';

// Affiche dynamiquement la liste des dépôts GitHub dans la grille du portfolio
// Utilise utilEscapeHTML pour sécuriser chaque champ affiché
function renderRepos(repos) {
    const container = document.getElementById('projects-list');
    if (!container) return;
    container.innerHTML = '';
    if (!repos || repos.length === 0) {
        container.innerHTML = '<div style="color:#00fff0;text-align:center;margin:2em auto;">Aucun dépôt public trouvé.</div>';
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
        tile.innerHTML = renderPromptTile({safeName, safeDesc, safeUrl, safeBranch, isNew, daysElapsed});
        container.appendChild(tile);
    });
}

// Génère le HTML d'une tuile projet façon terminal, avec badge NEW si récent
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

// Récupère les dépôts publics GitHub via l'API et déclenche l'affichage
// Gère les erreurs réseau et filtre les dépôts non pertinents
async function loadRepos() {
    window.__allRepos = [];
    
    // Vérifier le cache local d'abord
    const cachedData = localStorage.getItem('github-repos-cache');
    const cacheTime = localStorage.getItem('github-repos-cache-time');
    const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
    
    if (cachedData && cacheTime && (Date.now() - parseInt(cacheTime)) < CACHE_DURATION) {
        console.log('[INFO] Utilisation du cache local');
        const repos = JSON.parse(cachedData);
        window.__allRepos = repos;
        renderRepos(repos);
        return;
    }

    // Fonction fallback pour charger les données statiques
    async function loadStaticRepos() {
        try {
            const response = await fetch('/data/repos.json');
            if (response.ok) {
                const staticRepos = await response.json();
                console.log('[INFO] Utilisation des données statiques');
                return staticRepos;
            }
        } catch (e) {
            console.warn('[WARNING] Impossible de charger les données statiques:', e);
        }
        return [];
    }
    
    try {
        const response = await fetch('https://api.github.com/users/0xCyberLiTech/repos', {
            headers: {
                'User-Agent': '0xCyberLiTech-Portfolio',
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        if (!response.ok) {
            // Récupérer les détails du rate limit si disponibles
            const rateLimitRemaining = response.headers.get('X-RateLimit-Remaining');
            const rateLimitReset = response.headers.get('X-RateLimit-Reset');
            let errorMsg = `HTTP ${response.status} - ${response.statusText}`;
            
            if (response.status === 403 && rateLimitRemaining === '0') {
                const resetTime = new Date(rateLimitReset * 1000);
                errorMsg += ` | Rate limit atteinte. Réessayez après ${resetTime.toLocaleTimeString()}`;
            }
            
            throw new Error(errorMsg);
        }
        const repos = await response.json();
        const filteredRepos = repos.filter(repo => repo.name !== '0xCyberLiTech.github.io' && repo.name !== '0xCyberLiTech');
        window.__allRepos = filteredRepos;
        
        // Mettre en cache les données
        localStorage.setItem('github-repos-cache', JSON.stringify(filteredRepos));
        localStorage.setItem('github-repos-cache-time', Date.now().toString());
        
        console.log('[DEBUG] Dépôts récupérés:', filteredRepos.map(r => r.name));
        renderRepos(filteredRepos);
    } catch (e) {
        console.error('[ERREUR] Chargement des dépôts GitHub:', e);
        
        // En cas d'erreur, essayer d'utiliser le cache même expiré
        const cachedData = localStorage.getItem('github-repos-cache');
        if (cachedData) {
            console.log('[INFO] Utilisation du cache expiré en fallback');
            const repos = JSON.parse(cachedData);
            window.__allRepos = repos;
            renderRepos(repos);
            
            const container = document.getElementById('projects-list');
            if (container) {
                // Ajouter un message d'avertissement
                const warning = document.createElement('div');
                warning.style.cssText = 'color:#ff9500;text-align:center;margin:1em auto;font-size:0.9em;';
                warning.textContent = '⚠️ Données mises en cache (API GitHub temporairement indisponible)';
                container.insertBefore(warning, container.firstChild);
            }
            return;
        }

        // Fallback final : utiliser les données statiques
        const staticRepos = await loadStaticRepos();
        if (staticRepos.length > 0) {
            window.__allRepos = staticRepos;
            renderRepos(staticRepos);
            
            const container = document.getElementById('projects-list');
            if (container) {
                const warning = document.createElement('div');
                warning.style.cssText = 'color:#ff9500;text-align:center;margin:1em auto;font-size:0.9em;';
                warning.textContent = '⚠️ Données statiques (API GitHub indisponible)';
                container.insertBefore(warning, container.firstChild);
            }
            return;
        }
        
        const container = document.getElementById('projects-list');
        if (container) container.innerHTML = '<div style="color:#ff0055;text-align:center;margin:2em auto;">Erreur lors du chargement des dépôts GitHub.<br>' + (e.message || e) + '<br><br><small>Conseil : Rafraîchissez la page dans quelques minutes.</small></div>';
    }
}

// Initialisation unique du portfolio, du footer et du bandeau

// Initialisation du portfolio au chargement de la page
// Gère le fade-in, le chargement des dépôts et l'affichage conditionnel du footer
window.addEventListener('DOMContentLoaded', () => {
    // Fade-in du body pour éviter le flash blanc
    document.body.style.opacity = '1';
    document.body.classList.add('fade-in');
    setTimeout(() => document.body.classList.remove('fade-in'), 1200);
    loadRepos();

    // Moteur de recherche dynamique sur les projets (titre et description)
    const searchInput = document.getElementById('search-repo');
    if (searchInput) {
        let lastSearchId = 0;
        searchInput.addEventListener('input', async function () {
            const query = this.value.trim().toLowerCase();
            if (query.length < 3) {
                renderRepos(window.__allRepos || []);
                return;
            }
            // Recherche dans titre/description
            let filtered = (window.__allRepos || []).filter(repo => {
                const name = (repo.name || '').toLowerCase();
                const desc = (repo.description || '').toLowerCase();
                return name.includes(query) || desc.includes(query);
            });
            // Recherche avancée dans les fichiers si au moins 4 caractères
            if (query.length >= 4) {
                const container = document.getElementById('projects-list');
                if (container) container.innerHTML = '<div style="color:#00fff0;text-align:center;margin:2em auto;">Recherche dans les fichiers des dépôts...</div>';
                const searchId = ++lastSearchId;
                let foundRepos = [];
                for (const repo of window.__allRepos || []) {
                    // Limite à 10 dépôts pour éviter l'abus
                    if (foundRepos.length >= 10) break;
                    try {
                        const files = await listRepoFiles('0xCyberLiTech', repo.name);
                        if (!files || !files.length) {
                            console.warn(`Aucun fichier trouvé dans le dépôt ${repo.name}`);
                        } else {
                            console.log(`Fichiers trouvés dans ${repo.name}:`, files.map(f => f.path));
                        }
                        for (const file of files) {
                            // Recherche sur le nom du fichier
                            if ((file.path || '').toLowerCase().includes(query)) {
                                console.log(`[MATCH NOM] ${repo.name} : ${file.path}`);
                                foundRepos.push({ ...repo, __matchedFile: file.path });
                                break;
                            } else {
                                console.log(`[TEST NOM] ${repo.name} : ${file.path}`);
                            }
                            if (file.size > 50000) continue; // Ignore gros fichiers
                            const content = await fetchFileContent('0xCyberLiTech', repo.name, file.path, repo.default_branch || 'main');
                            if (content && content.toLowerCase().includes(query)) {
                                console.log(`[MATCH CONTENU] ${repo.name} : ${file.path}`);
                                foundRepos.push({ ...repo, __matchedFile: file.path });
                                break;
                            } else {
                                console.log(`[TEST CONTENU] ${repo.name} : ${file.path}`);
                            }
                        }
                    } catch (e) { /* ignore */ }
                }
                // Si l'utilisateur a tapé autre chose entre temps, on annule l'affichage
                if (searchId !== lastSearchId) return;
                // Fusionne les résultats sans doublons (priorité aux fichiers trouvés)
                const filteredIds = new Set(filtered.map(r => r.id));
                const merged = [...foundRepos, ...filtered.filter(r => !filteredIds.has(r.id))];
                if (merged.length > 0) {
                    renderRepos(merged, query);
                } else if (container) {
                    container.innerHTML = '<div style="color:#00fff0;text-align:center;margin:2em auto;">Aucun résultat dans les fichiers des dépôts.<br><span style="color:#ff0055;font-size:0.95em;">(Vérifiez la console pour les détails)</span></div>';
                }
            } else {
                renderRepos(filtered);
            }
        });
    }

    // Liste récursive des fichiers d'un dépôt (API GitHub)
    async function listRepoFiles(owner, repo, path = '') {
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        console.log(`[API] listRepoFiles: ${url}`);
        let resp;
        try {
            resp = await fetch(url, {
                headers: {
                    'User-Agent': '0xCyberLiTech-Portfolio',
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
        } catch (err) {
            console.error(`[ERREUR] Appel API GitHub échoué: ${url}`, err);
            return [];
        }
        if (!resp.ok) {
            if (resp.status === 403) {
                console.warn(`[RATE LIMIT] API GitHub rate limit atteinte pour: ${url}`);
            } else {
                console.error(`[ERREUR] API GitHub: ${url} => ${resp.status} ${resp.statusText}`);
            }
            return [];
        }
        const data = await resp.json();
        let files = [];
        for (const item of data) {
            if (item.type === 'file') files.push(item);
            else if (item.type === 'dir') {
                const subFiles = await listRepoFiles(owner, repo, item.path);
                files = files.concat(subFiles);
            }
        }
        return files;
    }

    // Récupère le contenu brut d'un fichier (API GitHub), branche paramétrable
    async function fetchFileContent(owner, repo, path, branch) {
        const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
        try {
            const resp = await fetch(url, {
                headers: {
                    'User-Agent': '0xCyberLiTech-Portfolio'
                }
            });
            if (!resp.ok) {
                if (resp.status === 403) {
                    console.warn(`[RATE LIMIT] Raw GitHub rate limit atteinte pour: ${url}`);
                }
                return '';
            }
            return await resp.text();
        } catch {
            return '';
        }
    }

    // Surcharge renderRepos pour afficher le nom du fichier trouvé si présent
    const origRenderRepos = renderRepos;
    function renderRepos(repos, query) {
        if (!Array.isArray(repos)) return origRenderRepos(repos);
        if (repos.length && repos[0].__matchedFile) {
            const container = document.getElementById('projects-list');
            container.innerHTML = '';
            repos.forEach(repo => {
                const tile = document.createElement('div');
                tile.className = 'project-tile';
                tile.innerHTML = `<div style="margin-bottom:0.5em;color:#00fff0;font-size:1em;">Fichier trouvé : <b>${utilEscapeHTML(repo.__matchedFile)}</b></div>` +
                    origRenderRepos([repo]);
                container.appendChild(tile);
            });
        } else {
            origRenderRepos(repos);
        }
    }

    // Gestion du footer : il ne s'affiche qu'après la transition du preloader ou après un court délai
    const footer = document.getElementById('site-footer');
    if (footer) {
        footer.style.display = 'none';
        const preloader = document.getElementById('preloader');
        if (preloader) {
            const observer = new MutationObserver(() => {
                if (preloader.style.display === 'none' || preloader.style.opacity === '0' || preloader.hidden) {
                    footer.style.display = '';
                    observer.disconnect();
                }
            });
            observer.observe(preloader, { attributes: true, attributeFilter: ['style', 'hidden'] });
        } else {
            setTimeout(() => { footer.style.display = ''; }, 600);
        }
    }

    // Suppression de la gestion d'opacité du bandeau : il reste toujours opaque
});