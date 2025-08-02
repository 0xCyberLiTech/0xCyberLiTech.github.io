// Force dark mode
document.body.classList.remove('light-mode');

// Effet Matrix
function matrixEffect() {
  const canvas = document.getElementById("matrix");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const letters = "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチッヂツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 14;
  let columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 33);
}

matrixEffect();

// Badge "Nouveau" en jours
const NEW_REPO_DAYS = 30;
const errorMessage = document.getElementById("error-message");

fetch("https://api.github.com/users/0xCyberLiTech/repos?sort=updated")
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      errorMessage.textContent = "Impossible de charger les dépôts GitHub.";
      errorMessage.style.display = "block";
      return;
    }

    const container = document.getElementById("projects-list");
    const now = new Date();

    let repos = data.filter(repo => repo.name.toLowerCase() !== "0xcyberlitech.github.io");

    const mainRepoIndex = repos.findIndex(repo => repo.name.toLowerCase() === "0xcyberlitech");
    if (mainRepoIndex > -1) {
      const mainRepo = repos.splice(mainRepoIndex, 1)[0];
      repos.unshift(mainRepo);
    }

    repos.forEach((repo, index) => {
      const createdDate = new Date(repo.created_at);
      const daysSinceCreation = (now - createdDate) / (1000 * 60 * 60 * 24);
      const isNew = daysSinceCreation <= NEW_REPO_DAYS;

      const card = document.createElement("div");
      card.className = "project-card";

      const branch = repo.default_branch || "main";
      const descId = `desc-${index}`;

      card.innerHTML = `
        <h3>${repo.name}</h3>
        <p id="${descId}"></p>
        ${isNew ? `<div class="new-badge">🆕 Nouveau</div>` : ""}
        <div class="repo-stats">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🕒 ${new Date(repo.updated_at).toLocaleDateString()}</div>
        <a class="repo-btn" href="${repo.html_url}/blob/${branch}/README.md" target="_blank">📄 Lire le README</a>
      `;

      container.appendChild(card);

      // Effet machine à écrire avec boucle
      const fullText = repo.description || "Aucune description.";
      let charIndex = 0;

      function typeLetterLoop() {
        if (charIndex <= fullText.length) {
          const before = fullText.substring(0, charIndex);
          const current = fullText.charAt(charIndex) || "";
          const after = fullText.substring(charIndex + 1);
          document.getElementById(descId).innerHTML =
            before + `<span class="typing-highlight">${current}</span>` + after;
          charIndex++;
          setTimeout(typeLetterLoop, 80);
        } else {
          // Attendre puis recommencer
          setTimeout(() => {
            charIndex = 0;
            typeLetterLoop();
          }, 1500);
        }
      }

      typeLetterLoop();
    });
  })
  .catch(() => {
    errorMessage.textContent = "Erreur de connexion à l'API GitHub.";
    errorMessage.style.display = "block";
  });
