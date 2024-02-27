import { useEffect, useState } from "react";
import { getTarefas } from "../service/api";

function Todo() {
    const [desc, setDesc] = useState('');
    const [dataConc, setDataConc] = useState('');
    const [listaTarefas, setLista] = useState([]);

    const addTarefaApi = () => {
        let headers = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: ""
        };


        let obj = {"descricao":"", "dataConclusao": new Date()};

        fetch("", headers);
    }

    useEffect(()=>{
        getTarefas()
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setLista(res.rows);
        })
        .catch((error)=>{
            alert(error);
        });

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

        <ul className="mt-5">
            {
                listaTarefas.map((tarefa) => {
                    return <li className="form-control mt-1">{tarefa.descricao}</li>
                })
            }
        </ul>
    </>;
}

export default Todo;