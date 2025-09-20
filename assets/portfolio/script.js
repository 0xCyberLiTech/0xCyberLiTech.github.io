

// Fonction d'échappement XSS globale
// Fonction utilitaire d'échappement XSS pour sécuriser l'affichage des données dynamiques
// Remplace les caractères spéciaux HTML par leur entité pour éviter les injections
const utilEscapeHTML = str => String(str).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

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
        // Nettoyer et tronquer les descriptions pour maintenir l'uniformité parfaite des tuiles
        const cleanedDesc = safeDesc
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
        const truncatedDesc = cleanedDesc.length > 120 ? cleanedDesc.substring(0, 117) + '...' : cleanedDesc;
        const safeUrl = utilEscapeHTML(repo.html_url);
        const safeBranch = utilEscapeHTML(repo.default_branch || 'main');
        tile.innerHTML = renderPromptTile({safeName, safeDesc: truncatedDesc, safeUrl, safeBranch, isNew, daysElapsed});
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
                ${isNew ? `<span class="badge-new tron-glow">NEW</span><span class="days-left tron-glow" style="font-size:0.98em;color:#00fff0;opacity:0.92;">${(30 - daysElapsed).toString().padStart(2, '0')} jours restants</span>` : ''}
            </div>
        </div>
    `;
}

// Récupère les dépôts publics GitHub via l'API et déclenche l'affichage
// Gère les erreurs réseau et filtre les dépôts non pertinents
async function loadRepos() {
    window.__allRepos = [];
    try {
        const response = await fetch('https://api.github.com/users/0xCyberLiTech/repos');
        if (!response.ok) throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        const repos = await response.json();
        const filteredRepos = repos.filter(repo => repo.name !== '0xCyberLiTech.github.io' && repo.name !== '0xCyberLiTech');
        window.__allRepos = filteredRepos;
        renderRepos(filteredRepos);
    } catch (e) {
        console.error('Erreur lors du chargement des dépôts :', e);
        const container = document.getElementById('projects-list');
        if (container) {
            container.innerHTML = `
                <div class="terminal-output error" style="grid-column: 1/-1; text-align: center; padding: 48px 24px;">
                    <div class="terminal-bar">
                        <span class="btn red"></span>
                        <span class="btn yellow"></span>
                        <span class="btn green"></span>
                        <span class="terminal-bar-title">error.log</span>
                    </div>
                    <div class="project-tile-content">
                        <div class="terminal-output project-description">
                            <span class="top-banner__prompt-prompt">!</span>
                            <span>Impossible de charger les repositories GitHub</span>
                        </div>
                        <div class="terminal-output project-description">
                            <span>${e.message || 'Erreur réseau inconnue'}</span>
                        </div>
                    </div>
                </div>
            `;
        }
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