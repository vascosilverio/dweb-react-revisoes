import logo from './logo.svg';
import './App.css';

import Parent from './app/Parent';
import { useEffect, useState } from 'react';
import Todo from './app/Todo';

function App() {

  return <div className='custom container pt-3'>
    <Todo />
  </div>;

}

export default App;
