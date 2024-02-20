import { useEffect, useState } from "react";

function Todo() {
    const [titulo, setTitulo] = useState('');
    const [desc, setDesc] = useState('');
    const [dataConc, setDataConc] = useState('');
    const [listaTarefas, setLista] = useState([]);

    const addTarefa = () => {
        
    }

    return <>
        <div className="row">
            <div className="col-md-1">
                <p>Titulo: </p>
            </div>
            <div className="col-md-3">
                <input className="form-control" type="text" value={titulo} 
                onChange={evt => setTitulo(evt.target.value)} />
            </div>

            <div className="col-md-2">
                <p>Descricao: </p>
            </div>
            <div className="col-md-4">
                <input className="form-control" type="text" value={desc} onChange={evt => setDesc(evt.target.value)} />
            </div>
        </div>

        <br />
        <div className="row">
            <div className="col-md-3">
                <p>Data de Conclusão: </p>
            </div>
            <div className="col-md-3">
                <input className="form-control" type="date" value={dataConc} onChange={evt => setDataConc(evt.target.value)} />
            </div>
        </div>
    </>;
}

export default Todo;