import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navebar from './Navebar'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setError(''); 

        setTimeout(async () => { 
            try {
                const response = await axios.post('https://calorie-tracker-app-orcin.vercel.app/login', { email, password });
                console.log('Response:', response.data); 
                localStorage.setItem('token', response.data.token);
                setLoading(false); 
                navigate('/home'); 
            } catch (error) {
                console.error('Login Error:', error.response || error); 
                setError('Invalid email or password');
                setLoading(false); 
            }
        }, 3000);
    };

    return (
        <>
            <Navebar /> 
            <div className="max-w-lg mx-auto my-10 px-6 py-8 bg-white shadow-2xl rounded-lg border border-gray-200">
                <h2 className="text-3xl mb-6 text-center font-semibold text-gray-700">Login</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {error}</span>
                    </div>
                )}
                {loading ? (
                    <div className="text-center my-4">
                        <div className="loader border-t-4 border-b-4 border-blue-500 w-12 h-12 rounded-full mx-auto animate-spin"></div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                            <input 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email" 
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                            <input 
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password" 
                                required
                            />
                        </div>
                        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold" type="submit">Login</button>
                    </form>
                )}
                <div className="mt-4 text-center">
                    <Link to="/register" className="text-blue-500 hover:underline">Don't have an account? Register</Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
