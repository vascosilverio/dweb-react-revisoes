import './App.css';
import Todo from './app/Todo';
import Login from './app/html/Login';
import Registo from './app/html/Registo';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, NavLink } from 'react-router-dom';

var contextReference = { context: { user: "João", tema: "bg-light text-dark" }, setContext: () => { } }
export const ContextoApp = createContext({ ...contextReference });

function App() {
  const [stateApp, setStateApp] = useState({ ...contextReference.context });

  return (
    <ContextoApp.Provider value={{ context: stateApp, setContext: setStateApp }}>
      <Router>
        <div className={`${stateApp.tema} container pt-3`}>
          <nav>
            <ul>
              <li>
                <NavLink to="/login" activeClassName="active">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" activeClassName="active">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/todo" activeClassName="active">
                  Todo
                </NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registo />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </div>
      </Router>
    </ContextoApp.Provider>
  );
}

export default App;