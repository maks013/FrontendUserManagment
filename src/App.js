import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Home from './components/Home.js';
import MyAccount from './components/MyAccount.js';

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
