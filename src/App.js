import logo from './logo.svg';
import './App.css';

import Parent from './app/Parent';
import { createContext, useEffect, useState } from 'react';
import Todo from './app/Todo';

const contextModel = {
  context:{tema:"bg-dark text-white", user: ""},
  setContext: ()=>{}
}

export const AppContext = createContext({...contextModel});

function App() {

  const [appState, setAppState] = useState({...contextModel.context});

  return <AppContext.Provider value={{context:appState, setContext:setAppState}}>
    <div className={appState.tema+ ' container pt-3'}>
      <Todo />
    </div>;
  </AppContext.Provider>


}

export default App;
