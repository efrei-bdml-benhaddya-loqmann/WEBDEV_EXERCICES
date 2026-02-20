# 🥩 Calculateur de besoins protéiques quotidiens

Application React permettant de générer **dynamiquement un tableau de besoins journaliers en protéines** en fonction du poids et des objectifs sportifs de l'utilisateur.

> Mini-projet réalisé dans le cadre du cours **WebDev – EFREI - BD/ML** (Cours 3)
> Auteur: Loqmann BENHADDYA (skezu)

---

## ✨ Fonctionnalités

- **Sélection des objectifs** : Sédentaire, Endurance, Conservation ou Prise de masse musculaire
- **Plage de poids configurable** : poids minimum et maximum (en kg)
- **Nombre de lignes** : répartition automatique des poids intermédiaires
- **Tableau dynamique** : plages de protéines calculées (en g/jour) pour chaque objectif sélectionné
- **Validation des champs** : poids min < poids max, valeurs strictement positives
- **Navigation fluide** : le formulaire et le tableau s'affichent alternativement avec un bouton « Retour »

---

## 🧮 Recommandations utilisées

| Objectif                            | Ratio (g/kg/jour) |
|-------------------------------------|-------------------|
| Sédentaire                          | 0,8 – 1,0         |
| Endurance                           | 1,2 – 1,6         |
| Conservation de la masse musculaire | 1,6 – 1,8         |
| Prise de masse musculaire           | 1,8 – 2,2         |

---

## 🗂️ Structure du projet

```
src/
├── App.tsx                          # Composant racine – gestion de l'état global et du routing vue
├── data/
│   └── data.ts                      # Données des objectifs (id, nom, ratios min/max)
└── components/
    ├── form/
    │   ├── Form.tsx                 # Formulaire de saisie (objectifs, poids, nb lignes)
    │   └── FormItem.tsx             # Sous-composant réutilisable pour un champ de formulaire
    ├── table/
    │   └── Table.tsx                # Tableau généré dynamiquement à partir des props
    └── util/
        ├── empty/                   # Composant affiché quand aucun objectif n'est sélectionné
        └── error/                   # Composant affiché en cas d'erreur de validation
```

---

## 🚀 Lancer le projet

### Prérequis

- [Node.js](https://nodejs.org/) ≥ 18 **ou** [Bun](https://bun.sh/)

### Installation

```bash
# Avec npm
npm install

# Avec pnpm
pnpm install

# Avec bun
bun install
```

### Démarrage en développement

```bash
# Avec npm
npm run dev

# Avec pnpm
pnpm run dev

# Avec bun
bun --watch run dev
```

L'application est disponible sur [http://localhost:5173](http://localhost:5173).

---

## 🗺️ Diagramme du flow utilisateur

```mermaid
flowchart TD
    A([🚀 Ouverture de l'application]) --> B[Affichage du formulaire]

    B --> C[Sélectionner un ou plusieurs objectifs]
    C --> D[Saisir le poids minimum]
    D --> E[Saisir le poids maximum]
    E --> F[Choisir le nombre de lignes]

    F --> G{Valeurs valides ?}

    G -- ❌ Non --> H[⚠️ Afficher l'erreur\npoids min ≥ max\nlignes < 2 ou > écart poids]
    H --> B

    G -- ✅ Oui --> I[🧮 Calcul des poids intermédiaires\nmin → max répartis sur N lignes]

    I --> J[🧮 Calcul des besoins en protéines\npour chaque poids × ratio objectif]

    J --> K[📊 Génération du tableau dynamique]

    K --> L[Affichage\nColonne Poids + une colonne par objectif sélectionné\nChaque cellule = plage en g/jour]

    L --> M{L'utilisateur clique\nsur Retour ?}

    M -- ✅ Oui --> B
    M -- ❌ Non --> N([🏁 Fin])
```
---

---

## 🛠️ Stack technique

| Technologie | Version |
|-------------|---------|
| React       | 19      |
| TypeScript  | 5.9     |
| Vite        | 7       |
