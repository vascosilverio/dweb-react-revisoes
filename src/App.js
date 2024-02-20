import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import OlaDweb from './app/OlaDweb';
import Todo from './app/Todo';

function App() {

  return (
    <div className='custom container'>
      <div className='row'>
        <OlaDweb />
      </div>
      <br />
      <Todo />

    </div>
  );
}

export default App;

// npm install
// npm start