import logo from './logo.svg';
import './App.css';
import OlaDweb from './app/OlaDweb';
import Todo from './app/Todo';
import { createContext, useEffect, useState } from 'react';

var contextReference = {
  context: {user: "João", tema: "bg-light text-dark"},
  setContext: ()=>{}
}


export const ContextoApp = createContext({...contextReference});

function App() {
  const [stateApp, setStateApp] = useState({ ...contextReference.context });


  return (
    <ContextoApp.Provider value={{context: stateApp, setContext: setStateApp}}>
      <div className={stateApp.tema + ' container pt-3'}>
        <Todo />

      </div>
    </ContextoApp.Provider>
  );
}

export default App;
