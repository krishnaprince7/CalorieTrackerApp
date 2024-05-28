import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Navebar from './Navebar';

const Register = () => {
    const initialFormData = {
        name: '',
        email: '',
        age: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, age, password } = formData;
        if (!name || !email || !age || !password) {
            setShowErrorAlert(true);
            return;
        }
        try {
            await axios.post('http://localhost:5000/register', formData);
            setShowSuccessAlert(true);
        } catch (error) {
            console.error('Error registering user:', error);
            setShowErrorAlert(true);
        }
    };

    const handleCloseSuccessAlert = () => {
        setShowSuccessAlert(false);
        setFormData(initialFormData); // Reset form data to empty values
    };

    return (
        <>
            <Navebar />
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
                <h2 className="text-2xl mb-4 text-blue-600">Create Account</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-gray-600">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 text-gray-600">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="age" className="block mb-2 text-gray-600">Age</label>
                    <input 
                        type="number" 
                        id="age" 
                        name="age" 
                        value={formData.age} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 text-gray-600">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300">Register</button>
            </form>
            <div className="text-center m-4 ">
                <Link to="/login" className="text-blue-600 hover:underline">Already have an account? Login</Link>
            </div>
            {/* Error Alert Popup */}
            {showErrorAlert && (
                <div className="overlay">
                    <div className="alert-popup error">
                        <h2>Error</h2>
                        <p>Please fill in all fields to create an account</p>
                        <button onClick={() => setShowErrorAlert(false)} className="text-blue-600 hover:underline">Close</button>
                    </div>
                </div>
            )}
            {/* Success Alert Popup */}
            {showSuccessAlert && (
                <div className="overlay">
                    <div className="alert-popup success">
                        <h2>Success</h2>
                        <p>User registered successfully go to Login Page.</p>
                        <button onClick={handleCloseSuccessAlert} className="text-blue-600 hover:underline">Close</button>
                    </div>
                </div>
            )}
            {/* Suggestion Message */}
            {showSuccessAlert && (
                <div className="text-center mt-4">
                    <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
                </div>
            )}
            <Footer />
        </>
    );
};

export default Register;
