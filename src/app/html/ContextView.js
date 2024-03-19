import { useContext, useEffect } from "react";
import { AppContext } from "../../App";

export default function ContextView() {
    const ctx = useContext(AppContext);

    return <>
        
        <div className="row mb-2 mt-2">
        <hr />
            <h1>Contexto</h1>
            <h4>Olá {ctx.context.user}</h4>
            <div className="col-md-2">
                <input type="text" value={ctx.context.user} onChange={(evt) => {
                    let aux = { ...ctx.context };
                    aux.user = evt.target.value;

                    ctx.setContext(aux);
                }} />
            </div>

            <div className="col-md-2">
                <input type="button" value={"Change theme"} className="form-control" onClick={() => {
                    let aux = { ...ctx.context };
                    aux.themeIsLight = !aux.themeIsLight;

                    ctx.setContext(aux);
                }} />
            </div>
        </div>
        <hr />

    </>;
}