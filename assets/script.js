
// Recherche dynamique sur les dépôts (filtre uniquement sur le nom)
function filterAndRenderRepos() {
    const searchInput = document.getElementById('search-repos');
    if (!searchInput || !window.__allRepos) {
        return;
    }
    const q = searchInput.value.trim().toLowerCase();
    if (q.length > 0 && q.length < 3) {
        renderRepos(window.__allRepos);
        return;
    }
    let filtered = window.__allRepos;
    if (q.length >= 3) {
        filtered = window.__allRepos.filter(repo =>
            repo.name.toLowerCase().includes(q)
        );
    }
    renderRepos(filtered);
}

// Rendu des tuiles de dépôts (projets et tuile "aucun dépôt")
function renderRepos(repos) {
    const container = document.getElementById('projects-list');
    const searchInput = document.getElementById('search-repos');
    container.innerHTML = '';
    if (repos.length === 0) {
        // Recherche infructueuse : garder les tuiles précédentes, afficher un message dans le champ
        const searchInput = document.getElementById('search-repos');
        if (searchInput) {
            const oldPlaceholder = searchInput.placeholder;
            searchInput.value = '';
            searchInput.placeholder = 'Aucun résultat';
            // Affiche le message 'Aucun résultat' 3 secondes, puis remet 'Recherche'
            renderRepos(window.__allRepos);
            setTimeout(() => {
                searchInput.placeholder = oldPlaceholder;
            }, 3000);
        }
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
        tile.innerHTML = `
            <div class="project-tile-content">
                <div class="terminal-prompt tron-terminal">
                    <div class="tron-prompt-line1"><span class="prompt-user tron-prompt-user">◢◤ <span class="tron-username">0xCyberLiTech</span></span></div>
                    <div class="tron-prompt-line2"><span class="tron-at">@</span> <span class="tron-host">TRON-CORE</span></div>
                    <div class="tron-prompt-line3"><span class="tron-path">[~/grid/${repo.name}]</span></div>
                    <span class="prompt-command tron-prompt-command">◢◤ <span class="tron-cmd">$</span> <span class="tron-cmdline">ls -la</span></span>
                </div>
                <h3><a href="${repo.html_url}/blob/${repo.default_branch || 'main'}/README.md" target="_blank" style="color:inherit;text-decoration:none;">${repo.name}</a></h3>
                <p class="terminal-output project-description"></p>
                <div class="infos" style="display:flex;align-items:center;gap:0.7em;justify-content:space-between;">
                    ${isNew ? `<span class="badge-new tron-glow">NEW</span><span class="days-left tron-glow" style="font-size:0.98em;color:#00fff0;opacity:0.92;">${30 - daysElapsed}j restantes</span>` : ''}
                </div>
            </div>
        `;
        container.appendChild(tile);
        // Effet scan : tout le texte est visible, une lettre surlignée en vert défile
        const descElem = tile.querySelector('.terminal-output');
        const desc = `# ${repo.description || 'Aucune description disponible.'}`;
        descElem.innerHTML = desc.split('').map((c, idx) => `<span data-idx="${idx}">${c}</span>`).join('');
        const spans = descElem.querySelectorAll('span');
        let scanIdx = 0;
        let scanInterval = null;
        function clearScan() {
            spans.forEach(s => {
                s.style.color = '';
                s.style.background = '';
                s.style.textShadow = '';
                s.style.animation = '';
            });
        }
        function scanEffect() {
            clearScan();
            if (spans[scanIdx]) {
                spans[scanIdx].style.color = '#00fff0'; // cyan harmonieux
                spans[scanIdx].style.background = 'none';
                spans[scanIdx].style.textShadow = '0 0 14px #00fff0, 0 0 4px #fff, 0 0 2px #00fff0';
                spans[scanIdx].style.animation = 'scan-blink 0.32s alternate infinite';
            }
            scanIdx = (scanIdx + 1) % spans.length;
        }
        tile.addEventListener('mouseenter', () => {
            if (!scanInterval) {
                scanIdx = 0;
                scanInterval = setInterval(scanEffect, 120);
            }
        });
        tile.addEventListener('mouseleave', () => {
            clearInterval(scanInterval);
            scanInterval = null;
            clearScan();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-repos');
    if (searchInput) {
        searchInput.addEventListener('input', filterAndRenderRepos);
    }
});

// Récupération des dépôts GitHub et affichage des tuiles (sans barre LED)
async function loadRepos() {
    window.__allRepos = [];
    try {
        const response = await fetch('https://api.github.com/users/0xCyberLiTech/repos');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - ${response.statusText}`);
        }
        const repos = await response.json();
        // Filtrer pour exclure le dépôt GitHub Pages et le dépôt logo
        const filteredRepos = repos.filter(repo => 
            repo.name !== '0xCyberLiTech.github.io' && 
            repo.name !== '0xCyberLiTech'
        );
        window.__allRepos = filteredRepos;
        filterAndRenderRepos();


// --- RENDU DES TUILES DE DÉPÔTS ---
    } catch (e) {
        alert('Erreur lors du chargement des dépôts : ' + (e.message || e));
    }
}

window.addEventListener('DOMContentLoaded', loadRepos);

// --- Effet de transparence dynamique sur le bandeau du haut (jamais assombri lors d'un scroll rapide vers le haut) ---
(function() {
    const banner = document.querySelector('.top-banner');
    if (!banner) return;
    let hasScrolled = false;
    let lastScrollY = window.scrollY;
    function updateBannerOpacity() {
        // Si on remonte très vite (scroll instantané), on garde opacité 1
        if (window.scrollY <= 2 && hasScrolled && lastScrollY - window.scrollY < 50) {
            banner.style.transition = 'background 0.3s, opacity 0.3s';
            banner.style.opacity = '1';
        } else if (window.scrollY <= 2 && hasScrolled) {
            banner.style.transition = 'background 0.3s, opacity 0.3s';
            banner.style.opacity = '0.5';
        } else {
            banner.style.transition = 'background 0.3s, opacity 0.3s';
            banner.style.opacity = '1';
            if (window.scrollY > 2) hasScrolled = true;
        }
        lastScrollY = window.scrollY;
    }
    window.addEventListener('scroll', updateBannerOpacity);
    banner.style.opacity = '1'; // Toujours visible au chargement
})();

// Bloc unique pour l'initialisation du portfolio, du footer et du bandeau
window.addEventListener('DOMContentLoaded', () => {
    // Fade-in du body pour éviter le flash blanc
    document.body.style.opacity = '1';

    // Apparition harmonieuse du contenu du portfolio
    document.body.classList.add('fade-in');
    setTimeout(() => {
        document.body.classList.remove('fade-in');
    }, 1200);

    // Affichage des projets
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
            setTimeout(() => {
                footer.style.display = '';
            }, 600); // délai pour laisser la transition se terminer
        }
    }

    // Gestion de l'opacité du bandeau
    const banner = document.querySelector('.top-banner');
    if (banner) {
        let hasScrolled = false;
        let lastScrollY = window.scrollY;
        function updateBannerOpacity() {
            if (window.scrollY <= 2 && hasScrolled && lastScrollY - window.scrollY < 50) {
                banner.style.transition = 'background 0.3s, opacity 0.3s';
                banner.style.opacity = '1';
            } else if (window.scrollY <= 2 && hasScrolled) {
                banner.style.transition = 'background 0.3s, opacity 0.3s';
                banner.style.opacity = '0.5';
            } else {
                banner.style.transition = 'background 0.3s, opacity 0.3s';
                banner.style.opacity = '1';
                if (window.scrollY > 2) hasScrolled = true;
            }
            lastScrollY = window.scrollY;
        }
        window.addEventListener('scroll', updateBannerOpacity);
        banner.style.opacity = '1';
    }
});