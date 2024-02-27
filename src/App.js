import logo from './logo.svg';
import './App.css';

import Parent from './app/Parent';
import { useEffect, useState } from 'react';
import { createTarefaApi, getTarefasApi } from './api/api';

function App() {
  // state
  const [tarefa, setTarefa] = useState('');
  const [dataConc, setDataConc] = useState(new Date().toISOString().substring(0, 16));

  const [listaTarefas, setListaTarefas] = useState([]);

  const getTarefasAndSetState = () => {
    getTarefasApi()
    .then((res) => {
      return res.json();
    })
    .then(res => {
      setListaTarefas(res.rows);
    })
    .catch((erro) => {
      console.log(erro);
    })
  }

  // 
  useEffect(() => {
    getTarefasAndSetState();

  }, []);

  const adicionaTarefa = () => {
    let obj = {descricao: tarefa, dataConclusao:dataConc}

    createTarefaApi(obj)
    .then((res) => {
      return res.json();
    })
    .then(res => {
      if(res.success){
        getTarefasAndSetState();
      }
    })
    .catch((erro) => {
      console.log(erro);
    })

   


  }

  return <div className='custom container'>
    <div className='row'>
      <div className='col-md-1 col-sm-12'>
        <h4>Tarefa</h4>
      </div>
      <div className='col-md-4 col-sm-12'>
        <input type='text' value={tarefa} onChange={(evt) => setTarefa(evt.target.value)} className='form-control' />
      </div>

      <div className='col-md-4 col-sm-12'>
        <h4>Data de Conclusão</h4>
      </div>
      <div className='col-md-3 col-sm-12'>
        <input type='datetime-local' value={dataConc} onChange={(evt) => { setDataConc(evt.target.value) }} className='form-control' />
      </div>



    </div>

    <div className='row mb-5'>
      <div className='col-md-5 col-sm-12'>
        <input type='button' className='form-control' onClick={() => { adicionaTarefa() }} value={"Clica em mim!"} />
      </div>
    </div>

    <div className='row'>
      <ul style={{height:"70vh", overflowY:"scroll"}}>
        {
          listaTarefas.map(item => {
            return <li className='form-control'><h4>{item.descricao}</h4><b>Concluir até {item.dataConclusao}</b></li>
          })
        }
      </ul>
    </div>




  </div>

}

export default App;
