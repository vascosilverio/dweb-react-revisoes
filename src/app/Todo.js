import { useEffect, useState } from "react";
import { createTarefaApi, deleteTarefasApi, getTarefasApi } from "../service/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Todo() {
    const [tarefa, setTarefa] = useState('');
    const [dataConc, setDataConc] = useState('');
    const [listaTarefas, setLista] = useState([]);

    // variavel que controla o Modal
    const [show, setShow] = useState(false);
    const [idTarefaDelete, setIdTarefaDelete] = useState(0);

    const handleClose = (isToDelete) => {
        if(isToDelete){
            deleteTarefasApi(idTarefaDelete)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(!res.success){
                    alert(res.message);
                }
            });
        }

        setShow(false);
    };
    const handleShow = (id) => {setShow(true);setIdTarefaDelete(id)};

    const handleDeleteTarefa = (id) => {
        handleShow(id);
    }

    // corre a primeira vez
    useEffect(() => {
        setInterval(() => {
            handleGetListaTarefas();
        }, 1000);

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

        if (dataConc == '') {
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
                                <p>{tarefa.id}</p>
                            </div>
                            <div className="col-md-4 col-sm-8">
                                <p>Concluir até {tarefa.dataConclusao}</p>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <button onClick={() => { handleDeleteTarefa(tarefa.id) }} type="button" class="btn btn-danger float-end">Apagar Tarefa</button>
                            </div>
                        </div>
                    </li>
                })
            }
        </ul>

        <Modal show={show} onHide={()=>handleClose(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Quer mesmo apagar a tarefa {idTarefaDelete}?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>handleClose(false)}>
                    Fechar 
                </Button>
                <Button variant="danger" onClick={()=>handleClose(true)}>
                    Apagar
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

export default Todo;