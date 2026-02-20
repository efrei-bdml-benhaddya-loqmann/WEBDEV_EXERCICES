import { OBJECTIVES } from "../../data/data"
import EmptyObjectivesHeader from "../util/empty/EmptyObjectivesHeader"
import "./Table.css"

interface TableProps {
    objectives: number[]
    minWeight: number
    maxWeight: number
    nbLines: number
}

const Table = (props: TableProps) => {
    const { objectives, minWeight, maxWeight, nbLines } = props;

    // Génère les poids de minWeight à maxWeight avec nbLines pas
    function generateWeights(minW: number, maxW: number, nbL: number) {
        const weights: number[] = []
        const step = (maxW - minW) / (nbL - 1) // nbL - 1 pour créer nbL intervalles, ex: 100 - 50 / 6 - 1 = 10 (pas de 10)
        for (let i = 0; i < nbL; i++) {
            weights.push(Number((minW + i * step).toFixed(1)))
        }
        return weights
    }

    // Génère une valeur sous forme de plage (exemple : 112 – 126 g/jour)
    function generateProteinRange(weight: number, objective: number) {
        const objectiveData = OBJECTIVES.find((obj) => obj.id === objective)
        if (!objectiveData) return ""
        const min = weight * objectiveData.min
        const max = weight * objectiveData.max
        return `${min.toFixed(1)} – ${max.toFixed(1)} g/jour`
    }

    const weights = generateWeights(minWeight, maxWeight, nbLines)
    const objectivesCount = objectives.length

    return (
        <div className="table-wrapper">
            {/* ---- Meta header ---- */}
            <div className="table-meta">
                <p className="table-meta-title">Tableau des besoins protéiques</p>
                <span className="table-badge">
                    {weights.length} lignes · {objectivesCount} objectif{objectivesCount > 1 ? "s" : ""}
                </span>
            </div>

            {/* ---- Table ---- */}
            <table className="protein-table">
                <thead>
                    <tr>
                        <th className="weight-th">Poids (kg)</th>
                        {objectivesCount === 0
                            ? <EmptyObjectivesHeader />
                            : objectives.map((objective) => (
                                <th key={objective} className="protein-th">
                                    {OBJECTIVES.find((obj) => obj.id === objective)?.name}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {weights.map((weight, rowIndex) => ( // pour chaque poids, on crée une ligne
                        <tr
                            key={weight}
                            style={{ "--row-index": rowIndex } as React.CSSProperties}
                        >
                            <td className="weight-td">{weight} kg</td>
                            {objectives.map((objective) => ( // pour chaque objectif, on crée une cellule avec la plage de protéines
                                <td key={objective} className="protein-td">
                                    {generateProteinRange(weight, objective)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table