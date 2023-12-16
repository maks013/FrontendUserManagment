import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login.js';
import Register from './components/register/Register.js';
import Home from './components/home/Home.js';
import MyAccount from './components/my-account/MyAccount.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-account" element={<MyAccount />} />
      </Routes>
    </Router>
  );
}


export default App;
