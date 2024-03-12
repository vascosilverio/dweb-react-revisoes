import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { editTarefaApi } from '../../service/api';

export default function ModalsTarefa(
    {showDeleteModal, handleCloseDeleteModal, idTaskDel, showEditModal, setShowEditModal,
        taskToEdit, setTaskToEdit
    }) {
    return <>
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
        </Modal></>;
}