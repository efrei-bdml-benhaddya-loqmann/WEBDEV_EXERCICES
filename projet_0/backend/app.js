const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route de base
app.get('/', (requete, reponse) => {
    reponse.send('Bienvenue sur mon API Express !');
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
