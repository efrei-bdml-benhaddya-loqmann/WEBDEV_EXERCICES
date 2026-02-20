import { useRef } from 'react';
import Form, { type FormHandle } from './Form';

export function App() {
  const formRef = useRef<FormHandle>(null);

  function handleRestart() {
    formRef.current?.clear();
  }

  return (
    <div id="app">
      <button onClick={handleRestart}>Restart</button>
      <Form ref={formRef} />
    </div>
  );
}

