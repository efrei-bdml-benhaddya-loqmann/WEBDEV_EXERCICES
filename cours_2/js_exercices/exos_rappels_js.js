// ============================================================================
// TP JAVASCRIPT - RAPPELS POUR REACT
// ============================================================================

console.log("=== TP JAVASCRIPT - EXERCICES 1 À 8 ===\n");

// ============================================================================
// 1. LECTURE ET MANIPULATION DE FICHIERS JSON
// ============================================================================
// Énoncé : Lisez le fichier JSON 'voitures.json' et affichez son contenu
// sous différentes formes (raw, parsé, stringifié). 
// Pour cela vous pourrez utiliser la méthode readFileSync du module fs de Node,
// et l'objet JSON natifs à Javascript : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON

console.log("=== 1. Lecture et manipulation de fichiers JSON ===");
const fs = require("fs");
const { default: Car } = require("./Car");
const path = 'cours_2/js_exercices/voitures.json';
try {
    voitures_json = fs.readFileSync(path);
    parsed_voitures = JSON.parse(voitures_json);
    stringified_voitures = JSON.stringify(parsed_voitures);
    console.log("RAW:");
    console.log(voitures_json);
    console.log("PARSED:")
    console.log(parsed_voitures);
    console.log("STRINGIFIED:")
    console.log(stringified_voitures);

}
catch (err) {
    console.log(err);
}


// Affichage des différentes représentations des données

// ============================================================================
// 2. CRÉATION ET IMPORT DE CLASSE
// ============================================================================
// Énoncé : Créez une classe Car dans un fichier séparé (Car.js). 
// Cette classe devra avoir la meme structure que les objets présents dans voitures.json. 
// Elle devra obligatoirement contenir les paramètres : 
// id, modelName, ownerFirstName, ownerLastName, age et topSpeed.
// age et topSpeed pourront avoir des valeurs par défaut de 0.
// Définissez une méthode permettant d'afficher de manière lisible les atributs d'un objet de type Car.
// Ensuite ajouter une méthode statique pour décrire à quoi sert l'objet Car. 
// Enfin importez-la et instanciez-la pour constater que tout fonctionne.

console.log("\n=== 2. Création et import de classe ===");
const car = new Car(101, "Clio", "Pedro", "Mucho", 34, 180);
const car2 = new Car(101, "Clio", "Pedro", "Mucho");
car.printEssentialCarInfos();
Car.sayHello();
car2.printEssentialCarInfos();


// ============================================================================
// 3. TRANSFORMATION DE DONNÉES
// ============================================================================
// Énoncé : À partir des données du JSON, créez un tableau d'instances de Car

console.log("\n=== 3. Transformation de données ===");
const cars = [];
for (const voiture of parsed_voitures) {
    const car = new Car(voiture.id, voiture.modele.nom, voiture.proprietaire.prenom, voiture.proprietaire.nom, voiture.proprietaire.age, voiture.modele.vitesse_de_pointe_kmH, voiture.modele.marque, voiture.modele.id_modele, voiture.modele.numero_serie);
    cars.push(car);
    console.log("Voiture", voiture.id, "ajoutée.");
}
console.log("Opération terminée.", cars.length, "voitures ajoutées.");

// ============================================================================
// 4. UTILISATION DES MÉTHODES DE TABLEAUX
// ============================================================================
// Énoncé : Utilisez différentes méthodes sur les tableaux
// pour effectuer des opérations sur les données des voitures

console.log("\n=== 4. Utilisation des méthodes de tableaux ===");

// 4.1. Afficher les informations de chaque voiture de votre tableaux de voitures
console.log("\n=== 4.1. Afficher les informations de chaque voiture de votre tableaux de voitures ===");
for (const car of cars) {
    car.printEssentialCarInfos();
}

// 4.2. Récupérer dans le tableau la voiture du modèle Clio
console.log("\n=== 4.2. Récupérer dans le tableau la voiture du modèle Clio ===");
const clio = cars.find(car => car.model.name === "Clio");
console.log(clio);

// 4.3. Calculer la somme des ages disponibles des propriétaires
console.log("\n=== 4.3. Calculer la somme des ages disponibles des propriétaires ===");
const sumAges = cars.reduce((sum, car) => sum + car.owner.age, 0);
console.log(sumAges);

// 4.4. Calculer la vitesse de pointe moyenne sur toutes les voitures répertoriées
console.log("\n=== 4.4. Calculer la vitesse de pointe moyenne sur toutes les voitures répertoriées ===");
const avgTopSpeed = cars.reduce((sum, car) => sum + car.model.topSpeed, 0) / cars.length;
console.log(avgTopSpeed);

// ============================================================================
// 5. DESTRUCTURATION
// ============================================================================
// Énoncé : Utilisez la destructuration pour extraire des valeurs de tableaux
// et d'objets.

console.log("\n=== 5. Destructuration ===");

// 5.1. 
// On veut abandonner la représentation par tableau qui n'est pas forcément pratique
// On va destructurer le tableau en 3 objets cars distincts : clioCar, alpineCar et ferrariCar
console.log("\n=== 5.1 On destructurer le tableau en 3 objets cars distincts : clioCar, alpineCar et ferrariCar ===");
const [clioCar, alpineCar, ferrariCar] = cars;
console.log(clioCar);
console.log(alpineCar);
console.log(ferrariCar);


// 5.2. De même pour une manipulation plus simple nous voulons avoir à disposition, 
// le prénom, nom et l'âge du conducteur de la Alpine directement sous forme de variable.
console.log("\n=== 5.2. De même pour une manipulation plus simple nous voulons avoir à disposition")
// le prénom, nom et l'âge du conducteur de la Alpine directement sous forme de variable. ===");
const { firstName, lastName, age } = alpineCar.owner;
console.log(firstName, lastName, age);


// 5.3. Je souhaiterais avoir une fonction qui simplement prend un objet owner et m'affiche ses informations.
// Je dois être capable dans cette fonction de pouvoir manipuler les différents champs de l'objet, 
// sans faire appel à l'objet initial.

console.log("\n=== 5.3. Je souhaiterais avoir une fonction qui simplement prend un objet owner et m'affiche ses informations.")
function printOwnerInfos({ firstName, lastName, age }) {
    console.log("firstName : ", firstName)
    console.log("lastName : ", lastName)
    console.log("age : ", age)
}

printOwnerInfos(alpineCar.owner);


// 5.4. Similaire à la précédente question je voudrais avoir une fonction qui me permette de 
// manipuler toutes les informations d'une voiture sans avoir besoin de faire appel à l'objet passé.
// Vous pouvez prendre l'exemple de la voiture 103 et afficher ses informations sans appeler l'objet d'origine.

console.log("\n=== 5.4. Similaire à la précédente question je voudrais avoir une fonction qui me permette de manipuler toutes les informations d'une voiture sans avoir besoin de faire appel à l'objet passé.")
function printCarInfos({ name, brand, modeleId, serialNumber, topSpeed }) {
    console.log("name : ", name)
    console.log("brand : ", brand)
    console.log("modeleId : ", modeleId)
    console.log("serialNumber : ", serialNumber)
    console.log("topSpeed : ", topSpeed)
}

printCarInfos(ferrariCar.model);

// ============================================================================
// 6. SPREAD OPERATOR
// ============================================================================
// Énoncé : Comprenez la différence entre l'assignation par référence et 
// la copie avec le spread operator sur les tableaux et objets

console.log("\n=== 6. Spread Operator ===");

// 6.1. Créez un nouveau tableau "voitures" et affectez lui le précédent tableau cars.
// Modifiez le tableau "voitures". Affichez ensuite le tableau voitures et cars, que constatez-vous ?

console.log("===6.1. Nouveau tableau par affectation/reference ")
const voitures = cars;
voitures.push(new Car(104, "Clio", "Pedro", "Mucho", 34, 180, "Renault", 1203, 12345678));
console.log(voitures);
console.log(cars);

// 6.2. Créez une copie d'une tablea cars disont "automobiles" mais cette fois-ci en 
// utilisant une manière qui me permettra d'avoir une copie distincte d'une tableau cars.
console.log("===6.2. Copie distincte d'un tableau cars ===")
const automobiles = [...cars];
automobiles.push(new Car(105, "Clio", "Pedro", "Mucho", 34, 180, "Renault", 1203, 12345678));
console.log(automobiles);
console.log(cars);

// ============================================================================
// 7. HIGHER ORDER FUNCTIONS ET FONCTIONS COMME VALEURS
// ============================================================================
// Énoncé : Explorez les fonctions en tant que valeurs de première classe,
// les fonctions anonymes, et les higher order functions

console.log("\n=== 7. Higher Order Functions et fonctions comme valeurs ===");

// 7.0. Créez une fonction anonyme et affectez la à une variable. Faites de même pour 
// une arrow function.
console.log("===7.0. Fonction anonyme et arrow function ===")
const fonctionAnonyme = function () {
    console.log("Je suis une fonction anonyme")
}
const arrowFunction = () => {
    console.log("Je suis une arrow function")
}
fonctionAnonyme()
arrowFunction()


// ============================================================================
// 7.1. HIGHER ORDER FUNCTION POUR FORMATER LES STRINGS
// ============================================================================
// Énoncé : Créer une fonction qui applique sur tous les champs de type string 
// du premier niveau d'un objet une potentielle méthode de formatage de string.
// Pour info : Object.entries(monObjet) retourne un array de paires [clé, valeur] 
// des propriétés énumérables d'un objet.

console.log("\n--- 7.1. Higher order function pour formater les strings :");
const formatString = (monObjet) => {
    for (let [key, value] of Object.entries(monObjet)) {
        if (typeof value == "string") value = value.toUpperCase()
        console.log(key, value)
    }
}

formatString(alpineCar.owner)

// ============================================================================
// 7.2. FONCTIONS DE TRANSFORMATION DE STRINGS
// ============================================================================
// Énoncé : Créer 2 fonctions permettant de prendre une string et de 
// transformer tous ses caractères en majuscule et une autre en minuscule.

console.log("\n--- 7.2. Fonctions de transformation :");
const toUpperCase = (str) => str.toUpperCase()
const toLowerCase = (str) => str.toLowerCase()

// ============================================================================
// 7.3. APPLICATION DE LA FONCTION DE FORMATAGE
// ============================================================================
// Énoncé : Utiliser maintenant votre précédente fonction pour appliquer 
// une transformation des strings à un sous-objet owner de la class Car. Vous pouvez 
// l'appliquer sur le propriétaire de la voiture Alpine par exemple. 

console.log("\n--- 7.3. Application de formatage sur un sous-objet :");
const formatStringWithFunction = (monObjet, fonction) => {
    for (let [key, value] of Object.entries(monObjet)) {
        if (typeof value == "string") value = fonction(value)
        console.log(key, value)
    }
}

formatStringWithFunction(clioCar.model, toUpperCase)

// ============================================================================
// 7.4. APPLICATION SUR UN OBJET COMPLET
// ============================================================================
// Énoncé : Appliquer maintenant cette fonction sur tout l'objet. 
// Essayez de trouver la manière la plus élégante/simple/réutilisable de le faire

console.log("\n--- 7.4. Application sur un objet complet :");
const formatStringOfCarObject = (monObjet, fonction) => {
    formatStringWithFunction(monObjet.model, fonction)
    formatStringWithFunction(monObjet.owner, fonction)
}

formatStringOfCarObject(clioCar, toUpperCase)


// ============================================================================
// 8. GESTION DES ERREURS
// ============================================================================

console.log("\n=== EXERCICE 8 : GESTION DES ERREURS ===\n");

// ============================================================================
// 8.1. Try-Catch basique
// ============================================================================
// Énoncé : Créez une fonction parseCarData(jsonString) qui prend une chaîne 
// JSON et retourne l'objet parsé. Si le parsing échoue, la fonction doit 
// capturer l'erreur et retourner null tout en affichant un message d'erreur 
// dans la console.

console.log("--- 8.1. Try-Catch basique ---");

function parseCarData(jsonString) {
    try {
        return JSON.parse(jsonString)
    } catch (error) {
        console.log("Erreur de parsing : ", error, "\n" + "=".repeat(100))
        return null
    }
}

// Tests
const validJson = '{"modele": "Clio", "prix": 15000}';
const invalidJson = '{modele: "Clio", prix: 15000}'; // JSON invalide (manque guillemets)

console.log("Parsing JSON valide :", parseCarData(validJson));
console.log("Parsing JSON invalide :", parseCarData(invalidJson));

// ============================================================================
// 8.2. Erreurs personnalisées
// ============================================================================
// Énoncé : Créez une classe d'erreur personnalisée CarValidationError qui 
// étend Error. Ensuite, créez une fonction validateCar(car) qui vérifie 
// qu'un objet voiture possède bien les propriétés id, model et owner. 
// Si une propriété manque, lancez une CarValidationError avec un message explicite.

console.log("\n--- 8.2. Erreurs personnalisées ---");

// Classe d'erreur personnalisée
// class CarValidationError ... 
class CarValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = "CarValidationError"
    }
}
function validateCar(car) {
    if (!car.id) throw new CarValidationError("La propriété 'id' est manquante.");
    if (!car.model) throw new CarValidationError("La propriété 'model' est manquante.");
    if (!car.owner) throw new CarValidationError("La propriété 'owner' est manquante.");
}

// Tests
const incompleteCar = { id: 1, model: { name: "Clio" } }; // manque owner
const completeCar = { id: 1, model: { name: "Clio" }, owner: { firstName: "Jean" } };

try {
    validateCar(incompleteCar);
    console.log("Voiture incomplète validée (ne devrait pas s'afficher)");
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

try {
    validateCar(completeCar);
    console.log("Voiture complète validée avec succès !");
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}

// ============================================================================
// 8.3. Finally et nettoyage de ressources
// ============================================================================
// Énoncé : Créez une fonction loadCarsFromFile(filename) qui :
// - Ouvre et lit un fichier JSON de voitures
// - Parse les données
// - Gère les erreurs potentielles (fichier inexistant, JSON invalide)
// - Utilise finally pour afficher un message "Opération de lecture terminée" 
//   dans tous les cas

console.log("\n--- 8.3. Finally et nettoyage de ressources ---");

function loadCarsFromFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        const parsedData = JSON.parse(data);
        console.log(`Données chargées depuis ${filename} :`, parsedData.length, "voitures.");
        return parsedData;
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`Erreur : Le fichier '${filename}' n'existe pas.`);
        } else if (error instanceof SyntaxError) {
            console.error(`Erreur : Le contenu du fichier '${filename}' n'est pas un JSON valide.`);
        } else {
            console.error(`Une erreur inattendue est survenue lors de la lecture de '${filename}' :`, error.message);
        }
        return null;
    } finally {
        console.log("Opération de lecture terminée.");
    }
}

// Tests
loadCarsFromFile('voitures.json'); // Fichier existant
loadCarsFromFile('fichier_inexistant.json'); // Fichier inexistant

// ============================================================================
// 8.4. Propagation d'erreurs
// ============================================================================
// Énoncé : Créez une fonction calculateAverageSpeed(cars) qui :
// - Vérifie que le paramètre est bien un tableau (sinon lance une TypeError)
// - Calcule la vitesse moyenne des voitures
// - Si une voiture n'a pas de topSpeed défini, lance une erreur personnalisée 
//   MissingDataError
//
// Ensuite, créez une fonction safeCalculateAverageSpeed(cars) qui appelle 
// calculateAverageSpeed et gère toutes les erreurs possibles en retournant 
// un objet { success: boolean, result?: number, error?: string }.

console.log("\n--- 8.4. Propagation d'erreurs ---");

// Classe d'erreur pour données manquantes
class MissingDataError extends Error {
    constructor(message) {
        super(message);
        this.name = "MissingDataError";
    }
}

function calculateAverageSpeed(cars) {
    if (!Array.isArray(cars)) {
        throw new TypeError("Le paramètre doit être un tableau.");
    }
    if (cars.length === 0) return 0;

    const totalSpeed = cars.reduce((sum, car) => {
        // En fonction de la structure utilisée dans le reste du TP (objet Car ou objet JSON brut)
        // Ici on semble utiliser les instances de Car créées en section 3
        const speed = car.model ? car.model.topSpeed : car.topSpeed;
        if (speed === undefined || speed === null) {
            throw new MissingDataError(`Vitesse de pointe (topSpeed) manquante pour la voiture ID: ${car.id}`);
        }
        return sum + speed;
    }, 0);

    return totalSpeed / cars.length;
}

function safeCalculateAverageSpeed(cars) {
    try {
        const avg = calculateAverageSpeed(cars);
        return { success: true, result: avg };
    } catch (error) {
        return { success: false, error: `${error.name}: ${error.message}` };
    }
}

// Exemple de tests
console.log("Calcul avec données valides :", safeCalculateAverageSpeed(cars));
console.log("Calcul avec paramètre invalide :", safeCalculateAverageSpeed("pas un tableau"));
console.log("Calcul avec tableau vide :", safeCalculateAverageSpeed([]));

const carsWithMissingData = [
    cars[0],
    { id: 999, model: {}, owner: {} } // Voiture sans topSpeed
];
console.log("Calcul avec données manquantes :", safeCalculateAverageSpeed(carsWithMissingData));

// ============================================================================
// 8.6. Chaînage d'erreurs et contexte (bonus difficile)
// ============================================================================
// Énoncé : Créez une fonction processCarBatch(carDataArray) qui :
// - Prend un tableau de données brutes de voitures
// - Pour chaque voiture, tente de la valider puis de la transformer en instance de Car
// - Collecte toutes les erreurs rencontrées sans interrompre le traitement
// - Retourne un objet contenant les voitures réussies et les erreurs avec 
//   leur contexte (index, données originales, message d'erreur)

console.log("\n--- 8.6. Chaînage d'erreurs et contexte ---");

function processCarBatch(carDataArray) {
    const successful = [];
    const failed = [];

    carDataArray.forEach((data, index) => {
        try {
            // 1. Validation de base (est-ce un objet ?)
            if (typeof data !== 'object' || data === null) {
                throw new Error("Les données fournies ne sont pas un objet valide.");
            }

            // 2. Transformation pour correspondre à ce que validateCar attend
            // On adapte les noms de propriétés (français -> anglais) si nécessaire
            const carToValidate = {
                id: data.id,
                model: data.modele || data.model,
                owner: data.proprietaire || data.owner
            };

            // 3. Validation approfondie
            validateCar(carToValidate);

            // 4. Création de l'instance Car
            // On utilise les valeurs extraites ou des valeurs par défaut
            const carInstance = new Car(
                carToValidate.id,
                carToValidate.model.nom || carToValidate.model.name,
                carToValidate.owner.prenom || carToValidate.owner.firstName,
                carToValidate.owner.nom || carToValidate.owner.lastName,
                carToValidate.owner.age || 0,
                carToValidate.model.vitesse_de_pointe_kmH || carToValidate.model.topSpeed || 0,
                carToValidate.model.marque || carToValidate.model.brand || "",
                carToValidate.model.id_modele || carToValidate.model.modeleId,
                carToValidate.model.numero_serie || carToValidate.model.serialNumber
            );

            successful.push(carInstance);
        } catch (error) {
            failed.push({
                index: index,
                data: data,
                error: `${error.name}: ${error.message}`
            });
        }
    });

    return { successful, failed };
}

// Données de test avec plusieurs cas d'erreur
const batchData = [
    // Voiture valide
    {
        id: 1,
        modele: { nom: "Clio", vitesse_de_pointe_kmH: 180 },
        proprietaire: { prenom: "Jean", nom: "Dupont", age: 30 }
    },
    // Voiture sans ID
    {
        modele: { nom: "Alpine" },
        proprietaire: { prenom: "Marie", nom: "Martin" }
    },
    // Voiture sans modèle
    {
        id: 3,
        proprietaire: { prenom: "Pierre", nom: "Durand" }
    },
    // Données invalides (non-objet)
    "données invalides",
    // Voiture valide
    {
        id: 5,
        modele: { nom: "Ferrari", vitesse_de_pointe_kmH: 340 },
        proprietaire: { prenom: "Luc", nom: "Bernard", age: 45 }
    },
    // Voiture sans propriétaire
    {
        id: 6,
        modele: { nom: "Porsche", vitesse_de_pointe_kmH: 310 }
    }
];

// Exemple de tests
const result = processCarBatch(batchData);

console.log(`\n✅ Voitures traitées avec succès : ${result.successful.length}`);
result.successful.forEach((car, i) => {
    console.log(`  ${i + 1}. ${car.model.name} (ID: ${car.id})`);
});

console.log(`\n❌ Voitures en erreur : ${result.failed.length}`);
result.failed.forEach((failure) => {
    console.log(`  Index ${failure.index}: ${failure.error}`);
    console.log(`    Données : ${JSON.stringify(failure.data)}`);
});
