import Input from './Input';
import { useRef } from 'react';

export const userData = {
  name: '',
  email: '',
};

export function App() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function handleSaveData() {
    userData.name = nameRef.current?.value || '';
    userData.email = emailRef.current?.value || '';

    console.log(userData);
  }

  return (
    <div id="app">
      <Input ref={nameRef} type="text" label="Your Name" />
      <Input ref={emailRef} type="email" label="Your E-Mail" />
      <p id="actions">
        <button onClick={handleSaveData}>Save Data</button>
      </p>
    </div>
  );
}

