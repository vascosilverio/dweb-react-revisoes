import { useState } from 'react';

function OlaDweb() {
    const [texto, setTexto] = useState('');

    return <>
        <div className='col-md-6 col-sm-12'><input className='form-control' type='text' value={texto} onChange={(evt) => setTexto(evt.target.value)} /></div>

        <div className='col-md-3 col-sm-6'>
            <input className='form-control' type='button' onClick={() => { alert("Olá aluno: " + texto) }} value={"Click me"} /
            ></div>
    </>;
}
export default OlaDweb;