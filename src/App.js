import React from 'react';
import { Tuxedo } from './Tuxedo';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="tuxedo__border">
        <header>
          <h1>Tuxedo</h1>
          <p>Turn your screen to black and white on selected websites.</p>
        </header>
        <Tuxedo />
      </div>
    </div>
  );
}

export default App;
