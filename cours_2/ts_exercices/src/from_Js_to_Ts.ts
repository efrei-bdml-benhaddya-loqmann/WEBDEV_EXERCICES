// ============================================================================
// TP TYPESCRIPT - DE JAVASCRIPT À TYPESCRIPT
// ============================================================================

/*
PRÉREQUIS : Installation de TypeScript
--------------------------------------
1. Installer Node.js (si ce n'est pas déjà fait)
2. Installer TypeScript globalement :
   npm install -g typescript

3. Vérifier l'installation :
   tsc --version
   Si cela ne fonctionne pas, vérifier bien que vous avez le dossier .npm-global dans votre path : 
   echo $PATH | grep npm-global
   Si ce n'est pas le cas ajouter le avec cette commande : export PATH=~/.npm-global/bin:$PATH 
   Vous pouvez ajouter cette commande à la fin de votre .bashrc pour ne plus avoir à la taper à chaque fois. 

4. Dans votre dossier de projet, initialiser npm :
   npm init -y

5. Installer TypeScript localement (recommandé) :
   npm install --save-dev typescript
   Installer ts-node (ts-node est un exécutable TypeScript qui permet 
   d'exécuter directement des fichiers .ts dans Node.js sans compilation 
   préalable en JavaScript.): 
   npm install --save-dev ts-node 

6. Installer les types pour Node.js :
   npm install --save-dev @types/node
*/

// ============================================================================
// 1. CONFIGURATION DE TYPESCRIPT
// ============================================================================

/*
EXERCICE 1.1 : Créer un fichier tsconfig.json
----------------------------------------------
Dans votre terminal, exécutez :
  tsc --init

Cela créera un fichier tsconfig.json avec de nombreuses options.
Voici une configuration minimale recommandée pour débuter :

EXERCICE 1.2 : Structure du projet
-----------------------------------
Créez la structure suivante :
  projet/
  ├── src/
  │   ├── index.ts           (fichier principal)
  │   ├── Car.ts             (classe Car)
  │   └── voitures.json      (données)
  ├── dist/                  (généré par compilation)
  ├── package.json
  └── tsconfig.json

EXERCICE 1.3 : Compiler et exécuter
------------------------------------
Pour compiler un fichier TypeScript :
  tsc src/index.ts

Pour compiler tout le projet :
  tsc

Pour compiler en mode watch (recompile automatiquement) :
  tsc --watch

Pour exécuter le fichier compilé :
  node dist/index.js

Ou utiliser ts-node pour exécuter directement sans compilation préalable (installer avec: npm install --save-dev ts-node) :
  npx ts-node src/index.ts

Sinon pour compiler et exécuter un fichier en une ligne: 
tsc nomFichier.ts && node nomFichier.js

EXERCICE 1.4 : Scripts npm
---------------------------
Ajoutez ces scripts dans votre package.json :

"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "ts-node src/index.ts",
  "watch": "tsc --watch"
}

Puis vous pouvez exécuter :
  npm run build    // Compile le projet
  npm run start    // Exécute le JS compilé
  npm run dev      // Exécute directement le TS avec ts-node
  npm run watch    // Compile en mode watch
*/

// ============================================================================
// 2. TYPES DE BASE EN TYPESCRIPT
// ============================================================================

console.log("=== TP TYPESCRIPT - EXERCICES ===\n");
console.log("--- 2. Types de base ---\n");

// 2.1. Types primitifs
// Énoncé : Déclarez des variables avec différents types primitifs

// Types explicites
const name: string = "Jean";
const age: number = 30;
const isStudent: boolean = true;
const nothing: null = null; // variable déclarée, valeur instanciée mais avec "rien"
const notDefined: undefined = undefined; // variable déclarée mais non initialisée

console.log(`Nom (string): ${name}`);
console.log(`Âge (number): ${age}`);
console.log(`Est étudiant (boolean): ${isStudent}`);

// TypeScript infère automatiquement les types
const inferredName = "Marie"; // TypeScript comprend que c'est un string
const inferredAge = 25; // TypeScript comprend que c'est un number

// 2.2. Tableaux et tuples
// Énoncé : Créez des tableaux typés et des tuples

const numbers: number[] = [1, 2, 3, 4, 5];
const names: Array<string> = ["Alice", "Bob", "Charlie"]; // Syntaxe alternative

// Tuple : tableau avec un nombre fixe d'éléments de types spécifiques
const person: [string, number] = ["Alice", 30];
const coordinates: [number, number, number] = [10.5, 20.3, 5.8];
// Tableau de taille variable utilisant l'objet Array
const fiboSequence: Array<number> = [0,1,1,2,3,5]

console.log(`\nTableau de nombres: ${numbers}`);
console.log(`Tuple personne: ${person}`);
console.log(`Suite de fibonacci: ${fiboSequence}`)

// 2.3. Union types et literal types
// Énoncé : Utilisez les types union pour permettre plusieurs types possibles

let id: string | number; // Peut être string OU number
id = "ABC123";
id = 123;

type Status = "pending" | "approved" | "rejected"; // Literal types
const orderStatus: Status = "pending";
// const invalidStatus: Status = "cancelled"; // ❌ Erreur : type invalide

console.log(`\nID (union type): ${id}`);
console.log(`Status (literal type): ${orderStatus}`);

// ============================================================================
// 3. INTERFACES ET TYPES
// ============================================================================

console.log("\n--- 3. Interfaces et Types ---\n");

// 3.1. Interface basique
// Énoncé : Créez une interface pour représenter une personne

interface Person {
    firstName: string;
    lastName: string;
    age: number;
    email?: string; // Propriété optionnelle (remarquez le ?)
}

const user: Person = {
    firstName: "Jean",
    lastName: "Dupont",
    age: 30
    // email est optionnel, on peut l'omettre
};

console.log("Utilisateur:", user);

// Tableaux de Person 

const user2: Person = {
    firstName: "Pedro",
    lastName: "Rojo",
    age: 30
};

const persons: Person[] = [user, user2]
const personsArray: Array<Person> = [user, user2]

console.log(`2 manières de typer un tableau d'objet : `)
console.log(persons)
console.log(personsArray)

// 3.2. Type alias
// Énoncé : Créez un type alias et comparez avec une interface

type Point = {
    x: number;
    y: number;
};

const origin: Point = { x: 0, y: 0 };

// Différences interface vs type :
// - Interface peut être étendue/fusionnée, type non
// - Type peut utiliser des unions, interface non directement
// - Convention : interface pour objets, type pour le reste

// 3.3. Interface avec méthodes
// Énoncé : Ajoutez des méthodes à une interface

interface Calculator {
    add(a: number, b: number): number;
    subtract(a: number, b: number): number;
}

const calculator: Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};

console.log(`\nCalcul: 5 + 3 = ${calculator.add(5, 3)}`);

// ============================================================================
// 4. CLASSES TYPESCRIPT (REPRISE DE L'EXERCICE CAR)
// ============================================================================

console.log("\n--- 4. Classes TypeScript ---\n");

// 4.1. Interface pour les structures de données
// Énoncé : Créez des interfaces pour typer les données du JSON

interface Owner {
    firstName: string;
    lastName: string;
    age: number;
}

interface Model {
    name: string;
    topSpeed: number;
}

interface CarData {
    id: number;
    modele: {
        nom: string;
        vitesse_de_pointe_kmH: number;
    };
    proprietaire: {
        prenom: string;
        nom: string;
        age: number;
    };
}

// 4.2. Classe Car avec types
// Énoncé : Recréez la classe Car avec TypeScript en utilisant les modificateurs d'accès

class Car {
    // Propriétés privées (non accessibles depuis l'extérieur)
    private _id: number;
    
    // Propriétés publiques
    public model: Model;
    public owner: Owner;

    // Constructeur avec paramètres typés et valeurs par défaut
    constructor(
        id: number,
        modelName: string,
        ownerFirstName: string,
        ownerLastName: string,
        age: number = 0,
        topSpeed: number = 0
    ) {
        this._id = id;
        this.model = {
            name: modelName,
            topSpeed: topSpeed
        };
        this.owner = {
            firstName: ownerFirstName,
            lastName: ownerLastName,
            age: age
        };
    }

    // Getter pour accéder à l'id (propriété privée)
    get id(): number {
        return this._id;
    }

    // Setter pour modifier l'id avec validation
    set id(newId: number) {
        if (newId > 0) {
            this._id = newId;
        } else {
            throw new Error("L'ID doit être positif");
        }
    }

    // Méthode publique
    public printEssentialCarInfos(): void {
        console.log(`Voiture #${this.id}: ${this.model.name} - Propriétaire: ${this.owner.firstName} ${this.owner.lastName}`);
    }

    // Méthode statique
    static sayHello(): void {
        console.log("Classe Car : Gestion des voitures");
    }
}

// Test de la classe
const clio = new Car(101, "Clio", "Pedro", "Mucho", 35, 180);
clio.printEssentialCarInfos();
Car.sayHello();

// ============================================================================
// 5. LECTURE DE FICHIERS JSON AVEC TYPES
// ============================================================================

console.log("\n--- 5. Lecture de fichiers JSON avec types ---\n");

import * as fs from 'fs';

// 5.1. Fonction typée pour lire le fichier
// Énoncé : Créez une fonction qui lit et parse le JSON avec typage

function loadCarsData(filename: string): CarData[] {
    try {
        const rawData: string = fs.readFileSync(filename, 'utf-8');
        const data: CarData[] = JSON.parse(rawData);
        return data;
    } catch (error) {
        console.error(`Erreur lors de la lecture du fichier: ${error}`);
        return [];
    }
}

// Note : En production, utilisez plutôt :
// import voituresData from './voitures.json' assert { type: 'json' };

const carsData = loadCarsData('./voitures.json')
console.log(`Cars data : `)
carsData.forEach(cardata => console.log(cardata))

// ============================================================================
// 6. FONCTIONS TYPÉES ET GÉNÉRIQUES
// ============================================================================

console.log("\n--- 6. Fonctions typées ---\n");

// 6.1. Fonctions avec types de paramètres et retour
// Énoncé : Typez les fonctions de transformation

function formatString(str: string, formatter: (s: string) => string): string {
    return formatter(str);
}

const toUpperCase = (s: string): string => s.toUpperCase();
const toLowerCase = (s: string): string => s.toLowerCase();

console.log("Formatage:", formatString("Hello", toUpperCase));

// 6.2. Fonctions génériques
// Énoncé : Créez une fonction générique pour filtrer un tableau
// Un prédicat est une fonction qui prend un ou plusieurs arguments et retourne 
// toujours un booléen, utilisée comme condition dans les fonctions d'ordre supérieur.

function filterArray<T>(array: T[], predicate: (item: T) => boolean): T[] {
    return array.filter(predicate);
}

const numbersArray = [1, 2, 3, 4, 5, 6];
const evenNumbers = filterArray(numbersArray, (n) => n % 2 === 0); // infère que T est de type number
const evenNumbersExplicitlyTyped = filterArray<number>(numbersArray, (n) => n % 2 === 0); // on peut explicitement indiquer que le tableau devra être de type number

console.log("Nombres pairs:", evenNumbers);

// 6.3. Type guards
// Énoncé : Créez des fonctions de vérification de type

function isString(value: unknown): value is string {
    return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
    return typeof value === 'number';
}

function processValue(value: string | number): void {
    if (isString(value)) {
        console.log(`String en majuscules: ${value.toUpperCase()}`);
    } else if (isNumber(value)) {
        console.log(`Number au carré: ${value * value}`);
    }
}

console.log("\nType guards:");
processValue("hello");
processValue(5);

// ============================================================================
// 7. TYPES AVANCÉS
// ============================================================================

console.log("\n--- 7. Types avancés ---\n");

// 7.1. Utility Types
// Énoncé : Utilisez les utility types de TypeScript

// Partial : Rend toutes les propriétés optionnelles
type PartialCar = Partial<Car>;

// Required : Rend toutes les propriétés obligatoires
type RequiredOwner = Required<Owner>;

// Pick : Sélectionne certaines propriétés
type CarSummary = Pick<CarData, 'id' | 'modele'>;

// Omit : Exclut certaines propriétés
type CarWithoutId = Omit<CarData, 'id'>;

// Record : Crée un type objet avec des clés et valeurs typées
type CarRegistry = Record<number, Car>;

const registry: CarRegistry = {
    101: clio,
    102: new Car(102, "Alpine", "Marie", "Martin")
};

console.log("Registry contient", Object.keys(registry).length, "voitures");

// 7.2. Mapped Types
// Énoncé : Créez un type qui rend toutes les propriétés readonly

type ReadonlyCar = {
    readonly [K in keyof Car]: Car[K]; // K parcourt "brand" | "model" | "year"
};
// Résultat équivalent à :
// type ReadonlyCar = {
//   readonly brand: string;
//   readonly model: string;
//   readonly year: number;
// };
// ou type ReadonlyCar = Readonly<Car>;  // Identique au code original

// 7.3. Conditional Types
// Énoncé : Créez un type conditionnel

type IsArray<T> = T extends Array<any> ? true : false;

type Test1 = IsArray<string[]>;  // true
type Test2 = IsArray<number>;    // false

// ============================================================================
// 8. GESTION D'ERREURS TYPÉE
// ============================================================================

console.log("\n--- 8. Gestion d'erreurs typée ---\n");

// 8.1. Classes d'erreurs personnalisées
// Énoncé : Créez des classes d'erreurs typées

class CarValidationError extends Error {
    constructor(
        message: string,
        public field?: string,
        public value?: any
    ) {
        super(message);
        this.name = "CarValidationError";
    }
}

class MissingDataError extends Error {
    constructor(
        message: string,
        public index: number
    ) {
        super(message);
        this.name = "MissingDataError";
    }
}

// 8.2. Type pour les résultats d'opérations
// Énoncé : Créez un type Result pour encapsuler succès ou erreur

type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

function safeCalculateAverageSpeed(cars: Car[]): Result<number, string> {
    try {
        if (!Array.isArray(cars)) {
            return { 
                success: false, 
                error: "Le paramètre doit être un tableau" 
            };
        }
        
        if (cars.length === 0) {
            return { 
                success: false, 
                error: "Le tableau ne peut pas être vide" 
            };
        }
        
        const totalSpeed = cars.reduce((acc, car) => {
            return acc + car.model.topSpeed;
        }, 0);
        
        return { 
            success: true, 
            data: totalSpeed / cars.length 
        };
    } catch (error) {
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Erreur inconnue" 
        };
    }
}

function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
    return result.success === true;
}

const result = safeCalculateAverageSpeed([clio]);
if (isSuccess(result)) {
    console.log(`Vitesse moyenne: ${result.data} km/h`);
} else {
    console.error(`Erreur: ${result.error}`);
}

// ============================================================================
// 9. ASYNC/AWAIT TYPÉ
// ============================================================================

console.log("\n--- 9. Async/Await typé ---\n");

// 9.1. Promises typées
// Énoncé : Créez des fonctions asynchrones avec types

async function fetchCarDataFromAPI(carId: number): Promise<Car | null> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (carId === 101) {
                resolve(clio);
            } else {
                reject(new Error(`Voiture ${carId} non trouvée`));
            }
        }, 1000);
    });
}

async function getCarSafely(carId: number): Promise<Car | null> {
    try {
        const car = await fetchCarDataFromAPI(carId);
        console.log(`Voiture récupérée: ${car?.model.name}`);
        return car;
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Erreur: ${error.message}`);
        }
        return null;
    }
}

// Test (décommenter pour exécuter)
// getCarSafely(101);

// ============================================================================
// 10. DÉCORATEURS (BONUS AVANCÉ)
// ============================================================================

console.log("\n--- 10. Décorateurs (optionnel) ---\n");

/*
Pour utiliser les décorateurs, activez dans tsconfig.json :
"experimentalDecorators": true,
"emitDecoratorMetadata": true

Les décorateurs sont des fonctions qui modifient le comportement des classes,
méthodes, propriétés ou paramètres.

Note: Les décorateurs sont une fonctionnalité expérimentale qui nécessite 
une configuration spéciale. Si vous obtenez des erreurs, vous pouvez soit :
1. Activer experimentalDecorators dans tsconfig.json
2. Commenter cette section et l'ignorer pour l'instant
*/

// Décorateur de méthode pour logger les appels
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(this: any, ...args: any[]): any {
        console.log(`Appel de ${propertyKey} avec arguments:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Résultat de ${propertyKey}:`, result);
        return result;
    };
    
    return descriptor;
}

// IMPORTANT : Décommentez cette classe UNIQUEMENT si vous avez activé 
// "experimentalDecorators": true dans votre tsconfig.json
/*
class CalculatorWithDecorator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new CalculatorWithDecorator();
calc.add(5, 3); // Affichera les logs automatiquement
*/

// Version alternative SANS décorateurs (fonctionne sans configuration spéciale)
console.log("\nAlternative sans décorateurs (Pattern Proxy) :");

class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
    
    subtract(a: number, b: number): number {
        return a - b;
    }
}

// Fonction wrapper qui ajoute du logging
function createLoggedCalculator(): Calculator {
    const calculator = new Calculator();
    
    return new Proxy(calculator, {
        get(target, prop) {
            const originalValue = (target as any)[prop];
            
            if (typeof originalValue === 'function') {
                return function(...args: any[]) {
                    console.log(`Appel de ${String(prop)} avec arguments:`, args);
                    const result = originalValue.apply(target, args);
                    console.log(`Résultat de ${String(prop)}:`, result);
                    return result;
                };
            }
            
            return originalValue;
        }
    });
}

const loggedCalc = createLoggedCalculator();
console.log("Test avec Proxy:");
loggedCalc.add(5, 3);
loggedCalc.subtract(10, 4);

// ============================================================================
// RÉSUMÉ DES CONCEPTS TYPESCRIPT
// ============================================================================

console.log("\n=== RÉSUMÉ DES CONCEPTS TYPESCRIPT ===");
console.log("✓ Configuration TypeScript (tsconfig.json)");
console.log("✓ Types primitifs et inférence de types");
console.log("✓ Interfaces et types alias");
console.log("✓ Classes avec modificateurs d'accès (public, private, protected)");
console.log("✓ Getters et setters");
console.log("✓ Fonctions typées et génériques");
console.log("✓ Types avancés (Union, Literal, Utility Types)");
console.log("✓ Type guards et narrowing");
console.log("✓ Gestion d'erreurs typée");
console.log("✓ Promises et async/await typés");
console.log("✓ Décorateurs (optionnel)");