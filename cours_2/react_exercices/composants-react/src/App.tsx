import { useState, type FC } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Section from './components/Section/Section'
import CoreConcept from './components/CoreConcept/CoreConcept'
import { CORE_CONCEPTS, EXAMPLES } from './data'
import TabButton from './components/TabButton/TabButton'

const App: FC = () => {

  const [selectedTab, setSelectedTab] = useState<string>('empty');

  return (
    <div>
      <Header />
      <Main>
        <Section id="a-propos" title="À propos !">
          <p>Dans cet exercice nous allons jouer avec le principe de composant.</p>
          <p>Les composants sont très utiles dans le développement web moderne.</p>
        </Section>

        <Section id="a-la-fin-de-ce-cours" title="A la fin de ce cours">
          <p>Le JSX et les composants n'auront plus aucun secrets pour vous !</p>
        </Section>
        <Section id="core-concepts" title="Concepts importants">
          <ul>
            {CORE_CONCEPTS.map((concept) => (
              <CoreConcept key={concept.title} {...concept} />
            ))}
          </ul>

        </Section>
        <section id='examples'>
          <h2>Exemples</h2>
          <menu>
            <TabButton onClick={() => setSelectedTab('components')}>Components</TabButton>
            <TabButton onClick={() => setSelectedTab('jsx')}>JSX</TabButton>
            <TabButton onClick={() => setSelectedTab('props')}>Props</TabButton>
            <TabButton onClick={() => setSelectedTab('state')}>State</TabButton>
          </menu>

          <div id="tab-content">
            {selectedTab === 'empty' ? (
              <p>Veuillez sélectionner un onglet.</p>
            ) : (
              <div>
                <h3>{EXAMPLES[selectedTab as keyof typeof EXAMPLES].title}</h3>
                <p>{EXAMPLES[selectedTab as keyof typeof EXAMPLES].description}</p>
                <pre>
                  <code>{EXAMPLES[selectedTab as keyof typeof EXAMPLES].code}</code>
                </pre>
              </div>
            )}
          </div>
        </section>
      </Main>
    </div>
  )
}

export default App
