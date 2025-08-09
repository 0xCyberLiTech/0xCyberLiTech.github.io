// ================================================
// 0xCyberLiTech - Preloader Script Matrix Terminal
// ================================================

class MatrixPreloader {
    constructor() {
        this.canvas = document.getElementById('matrix-preloader');
        this.ctx = this.canvas.getContext('2d');
        this.progress = 0;
        this.isComplete = false;
        
        // Éléments DOM
        this.progressFill = document.getElementById('progress-fill');
        this.progressPercent = document.getElementById('progress-percent');
        this.typingText = document.getElementById('typing-text');
        this.statusMessages = document.getElementById('status-messages');
        
        // Configuration Matrix
        this.matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$@#%&*+={}<>?[]|";
    this.fontSize = 16;
        this.drops = [];
        this.speeds = [];
        
        // Messages de statut
        this.statusTexts = [
            "► Initializing Matrix protocols...",
            "► Loading cybersecurity modules...",
            "► Establishing secure connections...",
            "► Scanning network infrastructure...",
            "► Activating defense systems...",
            "► Loading portfolio assets...",
            "► Initializing terminal interface...",
            "► Calibrating Matrix display...",
            "► Finalizing security protocols...",
            "► Welcome to 0xCyberLiTech..."
        ];
        
        // Textes de frappe
        this.typingTexts = [
            "sudo ./initialize_portfolio.sh",
            "systemctl start matrix-display",
            "nmap -sS portfolio.local",
            "sudo chmod +x cyber_tools/*",
            "ssh 0xCyberLiTech@portfolio",
            "Loading complete... Redirecting..."
        ];
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.startMatrixRain();
        this.startLoading();
        this.handleResize();
    }
    
    // Configuration du canvas Matrix
    setupCanvas() {
        this.resizeCanvas();
        
    const cols = Math.floor(this.canvas.width / this.fontSize);
    this.drops = Array(cols).fill(0);
    this.speeds = Array(cols).fill(0).map(() => Math.random() * 0.5 + 0.3);
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.setupCanvas();
        });
    }
    
    // Animation Matrix Rain (identique au portfolio)
    startMatrixRain() {
        // Initialisation des colonnes avancées
        const cols = () => Math.floor(this.canvas.width / this.fontSize);
        let brightnesses = [];
        let focusColumns = [];
        let colorColumns = [];
        const initMatrix = () => {
            const numCols = cols();
            this.drops = Array(numCols).fill(0);
            this.speeds = Array(numCols).fill(0).map(() => Math.random() * 0.5 + 0.3);
            brightnesses = Array(numCols).fill(0).map(() => Math.random() * 0.5 + 0.5);
            focusColumns = Array(numCols).fill(false).map(() => Math.random() < 0.13);
            colorColumns = Array(numCols).fill('#00ff00').map(() => {
                const r = Math.random();
                if (r < 0.08) return '#00fff0'; // cyan
                if (r < 0.15) return '#baff3b'; // vert lime
                if (r < 0.18) return '#00aaff'; // bleu matrix
                return '#00ff00';
            });
        };
        initMatrix();
        window.addEventListener('resize', initMatrix);

        const drawMatrix = () => {
            if (this.isComplete) return;
            this.ctx.save();
            this.ctx.globalAlpha = 0.92;
            this.ctx.filter = 'blur(0.5px)';
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.10)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();

            this.ctx.font = `bold ${this.fontSize}px 'Consolas', monospace`;

            for (let i = 0; i < cols(); i++) {
                const char = this.matrixChars[Math.floor(Math.random() * this.matrixChars.length)];
                const x = i * this.fontSize;
                const y = this.drops[i] * this.fontSize;

                let color = colorColumns[i];

                if (focusColumns[i]) {
                    const brightness = Math.sin(Date.now() * 0.005 + i) * 0.3 + 0.8;
                    this.ctx.fillStyle = `rgba(255,255,255,${0.18 + 0.5 * brightness})`;
                    this.ctx.shadowBlur = 18;
                    this.ctx.shadowColor = color;
                    this.ctx.globalAlpha = 0.95;
                } else {
                    const alpha = brightnesses[i] * (1 - (y / this.canvas.height) * 0.5);
                    this.ctx.fillStyle = color.replace(')', `,${alpha})`).replace('rgb', 'rgba');
                    this.ctx.shadowBlur = 6;
                    this.ctx.shadowColor = color;
                    this.ctx.globalAlpha = 0.82;
                }

                if (focusColumns[i] && y > this.canvas.height * 0.2 && y < this.canvas.height * 0.8) {
                    this.ctx.save();
                    this.ctx.globalAlpha = 0.18;
                    this.ctx.fillStyle = '#fff';
                    this.ctx.fillRect(x, y - this.fontSize * 1.5, this.fontSize, this.fontSize * 1.5);
                    this.ctx.restore();
                }

                this.ctx.fillText(char, x, y);

                if (y > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                    this.speeds[i] = Math.random() * 0.5 + 0.3;
                    focusColumns[i] = Math.random() < 0.13;
                    brightnesses[i] = Math.random() * 0.5 + 0.5;
                    const r = Math.random();
                    if (r < 0.08) colorColumns[i] = '#00fff0';
                    else if (r < 0.15) colorColumns[i] = '#baff3b';
                    else if (r < 0.18) colorColumns[i] = '#00aaff';
                    else colorColumns[i] = '#00ff00';
                }
                this.drops[i] += this.speeds[i];
            }
            this.ctx.shadowBlur = 0;
            this.ctx.globalAlpha = 1;
            this.ctx.filter = 'none';
        };
        setInterval(drawMatrix, 40);
    }
    
    // Démarrage du processus de chargement
    startLoading() {
        let currentTypingIndex = 0;
        let currentStatusIndex = 0;
        
        // Animation de frappe
        const typeText = (text, callback) => {
            let charIndex = 0;
            this.typingText.textContent = '';
            
            const typeChar = () => {
                if (charIndex < text.length) {
                    this.typingText.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeChar, 50 + Math.random() * 50);
                } else if (callback) {
                    setTimeout(callback, 800);
                }
            };
            
            typeChar();
        };
        
        // Ajout de messages de statut
        const addStatusMessage = (message) => {
            if (currentStatusIndex < this.statusTexts.length) {
                const statusLine = document.createElement('div');
                statusLine.className = 'status-line';
                statusLine.textContent = this.statusTexts[currentStatusIndex];
                statusLine.style.animationDelay = '0s';
                this.statusMessages.appendChild(statusLine);
                
                // Limiter le nombre de messages visibles
                if (this.statusMessages.children.length > 4) {
                    this.statusMessages.removeChild(this.statusMessages.firstChild);
                }
                
                currentStatusIndex++;
            }
        };
        
        // Mise à jour de la progression
        const updateProgress = () => {
            if (this.progress < 100) {
                // Progression variable pour plus de réalisme
                const increment = Math.random() * 8 + 2;
                this.progress = Math.min(100, this.progress + increment);
                
                this.progressFill.style.width = this.progress + '%';
                this.progressPercent.textContent = Math.floor(this.progress);
                
                // Ajouter des messages de statut à certains seuils
                if (this.progress > 10 && currentStatusIndex === 1) addStatusMessage();
                if (this.progress > 25 && currentStatusIndex === 2) addStatusMessage();
                if (this.progress > 40 && currentStatusIndex === 3) addStatusMessage();
                if (this.progress > 55 && currentStatusIndex === 4) addStatusMessage();
                if (this.progress > 70 && currentStatusIndex === 5) addStatusMessage();
                if (this.progress > 85 && currentStatusIndex === 6) addStatusMessage();
                if (this.progress > 95 && currentStatusIndex === 7) addStatusMessage();
                
                if (this.progress >= 100) {
                    this.progress = 100;
                    this.progressFill.style.width = '100%';
                    this.progressPercent.textContent = '100';
                    
                    // Finalisation
                    setTimeout(() => {
                        this.completeLoading();
                    }, 500);
                } else {
                    // Continuer la progression avec délai variable
                    setTimeout(updateProgress, 200 + Math.random() * 300);
                }
            }
        };
        
        // Séquence de frappe et progression
        const startSequence = () => {
            // Premier message de statut
            addStatusMessage();
            
            // Démarrer la progression
            setTimeout(updateProgress, 500);
            
            // Frappe séquentielle
            const typeNextCommand = () => {
                if (currentTypingIndex < this.typingTexts.length) {
                    typeText(this.typingTexts[currentTypingIndex], () => {
                        currentTypingIndex++;
                        if (currentTypingIndex < this.typingTexts.length) {
                            setTimeout(typeNextCommand, 1000);
                        }
                    });
                }
            };
            
            typeNextCommand();
        };
        
        // Démarrer après un délai initial
        setTimeout(startSequence, 1000);
    }
    
    // Finalisation du chargement
    completeLoading() {
        this.isComplete = true;
        
        // Message final
        const finalStatus = document.createElement('div');
        finalStatus.className = 'status-line';
        finalStatus.textContent = '► Loading complete! Initializing portfolio...';
        finalStatus.style.color = '#00ff00';
        finalStatus.style.fontWeight = 'bold';
        this.statusMessages.appendChild(finalStatus);
        
        // Frappe du message final
        this.typingText.textContent = '';
        const finalText = "Access granted. Welcome to 0xCyberLiTech!";
        this.typeText(finalText, () => {
            // Transition vers le portfolio principal
            setTimeout(() => {
                this.transitionToPortfolio();
            }, 1500);
        });
    }
    
    // Fonction de frappe simplifiée pour le message final
    typeText(text, callback) {
        let charIndex = 0;
        this.typingText.style.color = '#00ff00';
        
        const typeChar = () => {
            if (charIndex < text.length) {
                this.typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 80);
            } else if (callback) {
                setTimeout(callback, 500);
            }
        };
        
        typeChar();
    }
    
    // Transition vers le portfolio principal
    transitionToPortfolio() {
        const preloaderContainer = document.querySelector('.preloader-container');
        const matrixCanvas = document.getElementById('matrix-preloader');

        // Ajout d'une classe fade-out pour une transition CSS harmonieuse
        preloaderContainer.classList.add('fade-out');
        matrixCanvas.classList.add('fade-out');

        // Redirection vers le portfolio principal après le fondu
        setTimeout(() => {
            window.location.href = 'portfolio.html';
        }, 1200);
    }
}

// Initialisation quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Petite pause pour l'effet dramatique
    setTimeout(() => {
        new MatrixPreloader();
    }, 500);
});

// Gestion du clic pour skip le preloader (pour développement)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.location.href = 'portfolio.html';
    }
});

// Animation de particules pour effet supplémentaire
class ParticleEffect {
    constructor() {
        this.particles = [];
        this.canvas = document.getElementById('matrix-preloader');
        this.ctx = this.canvas.getContext('2d');
        this.init();
    }
    
    init() {
        // Créer quelques particules Matrix
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.3,
                size: Math.random() * 2 + 1
            });
        }
        
        this.animate();
    }
    
    animate() {
        // Animation des particules flottantes
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebond sur les bords
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Dessin de la particule
            this.ctx.save();
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = '#00ff00';
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = '#00ff00';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Activation de l'effet de particules après initialisation
setTimeout(() => {
    new ParticleEffect();
}, 2000);
