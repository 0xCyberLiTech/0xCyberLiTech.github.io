
// Force dark mode
document.body.classList.remove('light-mode');

// Effet Matrix plein écran + pleine page adaptatif
function matrixEffect() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  const letters = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 14;
  let columns;
  let drops;
  let lastWidth = window.innerWidth;
  let lastHeight = Math.max(window.innerHeight, document.body.scrollHeight);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }

  // Initialisation
  resizeCanvas();

  function checkResize() {
    const currentHeight = Math.max(window.innerHeight, document.body.scrollHeight);
    if (window.innerWidth !== lastWidth || currentHeight !== lastHeight) {
      lastWidth = window.innerWidth;
      lastHeight = currentHeight;
      resizeCanvas();
    }
  }

  function draw() {
    checkResize(); // Vérifie si la taille réelle a changé (scroll ou zoom)
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(draw);
  }

  draw();
}

matrixEffect();

// Charger les dépôts GitHub
fetch("https://api.github.com/users/0xCyberLiTech/repos?sort=updated")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("projects-list");
    const now = new Date();

    let repos = data.filter(repo => repo.name.toLowerCase() !== "0xcyberlitech.github.io");

    const mainRepoIndex = repos.findIndex(repo => repo.name.toLowerCase() === "0xcyberlitech");
    if (mainRepoIndex > -1) {
      const mainRepo = repos.splice(mainRepoIndex, 1)[0];
      repos.unshift(mainRepo);
    }

    repos.forEach(repo => {
      const createdDate = new Date(repo.created_at);
      const daysSinceCreation = (now - createdDate) / (1000 * 60 * 60 * 24);
      const isNew = daysSinceCreation <= 30;

      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Aucune description."}</p>
        ${isNew ? `<div class="new-badge">🆕 Nouveau</div>` : ""}
        <div class="repo-stats">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🕒 ${new Date(repo.updated_at).toLocaleDateString()}</div>
        <a class="repo-btn" href="${repo.html_url}/blob/${repo.default_branch || "main"}/README.md" target="_blank">📄 Lire le README</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(() => {
    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "Erreur de connexion à l'API GitHub.";
    errorMessage.style.display = "block";
  });
