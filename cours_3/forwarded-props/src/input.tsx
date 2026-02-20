import { type ComponentPropsWithoutRef } from 'react';

type InputProps = { richText?: boolean } & ComponentPropsWithoutRef<'input'> & ComponentPropsWithoutRef<'textarea'>;

const Input = ({ richText, ...props }: InputProps) => {
    if (richText) {
        return <textarea {...props} />
    }
    return <input {...props} />
}

export default Input;