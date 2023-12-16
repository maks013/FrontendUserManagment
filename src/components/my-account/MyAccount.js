import React, {useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyAccount.css';

const MyAccount = () => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [user, setUser] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [changePasswordFormVisible, setChangePasswordFormVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/users/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const handleChangePassword = () => {
    setChangePasswordFormVisible(true);
  };

  const handleSubmitPasswordChange = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      await axios.put(`http://localhost:8080/users/update-password/${user.id}`, 
        {
          oldPassword: oldPassword,
          newPassword: newPassword
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

      console.log('Password successfully changed');
      setChangePasswordFormVisible(false);
      localStorage.removeItem('token'); 
      navigate('/login');
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const cancelPasswordChange = () => {
    setChangePasswordFormVisible(false);
  };

  const handleEditDetails = () => {
    setEditFormVisible(true);
    setEditedUsername();
    setEditedEmail();
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const updatedUsername = editedUsername !== '' ? editedUsername : '';
      const updatedEmail = editedEmail !== '' ? editedEmail : '';  

      await axios.put(`http://localhost:8080/users/${user.id}`, 
        {
          username: updatedUsername,
          email: updatedEmail
        }, 
        {
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

      console.log('Details successfully updated');
      setEditFormVisible(false);
      localStorage.removeItem('token'); 
      navigate('/login');
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };


  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const userId = user.id;
      if (!userId) {
        console.log('User ID not found');
        return;
      }

      await axios.delete(`http://localhost:8080/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      console.log('Account successfully deleted');
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const cancelEdit = () => {
    setEditFormVisible(false);
  };

  const confirmDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleHomeClick = () => {
    navigate('/home')
  };

  return (
    <div className="my-account-container">
      <h2>Moje Konto</h2>
      <p><strong>Nazwa:</strong> {user.username}</p>
      <p><strong>E-mail:</strong> {user.email}</p>
      <p><strong>Status:</strong> {user.enabled ? 'Aktywny' : 'Nieaktywny'}</p>
      
      {changePasswordFormVisible && (
        <div className="change-password-form">
          <input 
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Stare hasło"
          />
          <input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nowe hasło"
          />
          <button onClick={handleSubmitPasswordChange} className="save-changes-button">
            Zmień hasło
          </button>
          <button onClick={cancelPasswordChange} className="cancel-edit-button">
            Anuluj
          </button>
        </div>
      )}

      <button onClick={handleChangePassword} className="change-password-button">
        Zmień hasło
      </button>
      
      {editFormVisible && (
        <div className="edit-form">
          <input 
            type="text"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
            placeholder="Nazwa użytkownika"
          />
          <input 
            type="email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
            placeholder="Adres E-mail"
          />
          <button onClick={handleEditSubmit} className="save-changes-button">
            Zapisz zmiany
          </button>
          <button onClick={cancelEdit} className="cancel-edit-button">
            Anuluj
          </button>
        </div>
      )}

      <button onClick={handleEditDetails} className="edit-details-button">
        Edytuj swoje dane
      </button>

      {showDeleteConfirmation && (
        <div className="delete-confirmation">
          <p>Czy na pewno chcesz usunąć swoje konto?</p>
          <button onClick={handleDeleteAccount} className="confirm-delete-button">
            Tak
          </button>
          <button onClick={cancelDelete} className="cancel-delete-button">
            Anuluj
          </button>
        </div>
      )}

      <button onClick={confirmDeleteAccount} className="delete-account-button">
        Usuń konto
      </button>

      <button onClick={handleHomeClick} className="home-button">
        Wróć na stronę główną
      </button>
    </div>
  );
};

export default MyAccount;
