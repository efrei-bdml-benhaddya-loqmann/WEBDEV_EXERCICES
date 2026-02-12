import { type FC } from 'react';

interface CoreConceptProps {
    title: string;
    description: string;
    image: string;
}


const CoreConcept: FC<CoreConceptProps> = ({ title, description, image }) => {
    return (
        <li>
            <div className="core-concept">
                <img src={image} alt={title} className="core-concept-image" />
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </li>
    );
}

export default CoreConcept;
