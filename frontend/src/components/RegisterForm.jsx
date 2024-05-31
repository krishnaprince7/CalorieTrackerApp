import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Navebar from './Navebar'; 

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setError(''); 
        setSuccessMessage('');

        setTimeout(async () => { 
            try {
                const response = await axios.post('https://calorie-tracker-app-orcin.vercel.app/register', formData);
                console.log('Response:', response.data); 
                setLoading(false); 
                setSuccessMessage('Account created successfully. Redirecting to login...');
                navigate('/login'); // Redirect to login after registration
            } catch (error) {
                console.error('Registration Error:', error.response || error); 
                setError(error.response?.data?.message || 'Error registering. Please try again.');
                setLoading(false); 
            }
        }, 2000); // 2 seconds delay
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <>
            <Navebar /> 
            <div className="max-w-lg mx-auto my-10 px-6 py-8 bg-white shadow-2xl rounded-lg border border-gray-200">
                <h2 className="text-3xl mb-6 text-center font-semibold text-gray-700">Register</h2>
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
                    <>
                        {successMessage && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <strong className="font-bold">Success!</strong>
                                <span className="block sm:inline"> {successMessage}</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                                <input 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    name="name" 
                                    placeholder="Name" 
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                                <input 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    name="email" 
                                    placeholder="Email" 
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="age">Age</label>
                                <input 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" 
                                    type="number" 
                                    value={formData.age} 
                                    onChange={handleChange} 
                                    name="age" 
                                    placeholder="Age" 
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                                <input 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" 
                                    type="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    name="password" 
                                    placeholder="Password" 
                                    required
                                />
                            </div>
                            <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold" type="submit">Register</button>
                        </form>
                    </>
                )}
                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RegisterForm;
