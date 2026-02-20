import './App.css'
import Form from './components/form/Form'
import Table from './components/table/Table'
import { useState } from 'react'

function App() {
  const [objectives, setObjectives] = useState<number[]>([])
  const [minWeight, setMinWeight] = useState<number>(0)
  const [maxWeight, setMaxWeight] = useState<number>(0)
  const [nbLines, setNbLines] = useState<number>(0)

  const [showTable, setShowTable] = useState<boolean>(false)

  // Est appelé par le formulaire quand on clique sur "Générer"
  // Met à jour les données et affiche le tableau
  const handleGenerate = (
    selectedObjectives: number[],
    minW: number,
    maxW: number,
    lines: number
  ) => {
    setObjectives(selectedObjectives)
    setMinWeight(minW)
    setMaxWeight(maxW)
    setNbLines(lines)
    setShowTable(true)
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <div className="app-logo-badge">Calculateur de protéines</div>
        <h1>Besoins protéiques quotidiens</h1>
        <p className="app-subtitle">
          Renseignez votre plage de poids et vos objectifs pour générer votre tableau personnalisé.
        </p>
      </header>

      {/* affiché/masqué afin de préserver les données */}
      <div className={showTable ? "view-hidden" : "view-enter"}>
        <Form onGenerate={handleGenerate} />
      </div>

      {/* toujours monté, caché jusqu'à la génération */}
      <div className={showTable ? "view-enter" : "view-hidden"}>
        <button className="btn-back" onClick={() => setShowTable(false)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retour au formulaire
        </button>

        <Table
          objectives={objectives}
          minWeight={minWeight}
          maxWeight={maxWeight}
          nbLines={nbLines}
        />
      </div>
    </div>
  )
}

export default App
