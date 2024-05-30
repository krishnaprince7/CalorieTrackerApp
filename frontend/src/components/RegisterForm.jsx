import React, { useState } from 'react';
import axios from 'axios';
import Navebar from './Navebar';
import Footer from './Footer';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        password: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic client-side validation
        if (!formData.name || !formData.email || !formData.age || !formData.password) {
            setErrorMessage('All fields are required.');
            setSuccessMessage('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/register', formData);
            console.log('Employee registered:', response.data);
            setSuccessMessage('Account created successfully go to Login.');
            setErrorMessage('');
            // Reset form after successful registration if needed
            setFormData({
                name: '',
                email: '',
                age: '',
                password: ''
            });
        } catch (error) {
            console.error('Error registering employee:', error.response.data); // Log the actual error response
            setErrorMessage(error.response?.data?.message || 'Error creating account. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <>
            <Navebar />
            <div className="max-w-lg mx-auto my-10 px-6 py-8 bg-white shadow-2xl rounded-lg border border-gray-200">
                <h2 className="text-3xl mb-6 text-center font-semibold text-gray-700">Register</h2>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Success!</strong>
                        <span className="block sm:inline"> {successMessage}</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <strong className="font-bold">Error!</strong>
                        <span className="block sm:inline"> {errorMessage}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="age">Age</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
                        <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition duration-300" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold">Register</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default RegisterForm;
