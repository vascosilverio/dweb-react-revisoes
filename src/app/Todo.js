import { useEffect, useState } from "react";
import { getTarefas } from "../service/api";

function Todo() {
    const [desc, setDesc] = useState('');
    const [dataConc, setDataConc] = useState(new Date().toISOString().split("T")[0]);
    const [listaTarefas, setLista] = useState([]);

    const addTarefaApi = () => {
        var obj = {descricao: desc, "dataConclusao": new Date(dataConc).toJSON()};


        fetch("https://spring-server.azurewebsites.net/todo/createTarefa", {
            body: JSON.stringify(obj),
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json"
            },
            method: "POST"
          })
          .then(res => res.json())
          .then(res => alert(res));
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

        <div className="row">
            <input type="text"/>
        </div>

        <ul className="mt-5" style={{overflowY: "scroll", height: "50vh"}}>
            {
                listaTarefas.map((tarefa) => {
                    return <li className="form-control mt-1">{tarefa.descricao}</li>
                })
            }
        </ul>
    </>;
}

export default Todo;