import './App.css'
import { useRef } from 'react';
function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input data-testid="file-picker" type="file" accept="image/*" ref={fileInputRef} />
        <button onClick={() => fileInputRef?.current?.click()}>Pick Image</button>
      </p>
    </div>
  );
}

export default App;