interface FormItemProps {
    name: string,
    id: number,
    children: React.ReactNode
}

const FormItem = ({ name, id, children }: FormItemProps) => {
    return (
        <div className="form-item">
            <label htmlFor={id.toString()}>{name}</label>
            {children}
        </div>
    )
}

export default FormItem