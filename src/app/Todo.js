import { useEffect, useState } from "react";
import {createTarefaApi, deleteTarefasApi, getTarefasApi } from "../service/api";

function Todo() {
    const [tarefa, setTarefa] = useState('');
    const [dataConc, setDataConc] = useState('');
    const [listaTarefas, setLista] = useState([]);

    const handleDeleteTarefa = (id) => {
        deleteTarefasApi(id)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                handleGetListaTarefas();
            });
    }

    // corre a primeira vez
    useEffect(() => {
        handleGetListaTarefas();
    }, []);


    // metodo nao bloqueante
    const handleGetListaTarefas = async () => {
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

    // adiciona tarefa na api
    const handleCreateTarefa = () => {
        if (tarefa == '') {
            alert("Preencha sff a descrição da tarefa");
            return
        }

        if(dataConc== ''){
            alert("Preencha sff a data de conclusão");
            return
        }

        let obj = { descricao: tarefa, "dataConclusao": new Date(dataConc).toJSON() };

        createTarefaApi(obj)
            .then(res => res.json())
            .then(res => {
                setTarefa('');
                setDataConc('')
                alert('Tarefa criada com sucesso');
                handleGetListaTarefas();
            });
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

        <div className="row mt-2">
            <div className="col-md-4 col-sm-9"><input className='form-control' type='button' onClick={() => { handleCreateTarefa() }} value={"Adicionar Tarefa"} /></div>

        </div>

        <ul className="mt-5" style={{ height: "50vh", overflowY: "scroll" }}>
            {
                listaTarefas.map((tarefa) => {
                    return <li className="form-control mt-1">
                        <div className="row">
                            <div className="col-md-5 col-sm-12">
                                <h4>{tarefa.descricao}</h4>
                            </div>
                            <div className="col-md-4 col-sm-8">
                                <p>Concluir até {tarefa.dataConclusao}</p>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <button onClick={() => { handleDeleteTarefa(tarefa.id) }} type="button" class="btn btn-danger float-end">Danger</button>
                            </div>
                        </div>
                    </li>
                })
            }

        </ul>
    </>;
}

export default Todo;