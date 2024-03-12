export default function TodoItemList({tarefaProp, handleDeleteTarefaProp, handleEditTarefaProp}) {
    return <li className="form-control mt-1">
        <div className="row">
            <div className="col-md-5 col-sm-12">
                <h4>{tarefaProp.descricao}</h4>
                <p>{tarefaProp.id}</p>
            </div>
            <div className="col-md-4 col-sm-8">
                <p>Concluir até {tarefaProp.dataConclusao}</p>
            </div>
            <div className="col-md-3 col-sm-4">
                <button onClick={() => { handleDeleteTarefaProp(tarefaProp.id) }} type="button" class="btn btn-danger float-end">Delete</button>
                <button onClick={() => { handleEditTarefaProp(tarefaProp) }} type="button" class="btn btn-warning float-end">Edit</button>
            </div>
        </div>
    </li>;
}