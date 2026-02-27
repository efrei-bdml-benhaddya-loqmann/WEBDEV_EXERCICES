## Contexte

Vous devez concevoir une application web permettant à un utilisateur d’entrer un texte et d’obtenir une analyse automatique de son sentiment. L’application doit envoyer le texte à un service externe capable de prédire si le sentiment est positif, négatif ou neutre, puis afficher le résultat de manière claire et compréhensible.

L’objectif est de créer une application simple, interactive et structurée, permettant d’exploiter les prédictions d’un modèle d’analyse de texte.

---

## Objectifs fonctionnels

### 1. Saisir un texte

L’utilisateur doit pouvoir :

- écrire un texte dans une zone de saisie
- modifier ce texte librement
- soumettre le texte pour analyse

Exemples de textes :

- « Ce produit est vraiment excellent »
- « Je suis déçu par la qualité »
- « L’expérience est correcte »

---

### 2. Lancer l’analyse

Une action permet d’envoyer le texte pour obtenir une prédiction.

Pendant l’analyse, l’application doit indiquer que le traitement est en cours.

---

### 3. Afficher le résultat

Une fois l’analyse terminée, l’application doit afficher :

- le sentiment détecté (positif, négatif ou neutre)
- un score de confiance
- une indication visuelle claire du résultat

---

### 4. Afficher un historique des analyses

L’application doit conserver les dernières analyses effectuées et permettre à l’utilisateur de :

- voir la liste des textes analysés
- voir le résultat associé à chaque texte
- sélectionner une analyse pour revoir son résultat

---

### 5. Gérer les erreurs

L’application doit gérer les cas suivants :

- texte vide
- erreur lors de l’analyse
- absence de réponse

Un message clair doit être affiché à l’utilisateur.

---

## Contraintes fonctionnelles

- Le texte doit être envoyé à un service externe capable de faire une prédiction.
- Le résultat doit être exploitable et affiché correctement.
- L’utilisateur doit pouvoir effectuer plusieurs analyses.
- Les résultats doivent être présentés de manière lisible.

---

## Structure fonctionnelle attendue

L’application doit comporter plusieurs parties distinctes :

- une zone de saisie
- un bouton pour lancer l’analyse
- une zone d’affichage du résultat
- une liste des analyses précédentes

---

## Fonctionnalités optionnelles (bonus)

- supprimer un élément de l’historique
- vider tout l’historique
- limiter le nombre d’éléments affichés
- afficher un indicateur visuel du niveau de confiance
- pré-remplir avec des exemples

---

## Résultat attendu

Une application interactive permettant à un utilisateur de :

- entrer un texte
- obtenir une analyse de sentiment
- visualiser clairement le résultat
- consulter les analyses précédentes

L’accent doit être mis sur la clarté, la structure de l’interface et l’exploitation correcte des résultats du modèle.