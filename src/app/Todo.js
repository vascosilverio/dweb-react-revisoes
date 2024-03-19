import { useEffect, useState } from "react";
import { createTarefaApi, deleteTarefasApi, editTarefaApi, getTarefasApi, getTarefasApiPaged } from "../service/api";

// imports for the modal
import CreateTarefa from "./html/CreateTarefa";
import ItemTarefa from "./html/ItemTarefa";
import ModalsTarefa from "./html/ModalsTarefa";
import ContextView from "./ContextView";

var taskReference = {
    id: 0,
    descricao: '',
    dataConclusao: ''
};

function Todo() {
    const [listaTarefas, setLista] = useState([]);

    // variable to be used when trying to delete a task
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idTaskDel, setIdTaskDel] = useState(0);

    // 
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState({ ...taskReference });

    const [idPagina, setIdPagina] = useState(0);
    const [numTotalPags, setNumTotalPags] = useState(0);

    // is called when the delete modal closes
    const handleCloseDeleteModal = (isToDelete) => {
        if (isToDelete) {
            deleteTarefasApi(idTaskDel)
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
        getTarefasApiPaged(idPagina)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setLista(res.rows);
                setNumTotalPags(res.message);
            })
            .catch((error) => {
                alert(error);
            });
    }



    // corre a primeira vez que o componente monta
    useEffect(() => {
        handleGetListaTarefas();
    }, []);

    useEffect(()=>{
        handleGetListaTarefas();
    }, [idPagina]);

    const getPaginacao = () => {
        let array = [];

        for(let i=0; i<numTotalPags; i++){
            array.push(<li class="page-item"><a class="page-link" onClick={()=>{setIdPagina(i)}}>{i+1}</a></li>)
        }

        return array;
    }

    return <>
        <CreateTarefa />

        <ContextView />

        <ul className="mt-5" style={{ overflowY: "scroll", height: "65vh" }}>
            {
                listaTarefas.map((tarefa) => {
                    return <ItemTarefa tarefaProp={tarefa} handleDeleteTarefaProp={handleDeleteTarefa}
                        handleEditTarefaProp={handleEditTarefa} />;
                })
            }
        </ul>

        <ModalsTarefa handleCloseDeleteModal={handleCloseDeleteModal} idTaskDel={idTaskDel} setShowEditModal={setShowEditModal}
            setTaskToEdit={setTaskToEdit} showEditModal={showEditModal} showDeleteModal={showDeleteModal} taskToEdit={taskToEdit}
        />

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link">Previous</a></li>
                {getPaginacao()} 
               
                <li class="page-item"><a class="page-link" >Next</a></li>
            </ul>
        </nav>

    </>;
}

export default Todo;