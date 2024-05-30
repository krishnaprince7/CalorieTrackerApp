import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';

import Register from './components/RegisterForm';


import Firstpage from './components/Firstpage';
import CalorieTrackerApp from './components/CalorieTrackerApp';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <>

        <Routes>
                
                <Route 
                    path="/home" 
                    element={isAuthenticated ? <CalorieTrackerApp /> : <Login/>} 
                />
                <Route path="/" element={<Firstpage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
             
            </Routes>
        </>
        
    );
};

export default App;
