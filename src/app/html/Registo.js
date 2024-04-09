import React, { useState } from 'react';
import { registoApi } from '../../service/api';

const Registo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dataNasc, setDataNasc] = useState('');

  const handleRegisto = async (e) => {
    e.preventDefault();
    try {
      const response = await registoApi(email, password, dataNasc);
      console.log(response.json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Registo</h2>
      <form onSubmit={handleRegisto}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dataNasc">Data de Nascimento</label>
          <input
            type="date"
            id="dataNasc"
            value={dataNasc}
            onChange={(e) => setDataNasc(e.target.value)}
          />
        </div>
        <button type="submit">Registo</button>
      </form>
    </div>
  );
};

export default Registo;