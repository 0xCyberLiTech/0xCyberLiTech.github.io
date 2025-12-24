/**
 * inject-partials.js — Système d'injection de partiels HTML
 *
 * Responsabilités :
 *   - Injection dynamique du header et footer
 *   - Gestion centralisée des composants réutilisables
 *   - Error handling pour les partiels manquants
 *
 * @version 1.1.0
 * @author 0xCyberLiTech
 */

// Configuration des partiels
const PARTIALS_CONFIG = {
    header: { id: 'header', url: 'assets/partials/header.html' },
    footer: { id: 'footer', url: 'assets/partials/footer.html' }
};

/**
 * Cache DOM pour optimiser l'accès aux éléments
 */
const PartialsCache = {
    elements: new Map(),
    
    getElement(id) {
        if (!this.elements.has(id)) {
            this.elements.set(id, document.getElementById(id));
        }
        return this.elements.get(id);
    }
};

/**
 * Charge un partiel HTML et l'injecte dans l'élément cible
 * @param {string} id - ID de l'élément cible
 * @param {string} url - URL du partiel à charger
 */
function loadPartial(id, url) {
    const element = PartialsCache.getElement(id);
    if (!element) {
        console.warn(`Élément avec ID "${id}" non trouvé`);
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${url}`);
            }
            return response.text();
        })
        .then(html => {
            element.innerHTML = html;
        })
        .catch(error => {
            console.error(`Erreur lors du chargement du partiel "${id}":`, error);
            element.innerHTML = `<!-- Partiel "${id}" non disponible -->`;
        });
}

/**
 * Initialise le système d'injection des partiels
 */
function initPartials() {
    Object.entries(PARTIALS_CONFIG).forEach(([name, config]) => {
        if (PartialsCache.getElement(config.id)) {
            loadPartial(config.id, config.url);
        }
    });
}

// Auto-initialisation
document.addEventListener('DOMContentLoaded', function() {
    initPartials();
    // Gestion du popup RGPD
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'rgpd-link') {
            e.preventDefault();
            var popup = document.getElementById('rgpd-popup');
            if (popup) popup.style.display = 'block';
        }
        if (e.target && e.target.id === 'close-rgpd') {
            var popup = document.getElementById('rgpd-popup');
            if (popup) popup.style.display = 'none';
        }
    });
});
