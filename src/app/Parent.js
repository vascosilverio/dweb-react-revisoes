import { useState } from 'react';
import OlaAluno from './OlaAluno';

function Parent(){
    const [nome, setNome] = useState('');
  const [flag, setFlag] = useState(false);

  if(!flag){
    return (
      <div>
        <OlaAluno propriedadeNome={nome} setPropriedadeNome={setNome} setPropriedadeFlag={setFlag}/>
      </div>
    );
  }else{
    return (
      <div>
        <OlaAluno propriedadeNome={nome} setPropriedadeNome={setNome} setPropriedadeFlag={setFlag}/>
        <h4>Olá {nome}</h4>
      </div>
    );
  }
}

export default Parent;