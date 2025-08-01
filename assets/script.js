
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



// Charger les dépôts GitHub
fetch("https://api.github.com/users/0xCyberLiTech/repos?sort=updated")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("projects-list");
    data.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";
      

card.innerHTML = `
  <h3>${repo.name}</h3>
  <p>${repo.description || "Aucune description."}</p>
  <div class="repo-stats">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🕒 ${new Date(repo.updated_at).toLocaleDateString()}</div>
  <a class="repo-btn" href="${repo.html_url}" target="_blank">🚀 Ouvrir sur GitHub</a>
`;


      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des dépôts :", error);
  });
