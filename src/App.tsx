import React, { useState } from 'react';
import './App.css';
import { Counter } from './Counter';

function App() {
  const [description, setDescription] = useState('BRUNO');

  return (
    <div className="App">
      <input
        value={description}
        onChange={(evt) => {
          setDescription(evt.target.value);
        }}
      />

      <Counter description={description} />
    </div>
  );
}

export default App;
