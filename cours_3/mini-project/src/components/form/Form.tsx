import { useState, type SubmitEvent } from "react"
import { OBJECTIVES } from "../../data/data"
import FormItem from "./FormItem"
import FieldValidationError from "../util/error/FieldValidationError"

interface FormProps {
    setObjectives: (objectives: number[]) => void
    setMinWeight: (minWeight: number) => void
    setMaxWeight: (maxWeight: number) => void
    setNbLines: (nbLines: number) => void
}

const Form = (props: FormProps) => {
    const { setObjectives, setMinWeight, setMaxWeight, setNbLines } = props

    const [isFormErrorVisible, setIsFormErrorVisible] = useState<boolean>(false)
    const [formErrorMessage, setFormErrorMessage] = useState<string>("")

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)
        const selectedObjectives = formData.getAll("objectives").map(val => Number(val))
        const minW = Number(formData.get("minWeight"))
        const maxW = Number(formData.get("maxWeight"))
        const lines = Number(formData.get("nbLines"))

        if (minW > maxW) {
            form.reportValidity()
            setFormErrorMessage("Le poids minimum doit être inférieur au poids maximum")
            setIsFormErrorVisible(true)
            return
        }

        if (lines > (maxW - minW)) {
            form.reportValidity()
            setFormErrorMessage("Le nombre de lignes doit être inférieur ou égal à la différence entre le poids maximum et le poids minimum")
            setIsFormErrorVisible(true)
            return
        }

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
                <input type="number" name="minWeight" id="1001" min={0} />
            </FormItem>
            <FormItem name="maxWeight" id={1002}>
                <input type="number" name="maxWeight" id="1002" min={0} />
            </FormItem>
            <FormItem name="nbLines" id={1003}>
                <input type="number" name="nbLines" id="1003" min={2} />
            </FormItem>
            <FieldValidationError message={formErrorMessage} isVisible={isFormErrorVisible} setIsVisible={setIsFormErrorVisible} />
            <button type="submit">Générer</button>
        </form>
    )
}

export default Form