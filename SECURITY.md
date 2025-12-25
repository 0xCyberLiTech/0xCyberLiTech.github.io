# Politique de Sécurité - Portfolio 0xCyberLiTech

## 🛡️ Versions Supportées

Seule la version la plus récente du portfolio est supportée avec des mises à jour de sécurité.

| Version | Supportée          |
| ------- | ------------------ |
| 2.1.x   | ✅ Oui             |
| 2.0.x   | ❌ Non             |
| < 2.0   | ❌ Non             |

## 🚨 Signaler une Vulnérabilité

### Types de Vulnérabilités Acceptées

- **XSS (Cross-Site Scripting)** : Particulièrement important car nous utilisons l'API GitHub
- **Injection de Code** : JavaScript injection, DOM-based attacks
- **CSRF** : Cross-Site Request Forgery
- **Exposition de Données** : Leaks d'informations sensibles
- **Déni de Service** : DoS via JavaScript ou CSS

### Types NON Acceptés

- **Problèmes de configuration** : GitHub Pages settings, DNS
- **Issues UI/UX** : Bugs visuels sans impact sécuritaire
- **Performance** : Problèmes de vitesse (sauf DoS)

### Comment Signaler

1. **GitHub Security Advisories** (Recommandé)
   - Allez sur l'onglet "Security" du repository
   - Cliquez "Report a vulnerability" 
   - Remplissez le formulaire détaillé

2. **Email Direct** (Si GitHub indisponible)
   - Envoyez à : security@0xcyberlitech.dev
   - Sujet : `[SECURITY] Portfolio Vulnerability Report`

### Informations à Inclure

- **Description détaillée** de la vulnérabilité
- **Étapes de reproduction** 
- **Impact potentiel**
- **Preuves de concept** (screenshots, code)
- **Suggestions de correction** (optionnel)

### Délais de Réponse

- **Accusé de réception** : 48 heures
- **Évaluation initiale** : 7 jours
- **Correction critique** : 14 jours
- **Correction standard** : 30 jours

### Processus de Correction

1. **Triage** : Évaluation de la criticité
2. **Investigation** : Analyse approfondie 
3. **Développement** : Création du correctif
4. **Testing** : Vérification de la correction
5. **Déploiement** : Mise en production
6. **Communication** : Notification aux utilisateurs

## 🏆 Reconnaissance

Les chercheurs en sécurité qui signalent des vulnérabilités valides seront crédités dans :
- Le fichier docs/CHANGELOG.md
- La section "Contributors" du README
- Les notes de release GitHub

## 📋 Bonnes Pratiques Implémentées

### Protection XSS
- ✅ Utilisation systématique de `utilEscapeHTML()`
- ✅ Validation des données d'entrée API GitHub
- ✅ CSP (Content Security Policy) recommandée

### Sécurité des Dépendances  
- ✅ Dependabot activé
- ✅ CodeQL analysis hebdomadaire
- ✅ Secret scanning activé
- ✅ Monitoring automatique des vulnérabilités

### Architecture Sécurisée
- ✅ Modules ES6 isolés
- ✅ Validation des URLs GitHub
- ✅ Gestion d'erreur robuste
- ✅ Pas de `eval()` ou `innerHTML` unsafe

## 📞 Contact

- **Portfolio** : https://0xcyberlitech.github.io
- **Repository** : https://github.com/0xCyberLiTech/0xCyberLiTech.github.io
- **Security Team** : security@0xcyberlitech.dev

---

## 🕒 Historique des mises à jour

Chaque évolution des pratiques, outils ou procédures de sécurité doit être consignée ici ou dans le fichier docs/CHANGELOG.md associé.

- **[25/12/2025]** Ajout de la section Historique des mises à jour et rappel de la mise à jour continue du présent fichier.

> Pensez à mettre à jour ce fichier à chaque modification : activation/désactivation d’outils, changement de procédure, évolution des contacts, amélioration des protections, etc.