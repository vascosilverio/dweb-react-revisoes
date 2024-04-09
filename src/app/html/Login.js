import React, { useState } from 'react';
import { loginApi } from '../../service/api';
import { useNavigate  } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate ();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginApi(email, password);
      if (!response.success) {
        alert(response.message);
      } else {
        const { jwtToken, userId } = response.rows[0];
        localStorage.setItem('jwtToken', jwtToken);
        console.log(jwtToken);
        console.log(userId);
      localStorage.setItem('userId', userId.toString());
        navigate('/ToDo');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Display an error message to the user or handle the error as needed
    }
  };  


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;