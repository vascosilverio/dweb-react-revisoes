import logo from './logo.svg';
import './App.css';
import { createContext, useEffect, useState } from 'react';
import OlaDweb from './app/OlaDweb';
import Todo from './app/Todo';

var contextInterface = {
  context:{user:"João", themeIsLight: false},
  setContext: ()=>{}
}

export const AppContext = createContext({...contextInterface});

function App() {
  const [ctx, setCtx] = useState({...contextInterface.context});


  return (
    <AppContext.Provider value={{context: ctx, setContext: setCtx}} >
      <div className={ (ctx.themeIsLight?"bg-light text-dark" : "bg-dark text-white") + ' container'}>
        <div className='row'>
          <Todo />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;

// npm install
// npm start