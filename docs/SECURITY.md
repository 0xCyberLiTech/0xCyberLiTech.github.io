# 🔒 Politique de sécurité

> **Version :** 2.1 — **Dernière mise à jour :** 27 décembre 2025  
> Ce document présente les principes et mesures de sécurité appliqués au projet.

---

## 📑 Sommaire
- [Principes de sécurité](#principes-de-sécurité)
- [Gestion des vulnérabilités](#gestion-des-vulnérabilités)
- [Bonnes pratiques de développement](#bonnes-pratiques-de-développement)
- [Ressources utiles](#ressources-utiles)

---

## 🛡️ Principes de sécurité

- Pas de données sensibles stockées côté client
- Utilisation de `utilEscapeHTML` pour éviter les XSS
- Séparation stricte des modules et du DOM

---

## 🐞 Gestion des vulnérabilités

- Suivi des dépendances via npm audit
- Correction rapide des failles signalées
- Documentation des correctifs dans le changelog

---

## 🧑‍💻 Bonnes pratiques de développement

- Ne jamais exposer de secrets dans le code
- Toujours valider les entrées utilisateur
- Utiliser des outils d’analyse statique (ESLint, etc.)

---

## 📚 Ressources utiles

- [SECURITY_GUIDE.md](SECURITY_GUIDE.md) — Guide détaillé
- [README.md](README.md) — Sommaire de la documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) — Vue d’ensemble technique

---

**Auteur :** 0xCyberLiTech — 2025