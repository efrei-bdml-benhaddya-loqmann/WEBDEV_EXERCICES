import { useState, type SubmitEvent } from "react"
import { OBJECTIVES } from "../../data/data"
import FormItem from "./FormItem"

interface FormProps {
    setObjectives: (objectives: number[]) => void
    setMinWeight: (minWeight: number) => void
    setMaxWeight: (maxWeight: number) => void
    setNbLines: (nbLines: number) => void
}

const Form = (props: FormProps) => {
    const { setObjectives, setMinWeight, setMaxWeight, setNbLines } = props

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const selectedObjectives = formData.getAll("objectives").map(val => Number(val))
        const minW = Number(formData.get("minWeight"))
        const maxW = Number(formData.get("maxWeight"))
        const lines = Number(formData.get("nbLines"))

        setObjectives(selectedObjectives)
        setMinWeight(minW)
        setMaxWeight(maxW)
        setNbLines(lines)

        // console.log({
        //     objectives: selectedObjectives,
        //     minWeight: minW,
        //     maxWeight: maxW,
        //     nbLines: lines
        // })
    }

    return (
        <form action="sendData" onSubmit={handleSubmit} method="POST">
            <label>Objectifs</label>
            {OBJECTIVES.map((objective) => (
                <FormItem key={objective.id} name={objective.name} id={objective.id}>
                    <input
                        type="checkbox"
                        value={objective.id}
                        name="objectives"
                        id={objective.id.toString()}
                    />
                </FormItem>
            ))}
            <FormItem name="minWeight" id={1001}>
                <input type="number" name="minWeight" id="1001" />
            </FormItem>
            <FormItem name="maxWeight" id={1002}>
                <input type="number" name="maxWeight" id="1002" />
            </FormItem>
            <FormItem name="nbLines" id={1003}>
                <input type="number" name="nbLines" id="1003" />
            </FormItem>
            <button type="submit">Générer</button>
        </form>
    )
}

export default Form