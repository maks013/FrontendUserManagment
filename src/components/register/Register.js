import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const data = {
      username: username,
      password: password,
      email: email
    };
  
    try {
      const response = await axios.post("http://localhost:8080/auth/register", data);
      if (response.status === 201) { 
        const result = response.data; 
        console.log('Registration successful', result);
        navigate('/login'); 
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  
  return (
    <div className="register-container"> 
      <form onSubmit={handleSubmit}>
        <h2>Rejestracja</h2>
        <div className="input-container">
          <input 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div className="input-container">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
        <button type="submit" className="register-button">Zarejestruj się</button>
      </form>
    </div>
  );
};

export default Register;
