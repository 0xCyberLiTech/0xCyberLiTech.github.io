/**
 * modal.js — Gestion du modal réutilisable
 *
 * Dépendances :
 *   - Nécessite l’injection de modal.html dans la page
 *   - Nécessite <script type="module">
 *
 * Utilisation :
 *   - import { openModal, closeModal } from './modal.js';
 *   - openModal('<b>Contenu</b>');
 */
// assets/partials/modal.js
// Script pour gérer l'ouverture/fermeture du modal réutilisable

export function openModal(content) {
    const modal = document.getElementById('modal');
    const body = document.getElementById('modal-body');
    if (modal && body) {
        body.innerHTML = content;
        modal.style.display = 'flex';
    }
}

export function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
    // Fermer le modal en cliquant hors du contenu
    const modal = document.getElementById('modal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === modal) closeModal();
        };
    }
});
