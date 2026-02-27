

### Structure de l'Endpoint API

- `GET` `/` : Vérificateur de santé
- `GET` `/history` : Retourne l'historique des analyses
- `POST` `/analyze` : Analyse le sentiment d'un texte, l'ajoute à l'historique et retourne le résultat
- `DELETE` `/history/:id` : Supprime une analyse spécifique de l'historique
- `DELETE` `/history` : Supprime l'historique

### Notes

**Usage de `crypto.randomUUID()` pour générer des UUIDs**

J'ai utilisé `crypto.randomUUID()` pour générer des UUIDs car c'est la meilleure pratique pour générer des identifiants uniques contrairement à `uuidv4()`.
Source: https://dev.to/simplr_sh/ditch-the-import-why-cryptorandomuuid-is-your-new-best-friend-for-uuids-2lp3

**Stockage de l'historique**

J'ai utilisé un tableau simple en mémoire pour stocker l'historique des analyses car c'est la meilleure pratique pour stocker des données temporaires. 
Une amélioration possible serait de stocker l'historique dans une base de données. (si non développé avant le rendu)

**Que se passe-t-il si le model API est indisponible ?**

Si le model API est indisponible, le backend retourne un warning en indiquant que le model API est indisponible et effectue une analyse simple `mockPredict(text)` en fonction du nombre de mots jugés positifs ou negatifs dans le texte.