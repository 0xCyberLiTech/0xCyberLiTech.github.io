# Guide de Contribution - 0xCyberLiTech Portfolio v2.1

Merci de votre intérêt pour contribuer au portfolio 0xCyberLiTech ! Ce document vous guide à travers le processus de contribution.

**Dernière mise à jour** : 1er octobre 2025

## 🤝 Comment Contribuer

### Types de Contributions Appréciées

- 🐛 **Correction de bugs** : Signalement et correction d'erreurs
- ✨ **Nouvelles fonctionnalités** : Améliorations et nouvelles features
- 📚 **Documentation** : Amélioration de la documentation existante
- 🎨 **Design/UX** : Amélioration de l'interface utilisateur
- ⚡ **Performance** : Optimisation du code et des performances
- ♿ **Accessibilité** : Amélioration de l'accessibilité web
- 🔒 **Sécurité** : Renforcement de la sécurité
- 📊 **Métriques** : Amélioration du monitoring et analytics

## 🚀 Processus de Contribution

### 1. Préparation

```bash
# Fork le repository sur GitHub
# Ensuite, clonez votre fork localement
git clone https://github.com/VOTRE_USERNAME/0xCyberLiTech.github.io.git
cd 0xCyberLiTech.github.io

# Ajoutez le repository original comme remote
git remote add upstream https://github.com/0xCyberLiTech/0xCyberLiTech.github.io.git

# Assurez-vous d'avoir la dernière version
git fetch upstream
git checkout main
git merge upstream/main
```

### 2. Développement

```bash
# Créez une nouvelle branche pour votre feature
git checkout -b feature/nom-de-votre-feature

# OU pour un bugfix
git checkout -b fix/description-du-bug

# Faites vos modifications...
# Testez localement avec un serveur HTTP
python -m http.server 8000
# Puis ouvrez http://localhost:8000
```

### 3. Tests et Validation

Avant de soumettre votre contribution, assurez-vous que :

- ✅ Le site fonctionne correctement en local
- ✅ Toutes les fonctionnalités existantes marchent toujours
- ✅ Votre code respecte les standards du projet
- ✅ La documentation est mise à jour si nécessaire
- ✅ Aucune erreur dans la console navigateur
- ✅ Le design reste cohérent sur mobile/tablette/desktop

### 4. Soumission

```bash
# Commitez vos changements
git add .
git commit -m "feat: description de votre contribution"

# Pushez vers votre fork
git push origin feature/nom-de-votre-feature

# Créez une Pull Request sur GitHub
```

## 📋 Standards de Code

### JavaScript

#### Structure et Organisation
```javascript
/**
 * Description de la fonction
 * @param {string} param1 - Description du paramètre
 * @param {Object} param2 - Objet de configuration
 * @returns {Promise<Array>} Description du retour
 */
function maFonction(param1, param2) {
    // Implémentation...
}
```

#### Conventions de Nommage
- **Variables/Fonctions** : `camelCase`
- **Constantes** : `UPPER_SNAKE_CASE`
- **Classes** : `PascalCase`
- **Fichiers** : `kebab-case.js` ou `camelCase.js`

#### Bonnes Pratiques v2.1
- Utilisez `const` par défaut, `let` si réassignation nécessaire
- Préférez les arrow functions pour les callbacks
- Utilisez async/await plutôt que les Promises chains
- **OBLIGATOIRE** : Échappez toujours les données utilisateur avec `utilEscapeHTML()`
- Documentez les fonctions avec JSDoc complet
- **Performance** : Utilisez le DOM Cache System pour les éléments répétés
- **Modularité** : Séparez clairement les responsabilités (HTML/CSS/JS)
- **Sécurité** : Validez toutes les entrées externes (GitHub API, etc.)
- **Clean Code** : Zéro tolérance pour le code mort ou dupliqué

### CSS

#### Structure
```css
/* Variables CSS en tête de fichier */
:root {
    --variable-name: value;
}

/* Organisation par sections */
/* ==========================================================================
   Section Name
   ========================================================================== */

.component-name {
    /* Propriétés dans l'ordre logique */
    display: flex;
    position: relative;
    /* etc. */
}
```

#### Conventions de Nommage
- Utilisez la convention **BEM** : `.block__element--modifier`
- Préférez les classes aux IDs pour le styling
- Utilisez des noms descriptifs : `.project-tile` plutôt que `.pt`

#### Variables CSS
- Utilisez les variables CSS pour toutes les valeurs récurrentes
- Groupez les variables par catégorie (couleurs, tailles, animations)

### HTML

#### Structure Sémantique
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Titre descriptif</title>
</head>
<body>
    <main>
        <section aria-label="Description de la section">
            <!-- Contenu -->
        </section>
    </main>
</body>
</html>
```

#### Accessibilité
- Utilisez les balises sémantiques appropriées
- Ajoutez des attributs ARIA quand nécessaire
- Assurez-vous que tous les éléments interactifs sont accessibles au clavier
- Fournissez des textes alternatifs pour les images

## 📝 Format des Commits

Utilisez le format **Conventional Commits** :

```
<type>[scope optionnel]: <description>

[corps optionnel]

[pied de page optionnel]
```

### Types de Commits
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Modification de documentation
- `style`: Changement de formatage (sans impact fonctionnel)
- `refactor`: Refactorisation de code
- `perf`: Amélioration de performance
- `test`: Ajout ou modification de tests
- `chore`: Tâches de maintenance

### Exemples
```bash
feat: ajouter animation de transition pour les modales
fix: corriger l'affichage des badges NEW sur mobile
docs: améliorer la documentation de l'API GitHub
style: uniformiser l'indentation dans script.js
```

## 🐛 Signalement de Bugs

### Avant de Signaler
1. Vérifiez que le bug n'a pas déjà été signalé
2. Testez sur plusieurs navigateurs si possible
3. Vérifiez que vous avez la dernière version

### Template de Bug Report
```markdown
## Description du Bug
Description claire et concise du problème.

## Étapes de Reproduction
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement Attendu
Description de ce qui devrait se passer.

## Captures d'Écran
Si applicable, ajoutez des captures d'écran.

## Environnement
- OS: [ex. Windows 10]
- Navigateur: [ex. Chrome 91, Firefox 89]
- Version: [ex. 1.1.0]

## Contexte Additionnel
Toute information supplémentaire utile.
```

## 💡 Suggestions de Fonctionnalités

### Template de Feature Request
```markdown
## Résumé de la Fonctionnalité
Description concise de la fonctionnalité souhaitée.

## Motivation
Pourquoi cette fonctionnalité serait-elle utile ?

## Description Détaillée
Description complète de comment cette fonctionnalité devrait fonctionner.

## Alternatives Considérées
Autres solutions ou fonctionnalités que vous avez envisagées.
```

## 🔍 Processus de Review

### Checklist pour les Pull Requests
- [ ] Le code suit les standards du projet
- [ ] La fonctionnalité est testée localement
- [ ] La documentation est mise à jour
- [ ] Les commits suivent le format conventionnel
- [ ] Pas de conflits avec la branche main
- [ ] Le design reste cohérent

### Processus de Review
1. **Review automatique** : Vérification de la syntaxe et des standards
2. **Review manuelle** : Examen par un contributeur expérimenté
3. **Tests** : Validation du fonctionnement
4. **Merge** : Intégration dans la branche principale

## 🏷️ Releases et Versioning

Le projet suit le **Semantic Versioning** (SemVer) :
- `MAJOR.MINOR.PATCH`
- `MAJOR` : Changements incompatibles
- `MINOR` : Nouvelles fonctionnalités compatibles
- `PATCH` : Corrections de bugs

## 🙏 Reconnaissance des Contributeurs

Tous les contributeurs sont reconnus dans :
- Le fichier `README.md`
- Les release notes
- Un fichier `CONTRIBUTORS.md` (à venir)

## 📞 Questions et Support

### Où Demander de l'Aide
- **Issues GitHub** : Pour les bugs et feature requests
- **Discussions GitHub** : Pour les questions générales
- **Email** : contact@0xcyberlitech.io (à venir)

### Temps de Réponse
- Issues : Généralement sous 48h
- Pull Requests : Généralement sous 72h
- Questions : Généralement sous 24h

## 🔒 Sécurité

Si vous découvrez une vulnérabilité de sécurité, **NE PAS** créer d'issue publique. 
Contactez directement l'équipe via :
- Email privé (à configurer)
- Message privé sur GitHub

---

Merci de contribuer au projet 0xCyberLiTech ! Votre aide est précieuse pour améliorer ce portfolio technique. 🚀