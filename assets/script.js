// Matrix Digital Rain 2.0 - Version améliorée
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        // Configuration du canvas
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Caractères Matrix améliorés (japonais + symboles tech)
        const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*+={}<>?[]|";
        
        // Configuration des colonnes
        const fontSize = 16;
        const cols = () => Math.floor(canvas.width / fontSize);
        let drops = [];
        let speeds = [];
        let brightnesses = [];
        let focusColumns = [];

        function initMatrix() {
            const numCols = cols();
            drops = Array(numCols).fill(0);
            speeds = Array(numCols).fill(0).map(() => Math.random() * 0.5 + 0.3); // Vitesses variables
            brightnesses = Array(numCols).fill(0).map(() => Math.random() * 0.5 + 0.5);
            focusColumns = Array(numCols).fill(false).map(() => Math.random() < 0.1); // 10% de colonnes "focus"
        }
        
        initMatrix();
        window.addEventListener('resize', initMatrix);

        function drawMatrix() {
            // Fond semi-transparent pour l'effet de fade
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.font = `${fontSize}px 'Consolas', monospace`;
            
            for (let i = 0; i < cols(); i++) {
                const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                // Effet de focus sur certaines colonnes
                if (focusColumns[i]) {
                    // Colonne en focus : plus brillante
                    const brightness = Math.sin(Date.now() * 0.005 + i) * 0.3 + 0.7;
                    ctx.fillStyle = `rgba(0, 255, 0, ${brightness})`;
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = '#00ff00';
                } else {
                    // Colonnes normales avec fade progressif
                    const alpha = brightnesses[i] * (1 - (y / canvas.height) * 0.5);
                    ctx.fillStyle = `rgba(0, 255, 0, ${alpha})`;
                    ctx.shadowBlur = 2;
                    ctx.shadowColor = '#00ff00';
                }
                
                ctx.fillText(char, x, y);
                
                // Reset colonne quand elle sort de l'écran
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                    // Changement aléatoire de vitesse et focus
                    speeds[i] = Math.random() * 0.5 + 0.3;
                    focusColumns[i] = Math.random() < 0.15;
                    brightnesses[i] = Math.random() * 0.5 + 0.5;
                }
                
                // Avancement avec vitesse variable
                drops[i] += speeds[i];
            }
            
            // Reset shadow
            ctx.shadowBlur = 0;
        }
        
        // Animation plus fluide
        setInterval(drawMatrix, 50);
    }
});

// Récupération des dépôts GitHub et affichage des tuiles (sans barre LED)
async function loadRepos() {
    const container = document.getElementById('projects-list');
    container.innerHTML = '';
    try {
        const response = await fetch('https://api.github.com/users/0xCyberLiTech/repos');
        const repos = await response.json();
        repos.forEach(repo => {
            const lastUpdate = new Date(repo.updated_at);
            const now = new Date();
            const daysElapsed = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
            const isNew = daysElapsed <= 7;

            const tile = document.createElement('div');
            tile.className = 'project-tile';
            
            // Ajoute l'attribut data-new pour les projets récents
            if (isNew) {
                tile.setAttribute('data-new', 'true');
            }

            // Affiche le titre sauf pour la tuile du logo
            const showTitle = repo.name !== "0xCyberLiTech";

            tile.innerHTML = `
                <div class="project-tile-content">
                    <div class="terminal-prompt">
                        <span class="prompt-user">┌──(0xCyberLiTech㉿kali)-[~/projects]</span>
                        <span class="prompt-command">└─$ ls -la ${showTitle ? repo.name : 'logo_repository'}/</span>
                    </div>
                    ${showTitle ? `<h3>${repo.name}</h3>` : `<h3 style="color: #00aaff;">./logo_repository</h3>`}
                    <p class="terminal-output"># ${repo.description || 'Aucune description disponible.'}</p>
                    <div class="infos">
                        <span title="Stars">★ ${repo.stargazers_count}</span>
                        <span title="Forks">⑂ ${repo.forks_count}</span>
                        <span title="Issues">⚠ ${repo.open_issues_count}</span>
                        <span class="date">${lastUpdate.toLocaleDateString()}</span>
                    </div>
                    <a href="${repo.html_url}/blob/${repo.default_branch || 'main'}/README.md" target="_blank" class="btn-readme">OPEN</a>
                    <div class="scan-effect"></div>
                </div>
            `;
            container.appendChild(tile);
        });
    } catch (e) {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('error-message').textContent = "Erreur lors du chargement des dépôts.";
    }
}

window.addEventListener('DOMContentLoaded', loadRepos);