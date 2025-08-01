const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
}

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
  });

