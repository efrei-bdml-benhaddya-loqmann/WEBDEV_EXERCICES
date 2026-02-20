interface FieldValidationErrorProps {
    message: string,
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void
}

const FieldValidationError = ({ message, isVisible, setIsVisible }: FieldValidationErrorProps) => {
    // timeout visibility of 5sec
    setTimeout(() => {
        setIsVisible(false)
    }, 5000)
    return (
        <span className={isVisible ? "field-error" : "field-error hidden"}>{message}</span>
    )
}

export default FieldValidationError