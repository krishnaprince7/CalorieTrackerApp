import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navebar from "./Navebar"


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/home'); 
        } catch (error) {
            alert('Invalid email or password');
        }
    };

    return (
        <>
    <Navebar/>

            <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
                <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Login</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Login</button>
                    <div className="mt-4 text-center">
                        <Link to="/register" className="text-blue-500 hover:underline">Don't have an account? Register</Link>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;
