export const OBJECTIVES = [
    {
        id: 1,
        name: "Sédentaire",
        min: 0.8,
        max: 1.0
    },
    {
        id: 2,
        name: "Endurance",
        min: 1.2,
        max: 1.6
    },
    {
        id: 3,
        name: "Conservation de la masse musculaire",
        min: 1.6,
        max: 1.8
    },
    {
        id: 4,
        name: "Prise de masse musculaire",
        min: 1.8,
        max: 2.2
    }
]

// ---- Types partagés ----

// Représente une ligne du tableau : un poids + les valeurs protéiques par objectif
export interface TableRow {
    weight: number
    // Clé = id de l'objectif, valeur = plage protéique formatée (ex : "112.0 – 126.0 g/jour")
    proteinValues: Record<number, string>
}

// ---- Fonctions de génération des données ----

// Génère les poids de minWeight à maxWeight avec nbLines pas
export function generateWeights(minW: number, maxW: number, nbL: number): number[] {
    const weights: number[] = []
    const step = (maxW - minW) / (nbL - 1) // nbL - 1 intervalles pour nbL points
    for (let i = 0; i < nbL; i++) {
        weights.push(Number((minW + i * step).toFixed(1)))
    }
    return weights
}

// Génère une valeur sous forme de plage (exemple : "112.0 – 126.0 g/jour")
export function generateProteinRange(weight: number, objectiveId: number): string {
    const objectiveData = OBJECTIVES.find((obj) => obj.id === objectiveId)
    if (!objectiveData) return ""
    const min = weight * objectiveData.min
    const max = weight * objectiveData.max
    return `${min.toFixed(1)} – ${max.toFixed(1)} g/jour`
}

// Génère toutes les données du tableau à partir des paramètres du formulaire.
// Retourne { rows, headers, selectedObjectives } — pour centraliser la source de données.
export function generateTableData(
    objectiveIds: number[],
    minWeight: number,
    maxWeight: number,
    nbLines: number
) {
    const selectedObjectives = OBJECTIVES.filter((obj) => objectiveIds.includes(obj.id))
    const weights = generateWeights(minWeight, maxWeight, nbLines)

    const rows: TableRow[] = weights.map((weight) => {
        const proteinValues: Record<number, string> = {}
        for (const obj of selectedObjectives) {
            proteinValues[obj.id] = generateProteinRange(weight, obj.id)
        }
        return { weight, proteinValues }
    })

    const headers = ["Poids (kg)", ...selectedObjectives.map((obj) => obj.name)]

    return { rows, headers, selectedObjectives }
}