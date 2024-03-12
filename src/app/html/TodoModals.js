import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function TodoModals(
    {showDelete, handleCloseModalDelete, idTarefaToDelete, 
        showEdit, setShowEdit, tarefaToEdit, setTarefaToEdit, handleCloseModalEdit}
    ) {
    return <>
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

                                setTarefaToEdit({ ...tarefaToEdit, descricao: evt.target.value });
                            }} />
                    </div>

                    <div className="col-md-3">
                        <p>Data de Conclusão: </p>
                    </div>
                    <div className="col-md-3">
                        <input className="form-control" type="date"
                            value={tarefaToEdit.dataConclusao}
                            onChange={evt => setTarefaToEdit({ ...tarefaToEdit, dataConclusao: evt.target.value })} />
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
    </>
}