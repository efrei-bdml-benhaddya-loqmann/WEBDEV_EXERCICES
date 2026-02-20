import { useState, type SubmitEvent } from "react"
import { OBJECTIVES } from "../../data/data"
import FieldValidationError from "../util/error/FieldValidationError"
import "./Form.css"
import FormItem from "./FormItem"

interface FormProps {
    onGenerate: (
        objectives: number[],
        minWeight: number,
        maxWeight: number,
        nbLines: number
    ) => void
}

const Form = ({ onGenerate }: FormProps) => {

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

        // Regles de validation
        if (minW > maxW) {
            form.reportValidity()
            setFormErrorMessage("Le poids minimum doit être inférieur au poids maximum.")
            setIsFormErrorVisible(true)
            return
        }

        if (lines > (maxW - minW)) {
            form.reportValidity()
            setFormErrorMessage("Le nombre de lignes doit être inférieur ou égal à la différence entre le poids max et min.")
            setIsFormErrorVisible(true)
            return
        }
        if (lines < 2) {
            form.reportValidity()
            setFormErrorMessage("Le nombre de lignes doit être supérieur ou égal à 2.")
            setIsFormErrorVisible(true)
            return
        }

        // Utilise la fonction défini dans App.tsx pour générer le tableau
        onGenerate(selectedObjectives, minW, maxW, lines)
    }

    return (
        <form
            action="sendData"
            onSubmit={handleSubmit}
            method="POST" // masquer les arguments dans l'url
            noValidate
        >
            <div className="form-card">

                <p className="form-section-title">Objectifs</p>
                <div className="objectives-grid">
                    {OBJECTIVES.map((objective) => (
                        <div className="form-item-checkbox" key={objective.id}>
                            <input
                                type="checkbox"
                                value={objective.id}
                                name="objectives"
                                id={`obj-${objective.id}`}
                            />
                            <label htmlFor={`obj-${objective.id}`}>
                                {objective.name}
                            </label>
                        </div>
                    ))}
                </div>

                <hr className="form-separator" />

                <p className="form-section-title">Paramètres</p>
                <div className="form-fields-row">
                    <FormItem name="Poids minimum (kg)" id="minWeight">
                        <input type="number" name="minWeight" id="minWeight" min={0} required />
                    </FormItem>
                    <FormItem name="Poids maximum (kg)" id="maxWeight">
                        <input type="number" name="maxWeight" id="maxWeight" min={0} required />
                    </FormItem>
                    <FormItem name="Nombre de lignes" id="nbLines">
                        <input type="number" name="nbLines" id="nbLines" min={2} required />
                    </FormItem>
                </div>

                {/* S'affiche lorsque une erreur du formulaire est détectée */}
                <FieldValidationError
                    message={formErrorMessage}
                    isVisible={isFormErrorVisible}
                    setIsVisible={setIsFormErrorVisible}
                />

                <button type="submit" className="btn-generate">
                    Générer le tableau →
                </button>
            </div>
        </form>
    )
}

export default Form