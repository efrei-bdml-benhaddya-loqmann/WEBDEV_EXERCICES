import componentLogo from './assets/package_google.png';
import propsLogo from './assets/gear_google.png';
import jsxLogo from './assets/jsx.png';
import stateLogo from './assets/database.png';

export const CORE_CONCEPTS = [
  {
    image: componentLogo,
    title: 'Components',
    description:
      'Le concept de base de toutes les applications web modernes, on créé les interfaces en combinant les composants.',
  },
  {
    image: jsxLogo,
    title: 'JSX',
    description:
      "Un mélange de HTML et de Javascript permettant une meilleur flexibilité dans l'affichage.",
  },
  {
    image: propsLogo,
    title: 'Props',
    description:
      "Permet aux composant d'être configurable et réutilisable en leurs injectant des données.",
  },
  {
    image: stateLogo,
    title: 'State',
    description:
      "Données du composants qui une fois changés déclenche un nouveau rendu du composant et une maj de l'ui.",
  },
];

export const EXAMPLES = {
  components: {
    title: 'Components',
    description:
      'Les composants sont les blocs de construction de base des applications React. Un composant est un module autonome (HTML + CSS optionnel + JS) qui produit un rendu.',
    code: `
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
  },
  jsx: {
    title: 'JSX',
    description:
      "JSX est une extension de syntaxe pour JavaScript. Il ressemble à un langage de template, mais il possède toute la puissance de JavaScript (par exemple, il peut afficher du contenu dynamique).",
    code: `
<div>
  <h1>Welcome {userName}</h1>
  <p>Time to learn React!</p>
</div>`,
  },
  props: {
    title: 'Props',
    description:
      "Les composants acceptent des entrées arbitraires appelées props. Elles sont comme des arguments de fonction.",
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  state: {
    title: 'State',
    description:
      "Le State permet aux composants React de modifier leur sortie au fil du temps en réponse aux actions de l'utilisateur, aux réponses du réseau, etc.",
    code: `
function Counter() {
  const [isVisible, setIsVisible] = useState(false);

  function handleClick() {
    setIsVisible(true);
  }

  return (
    <div>
      <button onClick={handleClick}>Show Details</button>
      {isVisible && <p>Important details!</p>}
    </div>
  );
}`,
  },
};
