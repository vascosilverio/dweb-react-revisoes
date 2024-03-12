import { useEffect, useState } from "react";
import { createTarefaAPI, deleteTarefasAPI, editTarefasAPI, getTarefasAPI, getTarefasAPIPaged } from "../service/api";

import CreateTarefa from "./html/CreateTarefa";
import TodoItemLista from "./html/TodoItemLista";
import TodoModals from "./html/TodoModals";

var tarefaObject = {
    id: 0,
    descricao: '',
    dataConclusao: ''
}

function Todo() {
    const [listaTarefas, setLista] = useState([{ ...tarefaObject }]);
    // variavel que controla o modal do delete
    const [showDelete, setShowDelete] = useState(false);
    const [idTarefaToDelete, setIdTarefaToDelete] = useState(0);
    // id para paginação
    const [idPagina, setIdPagina] = useState(0);
    const [numPaginas, setNumPaginas] = useState(0);


    // variavel que controla o modal de edit
    const [showEdit, setShowEdit] = useState(false);
    const [tarefaToEdit, setTarefaToEdit] = useState({ ...tarefaObject });

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
        setTarefaToEdit({
            ...tarefa,
            dataConclusao: tarefa.dataConclusao.substring(0, 10)
        });
        setShowEdit(true);
    }

    // atualiza a lista de tarefas da API
    const handleGetListaTarefas = () => {
        getTarefasAPIPaged(idPagina)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setLista(res.rows);
                setNumPaginas(res.message);
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



    return <>
        <CreateTarefa />

        <ul className="mt-5" style={{ overflowY: "scroll", height: "60vh" }}>
            {
                listaTarefas.length != 0 && listaTarefas[0].id != 0 ?
                    listaTarefas.map((tarefa) => {
                        return <TodoItemLista tarefaProp={tarefa}
                            handleModalDeleteTarefaProp={handleModalDeleteTarefa}
                            handleModalEditTarefaProp={handleModalEditTarefa} />
                    }) :
                    ''
            }
        </ul>

        <TodoModals showDelete={showDelete} handleCloseModalDelete={handleCloseModalDelete} idTarefaToDelete={idTarefaToDelete}
            handleCloseModalEdit={handleCloseModalEdit} setShowEdit={setShowEdit} setTarefaToEdit={setTarefaToEdit}
            showEdit={showEdit} tarefaToEdit={tarefaToEdit}
        />

        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link">Previous</a></li>
                <li class="page-item" ><a class="page-link" onClick={()=>{setIdPagina(0)}}>1</a></li>
                <li class="page-item"><a class="page-link" onClick={()=>{setIdPagina(1)}}>2</a></li>
                <li class="page-item"><a class="page-link" onClick={()=>{setIdPagina(2)}}>3</a></li>
                <li class="page-item"><a class="page-link" >Next</a></li>
            </ul>
        </nav>
    </>;
}

export default Todo;