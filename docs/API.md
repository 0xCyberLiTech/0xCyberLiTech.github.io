# 🛠️ Documentation API du Portfolio

> **Version :** 2.1 — **Dernière mise à jour :** 27 décembre 2025  
> Ce document détaille les interfaces, fonctions et points d’entrée API du projet.

---

## 📑 Sommaire
- [Introduction](#introduction)
- [Points d’entrée principaux](#points-dentrée-principaux)
- [Détail des modules](#détail-des-modules)
- [Exemples d’utilisation](#exemples-dutilisation)
- [Sécurité et bonnes pratiques](#sécurité-et-bonnes-pratiques)
- [Ressources utiles](#ressources-utiles)

---

## 📝 Introduction

Le projet expose des APIs internes (modules JS) pour la gestion du portfolio, l’intégration GitHub, le préchargeur et les utilitaires.  
Aucune API externe n’est exposée côté serveur (frontend only).

---

## 🚪 Points d’entrée principaux

- `assets/portfolio/script.js` : Point d’entrée principal du portfolio
- `assets/preloader/preloader.js` : Initialisation du préchargeur
- `assets/utils/util.js` : Fonctions utilitaires globales

---

## 🧩 Détail des modules

### PortfolioManager
- `init()` : Initialise le portfolio
- `fetchRepos()` : Récupère les dépôts GitHub
- `render()` : Affiche les projets

### PreloaderManager
- `start()` : Lance l’animation de chargement
- `finish()` : Transition vers le portfolio

### Utils
- `utilEscapeHTML(str)` : Protège contre les injections XSS

---

## 💡 Exemples d’utilisation

```js
import { PortfolioManager } from './assets/portfolio/script.js';
PortfolioManager.init();
```

---

## 🔒 Sécurité et bonnes pratiques

- Toujours utiliser `utilEscapeHTML` pour afficher du contenu dynamique
- Ne jamais exposer de secrets dans le code source
- Respecter la séparation des modules

---

## 📚 Ressources utiles

- [ARCHITECTURE.md](ARCHITECTURE.md) — Vue d’ensemble technique
- [MINIFICATION.md](../build/MINIFICATION.md) — Minification automatique
- [README.md](README.md) — Sommaire de la documentation

---

**Auteur :** 0xCyberLiTech — 2025