import type { TableRow } from "../../data/data"
import EmptyObjectivesHeader from "../util/empty/EmptyObjectivesHeader"
import "./Table.css"

interface TableProps {
    rows: TableRow[]
    headers: string[]
    // Les objectifs filtrés (id + name) pour itérer les colonnes dans le bon ordre
    selectedObjectives: { id: number; name: string }[]
}

const Table = ({ rows, headers, selectedObjectives }: TableProps) => {
    const objectivesCount = selectedObjectives.length

    return (
        <div className="table-wrapper">
            {/* ---- Meta header ---- */}
            <div className="table-meta">
                <p className="table-meta-title">Tableau des besoins protéiques</p>
                <span className="table-badge">
                    {rows.length} lignes · {objectivesCount} objectif{objectivesCount > 1 ? "s" : ""}
                </span>
            </div>

            {/* ---- Table ---- */}
            <table className="protein-table">
                <thead>
                    <tr>
                        {objectivesCount === 0
                            ? <><th>Poids (kg)</th><EmptyObjectivesHeader /></>
                            : headers.map((header) => (
                                <th key={header} className="protein-th">
                                    {header}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => ( // pour chaque ligne de données, on crée une <tr>
                        <tr
                            key={row.weight}
                            style={{ "--row-index": rowIndex } as React.CSSProperties}
                        >
                            <td className="weight-td">{row.weight} kg</td>
                            {selectedObjectives.map((obj) => ( // pour chaque objectif, on affiche la valeur pré-calculée
                                <td key={obj.id} className="protein-td">
                                    {row.proteinValues[obj.id]}
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