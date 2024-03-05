import { useEffect, useState } from "react";
import { createTarefaApi, deleteTarefasApi, editTarefaApi, getTarefasApi } from "../service/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

var tarefaModelo = {
    id: 0,
    descricao: '',
    dataConclusao: ''
}

function Todo() {
    const [tarefa, setTarefa] = useState('');
    const [dataConc, setDataConc] = useState('');
    const [listaTarefas, setLista] = useState([]);

    // variavel que controla o Modal de apagar tarefa
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idTarefaDelete, setIdTarefaDelete] = useState(0);

    // variavel que controla o Modal de editar tarefa
    const [showEditModal, setShowEditModal] = useState(false);
    const [tarefaToEdit, setTarefaToEdit] = useState({ ...tarefaModelo });

    // fecha o moda, caso tenha a flag a true, faz o delete na api
    const handleCloseDelModal = (isToDelete) => {
        if (isToDelete) {
            deleteTarefasApi(idTarefaDelete)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if (!res.success) {
                        alert(res.message);
                    }
                });
        }

        setShowDeleteModal(false);
    };
    // mostra o modal e guarda no state o id da tarefa a apagar
    const handleShowDelModal = (id) => { setShowDeleteModal(true); setIdTarefaDelete(id) };

    // dá início ao fluxo de apagar a tarefa 
    const handleDeleteTarefa = (id) => {
        handleShowDelModal(id);
    }

    // dá início ao fluxo de editar a tarefa
    const handleEditTarefa = (tarefa) => {
        handleShowEditModal(tarefa);
    }

    const handleShowEditModal = (tarefa) => {
        setShowEditModal(true);
        setTarefaToEdit(tarefa);
    }

    const handleCloseEditModal = (isToSave) => {
        if(isToSave){
            editTarefaApi(tarefaToEdit)
            .then(res=>res.json())
            .then(res=>{});
        }

        setShowEditModal(false);
    }

    // corre a primeira vez
    useEffect(() => {
        setInterval(() => {
            getListaTarefas();
        }, 1000);

    }, []);


    // metodo nao bloqueante
    const getListaTarefas = async () => {
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
                                <button onClick={() => { handleEditTarefa(tarefa) }} type="button" class="btn btn-warning float-end">Editar Tarefa</button>
                            </div>
                        </div>
                    </li>
                })
            }
        </ul>

        <Modal show={showDeleteModal} onHide={() => handleCloseDelModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Quer mesmo apagar a tarefa {idTarefaDelete}?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseDelModal(false)}>
                    Fechar
                </Button>
                <Button variant="danger" onClick={() => handleCloseDelModal(true)}>
                    Apagar
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={showEditModal} onHide={() => handleCloseEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Quer mesmo editar a tarefa {idTarefaDelete}?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-3 col-sm-2">
                        Descrição Tarefa
                    </div>
                    <div className='col-md-4 col-sm-9'>
                        <input className='form-control' type='text'
                            value={tarefaToEdit.descricao}
                            onChange={(evt) => {
                                // let aux = {...tarefaToEdit};
                                // aux.descricao = evt.target.value;
                                // setTarefaToEdit(aux);
                                setTarefaToEdit({ ...tarefaToEdit, descricao: evt.target.value })
                            }} />
                    </div>

                    <div className="col-md-1 col-sm-2">
                        Data
                    </div>
                    <div className='col-md-4 col-sm-9'>
                        <input className='form-control' type='datetime-local' 
                        value={tarefaToEdit.dataConclusao.substring(0,16)} onChange={(evt) => setTarefaToEdit({...tarefaToEdit, dataConclusao:evt.target.value})} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseEditModal(false)}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={() => handleCloseEditModal(true)}>
                    Editar Tarefa
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

export default Todo;