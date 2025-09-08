// Script pour injecter dynamiquement header et footer
function loadPartial(id, url) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener('DOMContentLoaded', function() {
  if(document.getElementById('header')) {
    loadPartial('header', 'assets/partials/header.html');
  }
  if(document.getElementById('footer')) {
    loadPartial('footer', 'assets/partials/footer.html');
  }
});

fetch('assets/partials/header.html')
  .then(res => res.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
    if (typeof startTerminalCursorAnimation === 'function') {
      startTerminalCursorAnimation();
    }
  });