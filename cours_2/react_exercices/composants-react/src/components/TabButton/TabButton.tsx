import type { ReactNode } from "react";

interface TabButtonProps {
    children: ReactNode;
    onClick?: () => void;
}

const TabButton = ({ children, onClick }: TabButtonProps) => {
    return (
        <li>
            <button onClick={onClick}>{children}</button>
        </li>
    );
}

export default TabButton;