function OlaAluno({propriedadeNome, setPropriedadeNome, setPropriedadeFlag}){

    return <div>
    <input type='text' className="form-control" value={propriedadeNome} onChange={(evt) => {setPropriedadeNome(evt.target.value)}}/>
    <input type='button' className="form-control"  value={"Diz olá"} onClick={()=>{
      setPropriedadeFlag(true);
      }}/>
  </div>;
}

export default OlaAluno;