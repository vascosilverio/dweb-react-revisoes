import { useEffect, useState } from "react";
import { createTarefaApi, deleteTarefasApi, editTarefaApi, getTarefasApi, getTarefasApiPaged } from "../service/api";

// imports for the modal
import CreateTarefa from "./html/CreateTarefa";
import TodoItemList from "./html/TodoItemList";
import ModalsTodo from "./html/ModalsTodo";
import ContextView from "./ContextView";

var taskReference = {
    id: 0,
    descricao: '',
    dataConclusao: ''
};

function Todo() {
    const [listaTarefas, setLista] = useState([{...taskReference}]);

    // variable to be used when trying to delete a task
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idTaskDel, setIdTaskDel] = useState(0);

    // 
    const [showEditModal, setShowEditModal] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState({ ...taskReference });

    const [paginaAtual, setPaginaAtual] = useState(0);
    const [numTotalPaginas, setNumTotalPaginas] = useState(0);

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
        getTarefasApiPaged(paginaAtual)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setLista(res.rows);
                setNumTotalPaginas(res.message);
            })
            .catch((error) => {
                alert(error);
            });
    }

    useEffect(()=>{
        handleGetListaTarefas();
    }, [paginaAtual]);

    let arrayPaginacao = [];
    for(let i = 0; i<numTotalPaginas; i++)
        arrayPaginacao.push(<li class="page-item" onClick={()=>setPaginaAtual(i)}><a class="page-link">{i+1}</a></li>)



    return <>
        <CreateTarefa />

        <ContextView />

        <ul className="mt-5" style={{ overflowY: "scroll", height: "60vh" }}>
            {
                listaTarefas.map((tarefa) => {
                    return <TodoItemList tarefaProp={tarefa} handleDeleteTarefaProp={handleDeleteTarefa} handleEditTarefaProp={handleEditTarefa} />
                })
            }
        </ul>

        <ModalsTodo handleCloseDeleteModal={handleCloseDeleteModal} idTaskDel={idTaskDel}
            setShowEditModal={setShowEditModal} setTaskToEdit={setTaskToEdit} taskToEdit={taskToEdit}
            showDeleteModal={showDeleteModal} showEditModal={showEditModal} />

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                {arrayPaginacao}
            </ul>
        </nav>

    </>;
}

export default Todo;