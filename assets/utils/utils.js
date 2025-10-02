/**
 * @fileoverview Fonctions utilitaires globales pour le projet 0xCyberLiTech
 * @description Ce module centralise les fonctions communes pour éviter la duplication
 * de code et maintenir la cohérence à travers l'application. Toutes les fonctions
 * sont optimisées pour la performance et la sécurité.
 * 
 * @version 1.2.0
 * @author 0xCyberLiTech
 * @since 1.0.0
 * 
 * @requires ES6+ (Modules support required)
 * 
 * @example
 * // Import de fonctions spécifiques (recommandé)
 * import { utilEscapeHTML } from './utils.js';
 * 
 * // Import de toutes les fonctions
 * import * as Utils from './utils.js';
 */

// ==================================================
// CONSTANTES ET CONFIGURATION
// ==================================================

/**
 * Configuration des caractères à échapper pour la sécurité HTML
 * @constant {Object}
 * @private
 */
const HTML_ESCAPE_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',  // Ajout pour plus de sécurité
    '/': '&#x2F;'   // Ajout pour plus de sécurité
};

// ==================================================
// FONCTIONS DE SÉCURITÉ
// ==================================================

/**
 * Échappe les caractères HTML spéciaux pour prévenir les attaques XSS.
 * 
 * Cette fonction convertit les caractères dangereux en entités HTML sécurisées,
 * empêchant l'injection de scripts malveillants dans le DOM.
 * 
 * @param {*} str - Chaîne à échapper (sera convertie en string si nécessaire)
 * 
 * @returns {string} Chaîne échappée sécurisée pour l'affichage HTML
 * 
 * @example
 * // Sécurisation de données utilisateur
 * const userInput = '<script>alert("XSS")</script>';
 * const safeOutput = utilEscapeHTML(userInput);
 * console.log(safeOutput); // &lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;
 * 
 * @example
 * // Usage dans le DOM
 * const userData = 'Nom d\'utilisateur "John" & co';
 * document.getElementById('content').innerHTML = utilEscapeHTML(userData);
 * 
 * @example
 * // Gestion de valeurs non-string
 * utilEscapeHTML(null);        // "null"
 * utilEscapeHTML(undefined);   // "undefined" 
 * utilEscapeHTML(123);         // "123"
 * utilEscapeHTML(true);        // "true"
 * 
 * @throws {Error} Ne lève jamais d'erreur - convertit toujours en string
 * 
 * @performance O(n) où n est la longueur de la chaîne
 * @security ✅ Protection XSS - Safe pour innerHTML
 * 
 * @see {@link https://owasp.org/www-project-cheat-sheets/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html}
 * 
 * @since 1.0.0
 * @author 0xCyberLiTech
 */
export function utilEscapeHTML(str) {
    // Conversion sécurisée en string (gère null, undefined, numbers, etc.)
    const stringValue = String(str);
    
    // Remplacement efficace avec regex et map de correspondances
    return stringValue.replace(/[&<>"'\/]/g, (char) => HTML_ESCAPE_MAP[char]);
}
