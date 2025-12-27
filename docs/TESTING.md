# 🧪 Guide de tests

> **Version :** 2.1 — **Dernière mise à jour :** 27 décembre 2025  
> Ce guide décrit les méthodes de test et de validation du projet.

---

## 📑 Sommaire
- [Types de tests](#types-de-tests)
- [Procédures de test](#procédures-de-test)
- [Outils recommandés](#outils-recommandés)
- [Ressources utiles](#ressources-utiles)

---

## 🧬 Types de tests

- Tests manuels (UI, navigation, responsive)
- Tests automatisés (lint, build, audit)
- Tests de sécurité (XSS, permissions)

---

## 📝 Procédures de test

1. Lancer `npm run build` pour vérifier la minification
2. Ouvrir le site sur différents navigateurs et appareils
3. Utiliser les outils de développement pour inspecter le DOM et les performances
4. Exécuter `npm audit` pour les dépendances

---

## 🛠️ Outils recommandés

- ESLint (analyse statique)
- Lighthouse (audit performance/accessibilité)
- npm audit (sécurité)
- Live Server ou http-server (tests locaux)

---

## 📚 Ressources utiles

- [README.md](README.md) — Sommaire de la documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) — Guide de contribution
- [MINIFICATION.md](../build/MINIFICATION.md) — Minification automatique

---

**Auteur :** 0xCyberLiTech — 2025