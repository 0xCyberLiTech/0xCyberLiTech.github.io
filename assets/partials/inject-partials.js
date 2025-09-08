
// Script pour injecter dynamiquement header et footer
function loadPartial(id, url) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  // Détecte si le site est servi depuis un sous-dossier (GitHub Pages)
  const base = location.pathname.startsWith('/0xCyberLiTech.github.io/') ? '/0xCyberLiTech.github.io/' : '/';
  if(document.getElementById('header')) {
    loadPartial('header', base + 'assets/partials/header.html');
  }
  if(document.getElementById('footer')) {
    loadPartial('footer', base + 'assets/partials/footer.html');
  }
});