import { useEffect, useState } from "react";
import { createTarefaApi, deleteTarefasApi, editTarefaApi, getTarefasApi } from "../service/api";

// imports for the modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

var taskReference = {
    id: 0,
    descricao: '',
    dataConclusao: ''
};

function Todo() {
    const [desc, setDesc] = useState('');
    const [dataConc, setDataConc] = useState(new Date().toISOString().split("T")[0]);
    const [listaTarefas, setLista] = useState([]);

    // variable to be used when trying to delete a task
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idTaskDel, setIdTaskDel] = useState(0);

    // 
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState({ ...taskReference });

    // is called when the delete modal closes
    const handleCloseDeleteModal = (isToDelete) => {
        if (isToDelete) {
            deleteTarefasApi(idTaskDel)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if(!res.success){
                        alert(res.message);
                    }
                });
        }

        setShowDeleteModal(false);
    };
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    // is called when user first clicks on the button
    const handleDeleteTarefa = (id) => {
        setIdTaskDel(id)

        handleShowDeleteModal();
    }

    // is called when user first clicks on the button
    const handleEditTarefa = (tarefa) => {
        setTaskToEdit({ ...tarefa });
        setShowEditModal(true);
    }

    // atualiza a lista de tarefas da API
    const handleGetListaTarefas = () => {
        getTarefasApi()
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

        let tarefa = { descricao: desc, "dataConclusao": new Date(dataConc).toJSON() };


        createTarefaApi(tarefa)
            .then(res => res.json())
            .then(res => {
                setDesc('');
                alert('Tarefa criada com sucesso');
            });
    }

    // corre a primeira vez que o componente monta
    useEffect(() => {
        handleGetListaTarefas();

        setInterval(() => {
            handleGetListaTarefas();
        }, 5000);
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
                <button type="button" onClick={() => { handleCreateTarefa() }} class="btn btn-secondary">Criar tarefa</button>
            </div>
        </div>

        <ul className="mt-5" style={{ overflowY: "scroll", height: "70vh" }}>
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
                                <button onClick={() => { handleDeleteTarefa(tarefa.id) }} type="button" class="btn btn-danger float-end">Delete</button>
                                <button onClick={() => { handleEditTarefa(tarefa) }} type="button" class="btn btn-warning float-end">Edit</button>
                            </div>
                        </div>
                    </li>
                })
            }
        </ul>

        <Modal show={showDeleteModal} onHide={() => {
            handleCloseDeleteModal(false);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Do you really wanna delete the task with id: {idTaskDel}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseDeleteModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleCloseDeleteModal(true)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={showEditModal} onHide={() => {
            setShowEditModal(false);
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Edit task with id: {taskToEdit.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-2">
                        <p>Descricao: </p>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" value={taskToEdit.descricao}
                            onChange={evt => {
                                // let aux = {...taskToEdit};
                                // aux.descricao = evt.target.value;
                                // setTaskToEdit(aux);
                                setTaskToEdit({ ...taskToEdit, descricao: evt.target.value });
                            }} />
                    </div>

                    <div className="col-md-3">
                        <p>Data de Conclusão: </p>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" type="date" value={taskToEdit.dataConclusao.substring(0, 10)}
                            onChange={evt => setTaskToEdit({ ...taskToEdit, dataConclusao: evt.target.value })} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    editTarefaApi(taskToEdit)
                    .then(res => {
                        return res.json();
                    })
                    .then(res => {
                        setShowEditModal(false)
                    })
                    
                }}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>

    </>;
}

export default Todo;