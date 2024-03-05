import { useEffect, useState } from "react";
import { createTarefaAPI, deleteTarefasAPI, editTarefasAPI, getTarefasAPI } from "../service/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

var tarefaObject = {
    id: 0,
    descricao: '',
    dataConclusao: ''
}

function Todo() {
    const [desc, setDesc] = useState('');
    const [dataConc, setDataConc] = useState(new Date().toISOString().split("T")[0]);
    const [listaTarefas, setLista] = useState([{...tarefaObject}]);
    // variavel que controla o modal do delete
    const [showDelete, setShowDelete] = useState(false);
    const [idTarefaToDelete, setIdTarefaToDelete] = useState(0);

    // variavel que controla o modal de edit
    const [showEdit, setShowEdit] = useState(false);
    const [tarefaToEdit, setTarefaToEdit] = useState({...tarefaObject});

    // funcao a ser chamada pelo Modal de delete
    const handleCloseModalDelete = (isToSave) => {
        if (isToSave) {
            deleteTarefasAPI(idTarefaToDelete)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                });
        }

        setIdTarefaToDelete(0);
        setShowDelete(false);
    }

    const handleCloseModalEdit = (isToSave) => {
        if (isToSave) {
            editTarefasAPI(tarefaToEdit)
                .then((res) => {
                    console.log(res);
                    return res.json();
                })
                .then((res) => {
                })
                .catch(err => {
                    console.log(err);
                });
        }

        setShowEdit(false);
    }


    // funcao que inicializa o modal de delete
    const handleModalDeleteTarefa = (id) => {
        setIdTarefaToDelete(id);
        setShowDelete(true);
    }

    // funcao que inicializa o modal de edit
    const handleModalEditTarefa = (tarefa) => {
        setTarefaToEdit({...tarefa, 
            dataConclusao: tarefa.dataConclusao.substring(0, 10)});
        setShowEdit(true);
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
        }, 1000);
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
                listaTarefas.length!=0 && listaTarefas[0].id!=0?
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
                                <button onClick={() => { handleModalEditTarefa(tarefa) }} type="button" className="btn btn-warning float-end">Editar</button>
                                <button onClick={() => { handleModalDeleteTarefa(tarefa.id) }} type="button" className="btn btn-danger float-end">Apagar</button>
                            </div>
                        </div>
                    </li>
                }):
                ''
            }
        </ul>

        <Modal show={showDelete} onHide={() => handleCloseModalDelete(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Tem a certeza que quer apagar a tarefa: <b>{idTarefaToDelete}</b></Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseModalDelete(false)}>
                    Não
                </Button>
                <Button variant="danger" onClick={() => handleCloseModalDelete(true)}>
                    Sim
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={showEdit} onHide={() => (setShowEdit(false))}>
            <Modal.Header closeButton>
                <Modal.Title>Editar a tarefa: <b>{tarefaToEdit.id}</b></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-2">
                        <p>Descricao: </p>
                    </div>
                    <div className="col-md-4">
                        <input className="form-control" type="text" 
                        value={tarefaToEdit.descricao} 
                        onChange={evt => {            
                            // let aux = {...tarefaToEdit};
                            // aux.descricao = evt.target.value;
                            // setTarefaToEdit(aux)
                            
                            setTarefaToEdit({...tarefaToEdit, descricao:evt.target.value});
                        }} />
                    </div>

                    <div className="col-md-3">
                        <p>Data de Conclusão: </p>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" type="date" 
                        value={tarefaToEdit.dataConclusao} 
                        onChange={evt => setTarefaToEdit({...tarefaToEdit, dataConclusao:evt.target.value})} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => (handleCloseModalEdit(false))}>
                    Não
                </Button>
                <Button variant="danger" onClick={() => (handleCloseModalEdit(true))}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    </>;
}

export default Todo;