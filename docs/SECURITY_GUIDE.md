# 🛡️ Guide de sécurité détaillé

> **Version :** 2.1 — **Dernière mise à jour :** 27 décembre 2025  
> Ce guide approfondit les mesures de sécurité et les bonnes pratiques à appliquer sur le projet.

---

## 📑 Sommaire
- [Introduction](#introduction)
- [Menaces principales](#menaces-principales)
- [Mesures de protection](#mesures-de-protection)
- [Checklist sécurité](#checklist-sécurité)
- [Ressources utiles](#ressources-utiles)

---

## 📝 Introduction

La sécurité est une priorité. Ce guide complète la [politique de sécurité](SECURITY.md) avec des exemples concrets et des recommandations avancées.

---

## 🚨 Menaces principales

- XSS (Cross-Site Scripting)
- Vol de session
- Attaques par injection (HTML, JS)
- Exposition de données sensibles

---

## 🛡️ Mesures de protection

- Utilisation systématique de `utilEscapeHTML` pour tout contenu dynamique
- Pas de stockage local de secrets
- Minification et obfuscation du code JS
- Limitation des permissions dans le manifest (si PWA)

---

## ✅ Checklist sécurité

- [x] Analyse statique du code (ESLint)
- [x] Audit des dépendances (`npm audit`)
- [x] Tests manuels XSS/CSRF
- [x] Documentation des incidents

---

## 📚 Ressources utiles

- [SECURITY.md](SECURITY.md) — Politique de sécurité
- [README.md](README.md) — Sommaire de la documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) — Vue d’ensemble technique

---

**Auteur :** 0xCyberLiTech — 2025