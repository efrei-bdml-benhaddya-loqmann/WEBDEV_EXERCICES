import type { TableRow } from "../../../data/data"

interface ExportButtonProps {
    rows: TableRow[]
    headers: string[]
    selectedObjectives: { id: number; name: string }[]
}

const ExportButton = ({ rows, headers, selectedObjectives }: ExportButtonProps) => {

    // Convertit les données en CSV et déclenche le téléchargement
    function handleExport() {
        // Entête CSV
        const csvLines: string[] = [headers.join(",")]

        // Une ligne par poids
        for (const row of rows) {
            const cells = [
                `${row.weight} kg`,
                ...selectedObjectives.map((obj) => row.proteinValues[obj.id] ?? "")
            ]
            // On entoure chaque cellule de guillemets pour gérer les virgules / tirets
            csvLines.push(cells.map((c) => `"${c}"`).join(","))
        }

        const csvContent = csvLines.join("\n")
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)

        // Crée un lien invisible, clique dessus, puis le supprime
        const link = document.createElement("a")
        link.href = url
        link.download = "besoins_proteiques.csv"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    return (
        <button className="btn-outline" onClick={handleExport} disabled={rows.length === 0}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Exporter CSV
        </button>
    )
}

export default ExportButton