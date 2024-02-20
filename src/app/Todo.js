import { useState } from "react";

function Todo() {
    const [tarefa, setTarefa] = useState('');
    const [dataConc, setDataConc] = useState(new Date());
    const [listaTarefas, setLista] = useState([]);

    const addTarefa = () => {
        alert("Ola");
    }

    return <>
        <div className="row">
            <div className="col-md-3 col-sm-2">
                Descrição Tarefa
            </div>
            <div className='col-md-4 col-sm-9'>
                <input className='form-control' type='text' value={tarefa} onChange={(evt) => setTarefa(evt.target.value)} />
            </div>

            <div className="col-md-1 col-sm-2">
                Data
            </div>
            <div className='col-md-4 col-sm-9'>
                <input className='form-control' type='datetime-local' value={dataConc} onChange={(evt) => setDataConc(evt.target.value)} />
            </div>
        </div>

        <div className="row mt-5">
            <div className="col-md-4 col-sm-9"><input className='form-control' type='button' onClick={() => {addTarefa() }} value={"Adicionar Tarefa"} /></div>
            
        </div>
    </>;
}

export default Todo;