# 🛡️ Guide de Sécurité GitHub - Portfolio 0xCyberLiTech

## 📋 Vue d'ensemble

Ce document explique la configuration complète de sécurité mise en place pour le portfolio 0xCyberLiTech, optimisée pour un **coût zéro** tout en maintenant une protection de niveau entreprise.

**Mises à jour récentes (déc. 2025) :**
- Ajout d'une Content Security Policy (CSP) stricte dans les pages principales
- Ajout d'en-têtes de sécurité (X-Frame-Options, Referrer-Policy, etc.)
- Sanitization automatique des partiels HTML injectés
- Tests automatisés (Jest) pour la fonction utilEscapeHTML
- Documentation sécurité enrichie (SECURITE_AUTO_DOC.md, RAPPORT_AUDIT_SECURITE.md)

## 🎯 Objectifs de Sécurité

- **Protection XSS** : Sécurisation contre les attaques Cross-Site Scripting (échappement systématique, sanitization HTML)
- **Analyse de Code** : Détection automatique des vulnérabilités JavaScript
- **Surveillance des Dépendances** : Monitoring des packages et actions GitHub
- **Détection de Secrets** : Prévention de l'exposition accidentelle de clés/tokens
- **Coût Zéro** : Configuration optimisée pour les comptes GitHub gratuits

---

## 🔧 Configuration Actuelle

### ✅ Fonctionnalités Activées

| Fonctionnalité | Statut | Coût | Description |
|----------------|--------|------|-------------|
| **CodeQL Analysis** | ✅ Actif | 0€ | Analyse de sécurité JavaScript/HTML |
| **Content Security Policy** | ✅ Actif | 0€ | Blocage scripts/styles externes, JS/CSS inline interdit |
| **En-têtes de sécurité** | ✅ Actif | 0€ | X-Frame-Options, Referrer-Policy, etc. |
| **Dependabot Alerts** | ✅ Actif | 0€ | Alertes de vulnérabilités |
| **Dependabot Security Updates** | ✅ Actif | 0€ | Corrections automatiques |
| **Secret Scanning** | ✅ Actif | 0€ | Détection de secrets exposés |
| **Dependency Graph** | ✅ Actif | 0€ | Cartographie des dépendances |

### 📁 Fichiers de Configuration

```
.github/
├── workflows/
│   └── codeql.yml              # Analyse CodeQL optimisée
├── dependabot.yml              # Configuration Dependabot
└── codeql/
    └── codeql-config.yml       # Configuration CodeQL personnalisée
SECURITY.md                     # Politique de sécurité
SECURITE_AUTO_DOC.md            # Documentation sécurité automatisée
RAPPORT_AUDIT_SECURITE.md       # Rapport d'audit sécurité
```

---

## 🚀 Configuration CodeQL (Analyse de Code)

### Fichier : `.github/workflows/codeql.yml`

```yaml
name: "CodeQL Analysis"

on:
  push:
    branches: [ "main" ]
    paths:
      - '**.js'
      - '**.html'
      - '.github/workflows/codeql.yml'
  pull_request:
    branches: [ "main" ]
    paths:
  analyze:
    name: Analyze JavaScript/HTML
    runs-on: ubuntu-latest

      fail-fast: false
      matrix:
        language: [ 'javascript' ]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Initialize CodeQL
      uses: github/codeql-action/init@v3
      with:
        languages: ${{ matrix.language }}
        queries: security-extended,security-and-quality

    - name: Autobuild
      uses: github/codeql-action/autobuild@v3

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v3
      with:
        category: "/language:${{ matrix.language }}"
```

      docs/SECURITE_AUTO_DOC.md            # Documentation sécurité automatisée
      docs/RAPPORT_AUDIT_SECURITE.md       # Rapport d'audit sécurité
1. **Pas d'analyse programmée** : Suppression du `schedule:` pour éviter les exécutions automatiques
2. **Filtres de chemins** : Analyse uniquement des fichiers `.js` et `.html`
3. **Déclenchement minimal** : Seulement sur modification du code (push/PR)

- **Minutes/mois** : 0-20 minutes (seulement lors de modifications)
- **Pourcentage quota** : <1% des 2000 minutes gratuites
- **Coût** : **0€ garantis**

---

## 🤖 Configuration Dependabot

### Fichier : `.github/dependabot.yml`

```yaml
version: 2

updates:
  # Surveillance des GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    reviewers:
      - "0xCyberLiTech"
    commit-message:
      prefix: "🔧 [Security]"
      include: "scope"

  # Surveillance npm (pour futures dépendances)
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
      time: "09:00"
    open-pull-requests-limit: 5
    reviewers:
      - "0xCyberLiTech"
    commit-message:
      prefix: "📦 [Dependencies]"
      include: "scope"
    ignore:
      - dependency-name: "*"
        update-types: ["version-update:semver-major"]
```

### 🔍 Fonctionnalités

- **Surveillance GitHub Actions** : Mise à jour hebdomadaire des actions utilisées
- **Surveillance npm** : Prêt pour de futures dépendances JavaScript
- **Corrections automatiques** : PR automatiques pour les vulnérabilités
- **Filtrage intelligent** : Évite les mises à jour majeures cassantes

---

## 🔒 Politique de Sécurité

### Fichier : `SECURITY.md`

Document complet définissant :
- Processus de signalement des vulnérabilités
- Délais de réponse (48h accusé, 7j évaluation, 14j correction)
- Types de vulnérabilités acceptées (XSS, injection, CSRF, etc.)
- Reconnaissance des chercheurs en sécurité
- Historique des évolutions de la politique

---

## 🏃‍♂️ Activation sur GitHub

### 1. Accès aux Paramètres
1. Aller sur : `https://github.com/0xCyberLiTech/0xCyberLiTech.github.io`
2. Cliquer sur **Settings** (onglet du repository)
3. Menu de gauche : **Code security and analysis**

### 2. Paramètres à Activer

| Paramètre | Action | Importance |
|-----------|--------|------------|
| **Dependency graph** | ✅ Activer | Obligatoire |
| **Dependabot alerts** | ✅ Activer | Critique |
| **Dependabot security updates** | ✅ Activer | Recommandé |
| **Code scanning** | ✅ Activer | Automatique via workflow |
| **Secret scanning** | ✅ Activer | Automatique (dépôts publics) |

### 3. Vérification
Après activation, vous devriez voir :
- Badge vert "✅ Enabled" pour chaque fonctionnalité
- Onglet **Security** populé dans votre repository
- Premier scan CodeQL lancé automatiquement

---

## 🔧 Scan Manuel - Procédure Complète

### Méthode 1 : Via l'Interface GitHub

#### A. Scan CodeQL Manuel
1. **Accéder à l'onglet Actions**
   ```
   https://github.com/0xCyberLiTech/0xCyberLiTech.github.io/actions
   ```

2. **Lancer manuellement**
   - Cliquer sur "CodeQL Analysis" dans la liste des workflows
   - Bouton "Run workflow" (à droite)
   - Sélectionner la branche "main"
   - Cliquer "Run workflow"

3. **Suivre l'exécution**
   - Le scan apparaît dans la liste avec statut "In progress" 🟡
   - Cliquer dessus pour voir les détails en temps réel
   - Durée estimée : 2-5 minutes

4. **Consulter les résultats**
   - Statut final : ✅ Success ou ❌ Failure
   - Résultats détaillés dans l'onglet **Security** → **Code scanning**

#### B. Scan des Dépendances Manuel
1. **Onglet Security**
   ```
   https://github.com/0xCyberLiTech/0xCyberLiTech.github.io/security
   ```

2. **Sections disponibles**
   - **Dependabot** : Vulnérabilités des dépendances
   - **Code scanning** : Résultats CodeQL
   - **Secret scanning** : Secrets détectés

3. **Forcer une vérification**
   - Les alertes Dependabot se mettent à jour automatiquement
   - Nouveau scan lors de chaque commit

### Méthode 2 : Via Git/Terminal

#### A. Déclencher via Push
```bash
# Modification fictive pour déclencher CodeQL
echo "# Security scan $(date)" >> README.md
git add README.md
git commit -m "🔍 Trigger: Manual security scan"
git push origin main
```

#### B. Vérifier le statut
```bash
# Voir l'historique des actions
gh run list --workflow=codeql.yml

# Voir les détails d'un run spécifique
gh run view [RUN_ID] --log
```

### Méthode 3 : API GitHub (Avancé)

#### A. Lancer un workflow manuellement
```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/0xCyberLiTech/0xCyberLiTech.github.io/actions/workflows/codeql.yml/dispatches \
  -d '{"ref":"main"}'
```

#### B. Récupérer les résultats de sécurité
```bash
# Liste des alertes CodeQL
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/0xCyberLiTech/0xCyberLiTech.github.io/code-scanning/alerts

# Alertes Dependabot
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/0xCyberLiTech/0xCyberLiTech.github.io/dependabot/alerts
```

---

## 📊 Interprétation des Résultats

### 🟢 Résultats Normaux (Aucune Action Requise)

#### CodeQL Analysis
```
✅ CodeQL Analysis completed successfully
📊 0 security issues found
📁 Analyzed: 5 JavaScript files, 2 HTML files
⏱️ Analysis duration: 3m 24s
```

#### Dependabot
```
✅ No security vulnerabilities found
📦 Dependencies up to date
🔍 Last check: 2 hours ago
```

### 🟡 Résultats Attention (Action Recommandée)

#### CodeQL Warnings
```
⚠️ CodeQL found 2 potential issues:
1. [Low] Unused variable in script.js:45
2. [Medium] Potential XSS in utils.js:12
```

**Actions** :
- Nettoyer les variables inutilisées
- Vérifier l'usage de `utilEscapeHTML()`

#### Dependabot Alerts
```
🔶 1 moderate severity vulnerability:
- lodash 4.17.20 → 4.17.21 (Prototype Pollution)
```

**Actions** :
- Accepter la PR Dependabot automatique
- Tester après mise à jour

### 🔴 Résultats Critiques (Action Immédiate)

#### CodeQL Errors
```
❌ CodeQL found critical security issues:
1. [High] XSS vulnerability in script.js:125
2. [Critical] Code injection in utils.js:67
```

**Actions immédiates** :
1. Isoler le code problématique
2. Appliquer les corrections suggérées
3. Re-scanner pour confirmer la correction
4. Déployer la correction

#### Dependabot Critical
```
🚨 3 high severity vulnerabilities found:
- react 16.8.0 → 18.2.0 (Multiple CVEs)
```

**Actions immédiates** :
1. Évaluer l'impact de la mise à jour majeure
2. Tester en environnement de développement
3. Déployer la correction dans les 24h

---

## 📈 Monitoring et Maintenance

### 🔔 Notifications Automatiques

#### Email GitHub
Vous recevez automatiquement des emails pour :
- ✅ Nouvelles vulnérabilités Dependabot
- ⚠️ Échecs d'analyse CodeQL
- 🚨 Secrets détectés dans le code

#### Configuration Notifications
```
GitHub Settings → Notifications → Security alerts
✅ Email notifications for security vulnerabilities
✅ Web notifications for security alerts
```

### 📊 Dashboard de Sécurité

#### Vue d'ensemble mensuelle
1. **Onglet Security** de votre repository
2. **Insights** → **Community** pour le score de sécurité
3. **Actions** → **CodeQL Analysis** pour l'historique

#### Métriques à surveiller
- **Nombre d'alertes actives** : Objectif = 0
- **Temps de résolution moyen** : <7 jours
- **Couverture d'analyse** : 100% des fichiers JS/HTML
- **Fréquence des scans** : À chaque modification

### 🔄 Maintenance Régulière

#### Hebdomadaire
- [ ] Vérifier les nouvelles alertes Dependabot
- [ ] Examiner les résultats CodeQL du dernier scan
- [ ] Merger les PR de sécurité Dependabot testées

#### Mensuelle
- [ ] Réviser la configuration des workflows
- [ ] Mettre à jour la documentation sécurité (README, SECURITY.md, SECURITE_AUTO_DOC.md)
- [ ] Audit complet des permissions et accès

#### Trimestrielle
- [ ] Évaluer l'ajout de nouvelles règles CodeQL
- [ ] Réviser la politique de sécurité (SECURITY.md)
- [ ] Former l'équipe sur les nouvelles menaces

---

## 🚨 Procédures d'Urgence

### En cas de Vulnérabilité Critique

#### 1. Évaluation Immédiate (< 1h)
```bash
# Vérifier l'impact
git log --oneline -10
git diff HEAD~1 HEAD -- "*.js" "*.html"

# Isoler si nécessaire
git revert [COMMIT_HASH]
git push origin main
```

#### 2. Communication (< 2h)
- Créer une issue GitHub avec le label "security"
- Notifier les utilisateurs via README si impact public
- Documenter la timeline dans CHANGELOG.md

#### 3. Correction (< 24h)
- Développer le correctif sur une branche dédiée
- Scanner la correction avec CodeQL
- Déployer via PR reviewée

### En cas de Détection de Secret

#### 1. Révocation Immédiate
```bash
# Si token GitHub détecté
gh auth refresh --scopes repo,admin:public_key

# Si clé API détectée
# → Révoquer sur le service concerné (GitHub, etc.)
```

#### 2. Nettoyage de l'historique
```bash
# Supprimer de l'historique Git (DANGER)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch [FICHIER_SECRET]' \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

#### 3. Prévention Future
- Ajouter le pattern au `.gitignore`
- Configurer des hooks pre-commit
- Former l'équipe sur les bonnes pratiques

---

## 📚 Ressources et Documentation

### 📖 Documentation Officielle
- [GitHub Advanced Security](https://docs.github.com/en/get-started/learning-about-github/about-github-advanced-security)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)

### 🛠️ Outils Complémentaires
- **GitHub CLI** : `gh security` pour la gestion en ligne de commande
- **VS Code Extension** : "GitHub Security" pour l'intégration IDE
- **Browser Extension** : "GitHub Security Tab" pour accès rapide

### 🎓 Formation Continue
- [GitHub Security Lab](https://securitylab.github.com/)
- [OWASP Web Security](https://owasp.org/www-project-web-security-testing-guide/)
- [Mozilla Developer Security](https://developer.mozilla.org/en-US/docs/Web/Security)

---

## 📞 Support et Contact

### 🆘 En cas de Problème
1. **Documentation** : Consulter ce guide en premier
2. **GitHub Community** : [community.github.com](https://github.community/)
3. **GitHub Support** : Via l'interface GitHub (Settings → Support)

### 📧 Contact Sécurité
- **Repository** : https://github.com/0xCyberLiTech/0xCyberLiTech.github.io
- **Security Policy** : Voir SECURITY.md
- **Maintainer** : @0xCyberLiTech

---

## 📝 Changelog de la Configuration

### Version 2.0 (25 décembre 2025)
- ✅ Ajout CSP stricte et en-têtes de sécurité dans les pages HTML
- ✅ Sanitization automatique des partiels HTML
- ✅ Tests automatisés (Jest) pour utilEscapeHTML
- ✅ Documentation sécurité enrichie (SECURITE_AUTO_DOC.md, RAPPORT_AUDIT_SECURITE.md)

### Version 1.0 (2 octobre 2025)
- ✅ Configuration initiale CodeQL
- ✅ Mise en place Dependabot
- ✅ Création politique de sécurité
- ✅ Optimisation coût zéro
- ✅ Documentation complète

### Prochaines Améliorations
- 🔄 Intégration webhooks pour notifications Slack/Teams
- 📊 Dashboard de métriques de sécurité personnalisé
- 🤖 Automatisation complète des corrections mineures

---

*📅 Dernière mise à jour : 25 décembre 2025*  
*👤 Maintenu par : 0xCyberLiTech*  
*🔄 Version : 2.0*