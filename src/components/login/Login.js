import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      username: username,
      password: password
    };
  
    try {
      const response = await axios.post("http://localhost:8080/auth/login", data);
      if (response.status === 200) { 
        const result = response.data; 
        localStorage.setItem('token', result.token);
        console.log('Login successful', result);
        navigate('/home'); 
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Logowanie</h2>
        <div className="input-container">
          <input 
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-container">
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Hasło"
            required
          />
        </div>
        <button type="submit" className="login-button">Zaloguj się</button>
        <div className="register-link" onClick={() => handleRegisterClick()}>
          Nie masz konta? Zarejestruj się.
        </div>
      </form>
    </div>
  );
};

export default Login;
