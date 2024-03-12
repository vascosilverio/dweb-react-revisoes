export default function TodoItemLista({tarefaProp, handleModalDeleteTarefaProp, handleModalEditTarefaProp}) {
    return <li key={tarefaProp.id} className="form-control mt-1">
        <div className="row">
            <div className="col-md-5 col-sm-12">
                <h4>{tarefaProp.descricao}</h4>
                <p>{tarefaProp.id}</p>
            </div>
            <div className="col-md-4 col-sm-8">
                <p>Concluir até {tarefaProp.dataConclusao}</p>
            </div>
            <div className="col-md-3 col-sm-4">
                <button onClick={() => { handleModalEditTarefaProp(tarefaProp) }} type="button" className="btn btn-warning float-end">Editar</button>
                <button onClick={() => { handleModalDeleteTarefaProp(tarefaProp.id) }} type="button" className="btn btn-danger float-end">Apagar</button>
            </div>
        </div>
    </li>;
}