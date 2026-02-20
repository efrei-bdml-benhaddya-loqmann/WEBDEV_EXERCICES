# 📋 Tasklist – Générateur de besoins en protéines

Suivi de l'avancement du mini-projet React.

## 1. 🏗️ Setup & Structure de base
- [x] Analyser les besoins et structurer les composants (Formulaire, Tableau, Item)
- [x] Nettoyer le projet Vite par défaut (`App.tsx`, `App.css`)
- [x] Préparer les données constantes (Objectifs et leurs ratios g/kg)

## 2. 🎛️ Etat & Formulaire interactif
- [x] Créer l'état pour les objectifs sélectionnés (tableau d'objets ou d'IDs)
- [x] Créer l'état pour le poids minimum (`number`)
- [x] Créer l'état pour le poids maximum (`number`)
- [x] Créer l'état pour le nombre de lignes (`number`)
- [x] Implémenter les inputs (poids min/max, nb lignes) avec Two-Way Binding
- [x] Implémenter les checkboxes pour la sélection multiple d'objectifs

## 3. 🧠 Logique de calcul
- [x] Développer une fonction pour générer la liste des poids (de min à max, répartis sur N lignes)
- [x] Développer une fonction de calcul des besoins (Poids * RatioMin / Poids * RatioMax)

## 4. 📊 Affichage du Tableau Dynamique
- [x] Créer l'en-tête dynamique du tableau (colonne Poids + colonnes par objectif coché)
- [x] Générer les lignes du tableau en fonction des poids calculés
- [x] Afficher les plages de protéines (ex: `112 – 126 g/jour`) dans chaque cellule correspondante
- [x] Gérer le rendu conditionnel (ne rien afficher ou message si aucun objectif n'est sélectionné)

## 5. 💅 Design & UX
- [x] Appliquer un style moderne et premium (CSS Vanilla)
- [x] Assurer la lisibilité des données (bordures, alternance de couleurs de lignes)
- [x] Ajouter des transitions/animations subtiles lors de la mise à jour des données

## 6. 🌟 Bonus (En option)
- [x] Validation des champs : Bloquer `min > max` ou `nb lignes < 2`
- [x] Responsive design : Adapter le tableau sur mobile (scroll horizontal ou empilement)
- [ ] Export : Ajouter un bouton pour télécharger les données ou imprimer
