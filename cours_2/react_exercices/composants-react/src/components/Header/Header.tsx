import { type FC } from 'react';
import ReactLogo from "../../assets/react.svg";

const technologies = ["React", "Typescript", "Vite", "CSS", "HTML", "Javascript"];

const Header: FC = () => {
    const getRandomString = (tab: string[]): string => {
        const randomIndex = Math.floor(Math.random() * tab.length);
        return tab[randomIndex];
    };

    const randomTech = getRandomString(technologies);

    return (
        <header>
            <img src={ReactLogo} className="logo react" alt="React logo" />
            <h1>Bienvenue sur mon app React</h1>
            <h2>Cette page utilise {randomTech}</h2>
        </header>
    );
};

export default Header;
