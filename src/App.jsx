import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login';
import Dashboard from './page/Dashboard';




const App =()=>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route 
          path="/admin" 
          element={<Dashboard/>} 
        />
      </Routes>
    </Router>
  );
}

export default App;