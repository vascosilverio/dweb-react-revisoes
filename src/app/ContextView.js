import { useContext } from "react";
import { ContextoApp } from "../App";

export default function ContextView() {
    const ctx = useContext(ContextoApp);

    return <>
        <div className="row mt-2 mb-2">
            <hr />
            <h4>Olá {ctx.context.user}</h4>
            <div className="col-md-3">
                <input className="form-control" type="text" value={ctx.context.user} onChange={(evt) => {
                    let aux = { ...ctx.context };
                    aux.user = evt.target.value;

                    ctx.setContext(aux);

                }} />
            </div>

            <div className="col-md-3">
                <input className="form-control" value={"Mudar Tema"} type="button" onClick={() => {
                    let aux = { ...ctx.context };
                    aux.tema = aux.tema == "bg-light text-dark" ? "bg-dark text-white" : "bg-light text-dark"

                    ctx.setContext(aux);
                }} />
            </div>
           
        </div>
        <hr />

    </>;
}