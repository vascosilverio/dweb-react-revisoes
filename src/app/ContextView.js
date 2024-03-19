import { useContext } from "react"
import { AppContext, UserContext } from "../App"

export default function ContextView() {
    const ctx = useContext(AppContext);

    return <>
        <div className="row">
            <h4>Olá {ctx.context.user}</h4>


            <div className="col-md-3">

                <input type="text" value={ctx.context.user} onChange={(evt) => {
                    let aux = { ...ctx.context };
                    aux.user = evt.target.value;
                    ctx.setContext(aux);
                }} />
            </div>

            <div className="col-md-3">

                <input className="form-control" type="button" value={"Mudar tema"} onClick={() => {
                    let aux = { ...ctx.context };
                    aux.tema = aux.tema === "bg-dark text-white" ? "bg-primary text-dark" : "bg-dark text-white"
                    ctx.setContext(aux)
                }} />
            </div>

        </div>


    </>
}