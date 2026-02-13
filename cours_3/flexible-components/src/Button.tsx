

interface ButtonProps {
    mode?: 'filled' | 'outline' | 'text';
    Icon?: React.ComponentType;
    children: React.ReactNode;
}

export default function Button({ mode = "filled", Icon, children, ...props }: ButtonProps) {
    return (
        <button className={`${mode}-button button ${Icon ? "icon-button" : ""}`} {...props}>
            {Icon && <span className="button-icon"><Icon /></span>}
            <span>{children}</span>
        </button>
    )
    // !!! Important: 
    // Wrap the icon with a <span className="button-icon"> to achieve the target look
    // Also wrap the children prop with a <span>
}
