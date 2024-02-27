import { useEffect, useState } from "react";
import { getTarefasApi } from "../service/api";

function Todo() {
    const [tarefa, setTarefa] = useState('');
    const [dataConc, setDataConc] = useState(new Date());
    const [listaTarefas, setLista] = useState([]);

    useEffect(() => {
        getTarefas();
    }, []);


    // metodo nao bloqueante
    const getTarefas = async () => {
        getTarefasApi()
            .then(res => {
                return res.json();
            })
            .then((res) => {
                setLista(res.rows);
            });
    }

    // metodo bloqueante
    const getTarefasSincrono = async () => {
        let res = await fetch("https://spring-server.azurewebsites.net/todo/getTarefas");
        res = res.json();
    }

    const addTarefaApi = () => {

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
            <div className="col-md-4 col-sm-9"><input className='form-control' type='button' onClick={() => { getTarefasSincrono() }} value={"Adicionar Tarefa"} /></div>

        </div>

        <ul className="mt-5" style={{height:"30vh", overflowY:"scroll"}}>
            {
                listaTarefas.map(elem => {
                    return <li className="form-control">{elem.descricao}--{elem.id}</li>
                })
            }

        </ul>
    </>;
}

export default Todo;