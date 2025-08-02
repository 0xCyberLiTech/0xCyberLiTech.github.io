// Force dark mode
document.body.classList.remove('light-mode');

// Matrix effect
function matrixEffect() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const letters = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 14;
  const columns = canvas.width / fontSize;

  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
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
  }

  setInterval(draw, 33);
}

matrixEffect();

// Configuration : durée d'affichage du badge en jours
const NEW_REPO_DAYS = 30;

// Charger les dépôts GitHub
fetch("https://api.github.com/users/0xCyberLiTech/repos?sort=updated")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("projects-list");
    const now = new Date();

    // Exclure le dépôt 0xCyberLiTech.github.io
    let repos = data.filter(repo => repo.name.toLowerCase() !== "0xcyberlitech.github.io");

    // Mettre le dépôt 0xCyberLiTech en premier
    const mainRepoIndex = repos.findIndex(repo => repo.name.toLowerCase() === "0xcyberlitech");
    if (mainRepoIndex > -1) {
      const mainRepo = repos.splice(mainRepoIndex, 1)[0];
      repos.unshift(mainRepo);
    }

    // Afficher les dépôts
    repos.forEach(repo => {
      const createdDate = new Date(repo.created_at);
      const daysSinceCreation = (now - createdDate) / (1000 * 60 * 60 * 24);
      const isNew = daysSinceCreation <= NEW_REPO_DAYS;

      const card = document.createElement("div");
      card.className = "project-card";

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Aucune description."}</p>
        ${isNew ? `<div class="new-badge">🆕 Nouveau</div>` : ""}
        <div class="repo-stats">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🕒 ${new Date(repo.updated_at).toLocaleDateString()}</div>
        <a class="repo-btn" href="${repo.html_url}/blob/main/README.md" target="_blank">📄 Lire le README</a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des dépôts :", error);
  });
