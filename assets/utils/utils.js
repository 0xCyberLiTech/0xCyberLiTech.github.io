// assets/utils/utils.js
// Fonctions utilitaires globales pour le projet 0xCyberLiTech

/**
 * Échappe les caractères HTML spéciaux pour éviter les injections XSS.
 * @param {string} str
 * @returns {string}
 */
export function utilEscapeHTML(str) {
    return String(str).replace(/[&<>\"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}
