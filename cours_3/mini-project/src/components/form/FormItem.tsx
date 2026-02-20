interface FormItemProps {
    name: string,
    id: string,
    children: React.ReactNode
}

const FormItem = ({ name, id, children }: FormItemProps) => {
    return (
        <div className="form-item-field">
            <label htmlFor={id}>{name}</label>
            {children}
        </div>
    )
}

export default FormItem