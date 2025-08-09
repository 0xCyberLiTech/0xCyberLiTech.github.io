
// Recherche dynamique sur les dépôts (filtre uniquement sur le nom)
function filterAndRenderRepos() {
    const searchInput = document.getElementById('search-repos');
    if (!searchInput || !window.__allRepos) return;
    const q = searchInput.value.trim().toLowerCase();
    const filtered = window.__allRepos.filter(repo => repo.name.toLowerCase().includes(q));
    renderRepos(filtered);
}

// Rendu des tuiles de dépôts (projets et tuile "aucun dépôt")
function renderRepos(repos) {
    const container = document.getElementById('projects-list');
    const errorMessage = document.getElementById('error-message');
    container.innerHTML = '';
    errorMessage.style.display = 'none';
    if (repos.length === 0) {
        errorMessage.style.display = 'block';
        errorMessage.innerHTML = `
            <div class="project-tile no-repo-tile">
                <div class="project-tile-content">
                    <div class="terminal-prompt">
                        <span class="prompt-user">┌──(0xCyberLiTech㉿kali)-[~/portfolio]</span>
                        <span class="prompt-command">└─$ ls -la ~/repositories/public</span>
                    </div>
                    <h3><a href="#" tabindex="-1" style="color:inherit;text-decoration:none;pointer-events:none;">Aucun dépôt trouvé</a></h3>
                    <p class="terminal-output no-repo-desc"></p>
                    <div class="infos">
                        <span title="Stars">★ 0</span>
                        <span title="Forks">⑂ 0</span>
                        <span title="Issues">⚠ 0</span>
                        <span class="date">-</span>
                    </div>
                    <div class="scan-effect"></div>
                </div>
            </div>
        `;
        // Effet machine à écrire + lumière sur le message d’absence
        const noRepoDescElem = errorMessage.querySelector('.no-repo-desc');
        const noRepoDescText = '# Vérifiez l’orthographe ou explorez mes autres projets sur GitHub. Vous pouvez aussi réinitialiser la recherche.';
        noRepoDescElem.innerHTML = noRepoDescText.split('').map(c => `<span>${c}</span>`).join('');
        let noRepoScanIndex = 0;
        let noRepoScanInterval = null;
        function startNoRepoMatrixScan() {
            const spans = noRepoDescElem.querySelectorAll('span');
            if (!spans.length) return;
            noRepoScanInterval = setInterval(() => {
                spans.forEach(s => {
                    s.style.color = '';
                    s.style.textShadow = '';
                    s.style.transform = '';
                    s.style.transition = 'color 0.1s, transform 0.1s';
                });
                spans[noRepoScanIndex].style.color = '#ccff33';
                spans[noRepoScanIndex].style.textShadow = '0 0 32px #ccff33, 0 0 16px #fff, 0 0 8px #00ff00, 0 0 2px #fff';
                spans[noRepoScanIndex].style.transform = 'translateY(-2px) scale(1.0)';
                noRepoScanIndex = (noRepoScanIndex + 1) % spans.length;
            }, 90);
        }
        function stopNoRepoMatrixScan() {
            clearInterval(noRepoScanInterval);
            noRepoScanInterval = null;
            const spans = noRepoDescElem.querySelectorAll('span');
            spans.forEach(s => {
                s.style.color = '';
                s.style.textShadow = '';
                s.style.transform = '';
            });
        }
        startNoRepoMatrixScan();
        errorMessage.addEventListener('mouseleave', stopNoRepoMatrixScan);
        return;
    }
    errorMessage.innerHTML = '';
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
                <div class="terminal-prompt">
                    <span class="prompt-user">┌──(0xCyberLiTech㉿kali)-[~/portfolio]</span>
                    <span class="prompt-command">└─$ ls -la ${repo.name}/</span>
                    ${isNew ? `<div class="badge-container"><span class="day-counter">${daysElapsed}j</span><span class="badge-new">NEW</span></div>` : ''}
                </div>
                <h3><a href="${repo.html_url}/blob/${repo.default_branch || 'main'}/README.md" target="_blank" style="color:inherit;text-decoration:none;">${repo.name}</a></h3>
                <p class="terminal-output"></p>
                <div class="infos">
                    <span title="Stars">★ ${repo.stargazers_count}</span>
                    <span title="Forks">⑂ ${repo.forks_count}</span>
                    <span title="Issues">⚠ ${repo.open_issues_count}</span>
                    <span class="date">${lastUpdate.toLocaleDateString()}</span>
                </div>
                <div class="scan-effect"></div>
            </div>
        `;
        container.appendChild(tile);
        // Description animée Matrix
        const desc = `# ${repo.description || 'Aucune description disponible.'}`;
        const descElem = tile.querySelector('.terminal-output');
        descElem.innerHTML = desc.split('').map(c => `<span>${c}</span>`).join('');
        let scanIndex = 0;
        let scanInterval = null;
        function startMatrixScan() {
            const spans = descElem.querySelectorAll('span');
            if (!spans.length) return;
            scanInterval = setInterval(() => {
                spans.forEach(s => {
                    s.style.color = '';
                    s.style.textShadow = '';
                    s.style.transform = '';
                    s.style.transition = 'color 0.1s, transform 0.1s';
                });
                spans[scanIndex].style.color = '#ccff33';
                spans[scanIndex].style.textShadow = '0 0 32px #ccff33, 0 0 16px #fff, 0 0 8px #00ff00, 0 0 2px #fff';
                spans[scanIndex].style.transform = 'translateY(-2px) scale(1.0)';
                scanIndex = (scanIndex + 1) % spans.length;
            }, 90);
        }
        function stopMatrixScan() {
            clearInterval(scanInterval);
            scanInterval = null;
            const spans = descElem.querySelectorAll('span');
            spans.forEach(s => {
                s.style.color = '';
                s.style.textShadow = '';
                s.style.transform = '';
            });
        }
        tile.addEventListener('mouseenter', () => {
            if (!scanInterval) {
                scanIndex = 0;
                startMatrixScan();
            }
        });
        tile.addEventListener('mouseleave', () => {
            stopMatrixScan();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-repos');
    if (searchInput) {
        searchInput.addEventListener('input', filterAndRenderRepos);
    }
});
// Matrix Digital Rain 3.0 - Effet avancé avec profondeur, reflets et couleurs secondaires
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Caractères Matrix enrichis
        const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*+={}<>?[]|";
        const fontSize = 16;
        const cols = () => Math.floor(canvas.width / fontSize);
        let drops = [];
        let speeds = [];
        let brightnesses = [];
        let focusColumns = [];
        let colorColumns = [];

        function initMatrix() {
            const numCols = cols();
            drops = Array(numCols).fill(0);
            speeds = Array(numCols).fill(0).map(() => Math.random() * 0.5 + 0.3);
            brightnesses = Array(numCols).fill(0).map(() => Math.random() * 0.5 + 0.5);
            focusColumns = Array(numCols).fill(false).map(() => Math.random() < 0.13);
            colorColumns = Array(numCols).fill('#00ff00').map(() => {
                const r = Math.random();
                if (r < 0.08) return '#00fff0'; // cyan
                if (r < 0.15) return '#baff3b'; // vert lime
                if (r < 0.18) return '#00aaff'; // bleu matrix
                return '#00ff00';
            });
        }
        initMatrix();
        window.addEventListener('resize', initMatrix);

        function drawMatrix() {
            // Effet de profondeur : léger flou et reflets
            ctx.save();
            ctx.globalAlpha = 0.92;
            ctx.filter = 'blur(0.5px)';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();

            ctx.font = `bold ${fontSize}px 'Consolas', monospace`;

            for (let i = 0; i < cols(); i++) {
                const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Couleur secondaire sur certaines colonnes
                let color = colorColumns[i];

                // Effet de focus : colonne très lumineuse, reflets blancs
                if (focusColumns[i]) {
                    const brightness = Math.sin(Date.now() * 0.005 + i) * 0.3 + 0.8;
                    ctx.fillStyle = `rgba(255,255,255,${0.18 + 0.5 * brightness})`;
                    ctx.shadowBlur = 18;
                    ctx.shadowColor = color;
                    ctx.globalAlpha = 0.95;
                } else {
                    // Colonnes normales avec couleur matrix
                    const alpha = brightnesses[i] * (1 - (y / canvas.height) * 0.5);
                    ctx.fillStyle = color.replace(')', `,${alpha})`).replace('rgb', 'rgba');
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = color;
                    ctx.globalAlpha = 0.82;
                }

                // Reflet vertical (lumière descendante)
                if (focusColumns[i] && y > canvas.height * 0.2 && y < canvas.height * 0.8) {
                    ctx.save();
                    ctx.globalAlpha = 0.18;
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(x, y - fontSize * 1.5, fontSize, fontSize * 1.5);
                    ctx.restore();
                }

                ctx.fillText(char, x, y);

                // Reset colonne quand elle sort de l'écran
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                    speeds[i] = Math.random() * 0.5 + 0.3;
                    focusColumns[i] = Math.random() < 0.13;
                    brightnesses[i] = Math.random() * 0.5 + 0.5;
                    // Changement de couleur occasionnel
                    const r = Math.random();
                    if (r < 0.08) colorColumns[i] = '#00fff0';
                    else if (r < 0.15) colorColumns[i] = '#baff3b';
                    else if (r < 0.18) colorColumns[i] = '#00aaff';
                    else colorColumns[i] = '#00ff00';
                }
                drops[i] += speeds[i];
            }
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            ctx.filter = 'none';
        }
        setInterval(drawMatrix, 40);
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
        const errorDiv = document.getElementById('error-message');
        errorDiv.style.display = 'block';
        errorDiv.innerHTML = `<div>Erreur lors du chargement des dépôts.</div><pre style="font-size:0.95em;color:#ffb3b3;margin:6px 0 0 0;white-space:pre-wrap;">${e.message || e}</pre>`;
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