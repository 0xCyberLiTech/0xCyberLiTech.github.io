const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Forcer le mode sombre par défaut si aucune préférence n'est enregistrée
if (!localStorage.getItem("theme")) {
  localStorage.setItem("theme", "dark");
}

// Événement du bouton de changement de thème
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("light-mode") ? "light" : "dark"
  );
});

// Appliquer le thème enregistré
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
} else {
  body.classList.remove("light-mode");
}

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
        <a href="${repo.html_url}" target="_blank">Voir sur GitHub</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Erreur lors du chargement des dépôts :", error);
  });
