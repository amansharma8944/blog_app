import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUpPage from './pages/SignUpPage';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import Profile from './pages/Profile';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';



function App() {
  return (

    <Routes>
    
      <Route path="/" element={
          <ProtectedRoute>
            <Home/>
            </ProtectedRoute>
      }   />
      <Route path="/profile" element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
      }   />
      <Route path="/createBLog" element={
          <ProtectedRoute>
            <CreateBlog/>
          </ProtectedRoute>
      }  
      />
      <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditBlog/>
          </ProtectedRoute>
      }  
      />

      <Route path="/signup" element={<SignUpPage/>}   />

      <Route path="/login" element={<Login/>}   />

    </Routes>

    
  );
}

export default App;
