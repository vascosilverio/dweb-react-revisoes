import logo from './logo.svg';
import './App.css';

import Parent from './app/Parent';
import { useState } from 'react';

function App() {
  const [listaTarefas, setListaTarefas] = useState([]);

  const adicionaTarefa = () => {
    
  }

  return <div className='custom container'>
    <div className='row'>
      <div className='col-md-1 col-sm-12'>
        <h4>Tarefa</h4>
      </div>
      <div className='col-md-4 col-sm-12'>
        <input type='text' className='form-control' />
      </div>

      <div className='col-md-4 col-sm-12'>
        <h4>Data de Conclusão</h4>
      </div>
      <div className='col-md-3 col-sm-12'>
        <input type='datetime-local' className='form-control' />
      </div>



    </div>

    <div className='row mb-5'>
      <div className='col-md-5 col-sm-12'>
        <input type='button' className='form-control' onClick={()=>{adicionaTarefa()}} value={"Clica em mim!"} />
      </div>
    </div>

  <div className='row'>
    <ul>
      <li className='form-control'><h4>Tarefa 1</h4><b>Concluir até....</b></li>
    </ul>
  </div>




  </div>

}

export default App;
