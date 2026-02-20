import './App.css'
import Form from './components/form/Form'
import Table from './components/table/Table'
import { useState } from 'react'

function App() {
  const [objectives, setObjectives] = useState<number[]>([])
  const [minWeight, setMinWeight] = useState<number>(0)
  const [maxWeight, setMaxWeight] = useState<number>(0)
  const [nbLines, setNbLines] = useState<number>(0)

  return (
    <>
      <Form setObjectives={setObjectives} setMinWeight={setMinWeight} setMaxWeight={setMaxWeight} setNbLines={setNbLines} />
      {/* divider */}
      <div className="divider"></div>
      <Table objectives={objectives} minWeight={minWeight} maxWeight={maxWeight} nbLines={nbLines} />
    </>
  )
}

export default App
