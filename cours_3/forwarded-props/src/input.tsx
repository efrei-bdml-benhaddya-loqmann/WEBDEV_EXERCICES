interface InputProps {
    richText?: boolean;
    type?: string;
    placeholder: string;
}

const Input = ({ richText, type, placeholder }: InputProps) => {
    // return a <textarea> if a richText prop is true
    // return an <input> otherwise
    // forward / set the received props on the returned elements
    if (richText) {
        return <textarea placeholder={placeholder} />
    }
    return <input type={type} placeholder={placeholder} />

}

export default Input;