const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("light-mode") ? "light" : "dark"
  );
});

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
} else {
  body.classList.remove("light-mode");
}

fetch("https://api.github.com/users/0xCyberLiTech/repos?sort=updated")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("projects-list");
    data.forEach(repo => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <div class="project-header">${repo.name}</div>
        <div class="project-description">${repo.description || "Aucune description."}</div>
        <div class="project-stats">
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
          <span>🐞 ${repo.open_issues_count}</span>
          <span>📅 ${new Date(repo.updated_at).toLocaleDateString()}</span>
        </div>
        <a class="project-link" href="${repo.html_url}" target="_blank">Voir sur GitHub</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des dépôts :", error);
  });
