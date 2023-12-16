import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/users', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });

          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };
  
  const handleMyAccountClick = () => {
    navigate('/my-account');
  };

  return (
    <div className="home-container">
      <div className="user-management-section">
        <h1>User Management</h1>
        <button onClick={handleMyAccountClick} className="my-account-button">
          Moje Konto
        </button>
        <button onClick={handleLogout} className="logout-button">
          Wyloguj się
        </button>
        <table className="user-table">
          <thead>
            <tr>
              <th>Nazwa Użytkownika</th>
              <th>Adres E-mail</th>
              <th>Id</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
