import { type FC, type ReactNode } from 'react';

interface MainProps {
    children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
    return (
        <main>
            {children}
        </main>
    );
};

export default Main;