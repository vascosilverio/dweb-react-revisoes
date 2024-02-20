import { useState } from 'react';

function OlaDweb() {
    const [texto, setTexto] = useState('');
    return <>
        <div className='col-xs-12 col-md-6'><input className='form-control' type='text' value={texto} onChange={(evt) => setTexto(evt.target.value)} /></div>

        <div className='col-xs-12 col-md-3'><input className='form-control' type='button' onClick={(evt) => { alert("Olá a desenvolvimento web aluno... " + texto) }} value={"Click me"} /></div>

        
    </>
        ;
}

export default OlaDweb;