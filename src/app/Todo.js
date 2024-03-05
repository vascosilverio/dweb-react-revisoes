import { useEffect, useState } from "react";
import { createTarefaAPI, deleteTarefasAPI, getTarefasAPI } from "../service/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Todo() {
    const [desc, setDesc] = useState('');
    const [dataConc, setDataConc] = useState(new Date().toISOString().split("T")[0]);
    const [listaTarefas, setLista] = useState([]);
    // variavel de state que controla o modal
    const [show, setShow] = useState(false);
    const [idTarefaToDelete, setIdTarefaToDelete] = useState(0);

    // funcao a ser chamada pelo Modal
    const handleCloseModal = (isToSave) => {
        if(isToSave){
            deleteTarefasAPI(idTarefaToDelete)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
            });
        }

        setIdTarefaToDelete(0);
        setShow(false);
    }

    const handleModalDeleteTarefa = (id) => {
        setIdTarefaToDelete(id);
        setShow(true);
    }

    // atualiza a lista de tarefas da API
    const handleGetListaTarefas = () => {
        getTarefasAPI()
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setLista(res.rows);
            })
            .catch((error) => {
                alert(error);
            });
    }

    // adiciona tarefa na api
    const handleCreateTarefa = () => {
        if (desc == '') {
            alert("Preencha sff a descrição da tarefa");
            return
        }

        let tarefa = { descricao: desc, dataConclusao: new Date(dataConc).toJSON() };


        createTarefaAPI(tarefa)
            .then(res => res.json())
            .then(res => {
                setDesc('');
                alert('Tarefa criada com sucesso');
            });
    }

    // corre a primeira vez que o componente monta
    useEffect(() => {
        setInterval(() => {
            handleGetListaTarefas();
        }, 400);
    }, []);



    return <>
        <div className="row">
            <div className="col-md-2">
                <p>Descricao: </p>
            </div>
            <div className="col-md-4">
                <input className="form-control" type="text" value={desc} onChange={evt => setDesc(evt.target.value)} />
            </div>

            <div className="col-md-3">
                <p>Data de Conclusão: </p>
            </div>
            <div className="col-md-3">
                <input className="form-control" type="date" value={dataConc} onChange={evt => setDataConc(evt.target.value)} />
            </div>
        </div>

        <div className="row">
            <div className="col-md-3">
                <button type="button" onClick={() => { handleCreateTarefa() }} className="btn btn-secondary">Criar tarefa</button>
            </div>
        </div>

        <ul className="mt-5" style={{ overflowY: "scroll", height: "70vh" }}>
            {
                listaTarefas.map((tarefa) => {
                    return <li key={tarefa.id} className="form-control mt-1">
                        <div className="row">
                            <div className="col-md-5 col-sm-12">
                                <h4>{tarefa.descricao}</h4>
                                <p>{tarefa.id}</p>
                            </div>
                            <div className="col-md-4 col-sm-8">
                                <p>Concluir até {tarefa.dataConclusao}</p>
                            </div>
                            <div className="col-md-3 col-sm-4">
                                <button onClick={() => { handleModalDeleteTarefa(tarefa.id) }} type="button" className="btn btn-danger float-end">Danger</button>
                            </div>
                        </div>
                    </li>
                })
            }
        </ul>

        <Modal show={show} onHide={()=>handleCloseModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Tem a certeza que quer apagar a tarefa: <b>{idTarefaToDelete}</b></Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>handleCloseModal(false)}>
                    Não
                </Button>
                <Button variant="danger" onClick={()=>handleCloseModal(true)}>
                    Sim
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

export default Todo;