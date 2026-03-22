// Preloader sans grille de fond
// (Le canvas peut être utilisé pour d'autres effets si besoin, mais la grille est supprimée)

// Cache DOM pour optimiser l'accès aux éléments
const PreloaderCache = {
    progressBar: null,
    statusText: null,
    
    init() {
        this.progressBar = document.getElementById('preloader-progress-bar');
        this.statusText = document.getElementById('preloader-status-text');
    }
};

// Initialisation du cache
PreloaderCache.init();

// Animation de la barre de progression du preloader
const progressBar = PreloaderCache.progressBar;
const statusText = PreloaderCache.statusText;
if (progressBar) {
	let progress = 0;
	const steps = [
		{ pct: 15, txt: "INITIALISATION SYSTÈME..." },
		{ pct: 35, txt: "CHARGEMENT DES MODULES IA..." },
		{ pct: 55, txt: "CONNEXION GITHUB..." },
		{ pct: 80, txt: "RÉCUPÉRATION DES DÉPÔTS..." },
		{ pct: 100, txt: "ACCÈS AUTORISÉ ✓" }
	];
	let step = 0;
	function animateProgress() {
		if (step < steps.length) {
			progress = steps[step].pct;
			progressBar.style.width = progress + '%';
			if (statusText) statusText.textContent = steps[step].txt;
			step++;
			setTimeout(animateProgress, 1100 + Math.random()*500);
		} else {
			// Déclenche la transition seulement à la fin de la barre
			// Ajout d'un fondu au noir avant la redirection
			const fadeOverlay = document.createElement('div');
			fadeOverlay.style.position = 'fixed';
			fadeOverlay.style.top = 0;
			fadeOverlay.style.left = 0;
			fadeOverlay.style.width = '100vw';
			fadeOverlay.style.height = '100vh';
			fadeOverlay.style.background = '#101820';
			fadeOverlay.style.opacity = '0';
			fadeOverlay.style.transition = 'opacity 0.5s cubic-bezier(0.4,0,0.2,1)';
			fadeOverlay.style.zIndex = '9999';
			document.body.appendChild(fadeOverlay);
			setTimeout(() => {
				fadeOverlay.style.opacity = '1';
				setTimeout(() => {
					window.location.href = "portfolio.html";
				}, 520);
			}, 100);
		}
	}
	animateProgress();
// ...fin du module preloader
}
