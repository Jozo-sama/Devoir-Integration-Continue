<<<<<<< HEAD
# Devoir-Integration-Continue
=======
# 🎟 EventPass – Site d'achat de tickets en ligne

> Projet d'intégration continue – École Polytechnique de Ouagadougou

## 📁 Structure du projet

```
eventpass/
├── index.html              # Page d'accueil
├── events.html             # Liste de tous les événements
├── contact.html            # Formulaire de contact
├── css/
│   └── style.css           # Feuille de styles principale
├── js/
│   ├── data.js             # Données des événements
│   ├── cart.js             # Logique du panier
│   ├── app.js              # Script page d'accueil
│   ├── events.js           # Script page événements
│   └── contact.js          # Script formulaire contact
├── .github/
│   └── workflows/
│       └── ci-cd.yml       # Pipeline GitHub Actions
├── .htmlvalidate.json      # Config lint HTML
├── .stylelintrc.json       # Config lint CSS
└── README.md
```

---

## ✨ Fonctionnalités

- 🏠 **Page d'accueil** : hero section, 3 événements à la une
- 🎪 **Page événements** : liste complète, filtres par catégorie et recherche, modal de détail
- 🛒 **Panier** : ajout, suppression, modification des quantités, total
- ✅ **Confirmation** : modal de confirmation de commande
- 📱 **Responsive** : mobile, tablette, desktop
- 📧 **Formulaire de contact** : validation côté client

---

## 🔀 Stratégie Git
```
main                  ← branche principale (protégée)
└── feature/html-css   ← développement de la partie css html
└── feature/js         ← développement de la partie javascript
```

### Workflow
1. Créer une branche `feature/ma-feature`
2. Développer et commiter régulièrement
3. Ouvrir une **Pull Request** vers `main`
4. **Revue de code** par l'autre binôme
5. **Merge** après validation et succès du pipeline CI

---

## ⚙️ Pipeline CI/CD (GitHub Actions)

Le fichier `.github/workflows/ci.yml` exécute automatiquement :

| Étape | Outil | Déclencheur |
|-------|-------|-------------|
| Lint HTML | `html-validate` | Push & PR |
| Lint CSS | `stylelint` | Push & PR |
| Validation JS | `eslint` | Push & PR |
| Déploiement | GitHub Pages | Push sur `main` uniquement |

---
## 👥 Équipe

| Binôme            | Pages assignées |
|-------------------|----------------|
| TIENDREBEOGO AXEL | `index.html`, `css/style.css`, `contact.html`,`events.html`  |
| ZONGO B Josaphat  | `js/app.js`, `js/cart.js`, `js/contact.js`,`js/datat.js`,`js/event.js` |

---

## 📋 Technologies
- **HTML5** sémantique
- **CSS3** (variables CSS, Grid, Flexbox, animations)
- **JavaScript** vanilla (ES2020)
- **GitHub Actions** (CI/CD)
>>>>>>> master
