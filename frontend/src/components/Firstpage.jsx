import React from 'react';
import Footer from './Footer';
import Navebar from "./Navebar";
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Firstpage = () => {
  return (
    <>
      <Navebar />
      <div className="bg-gray-900 w-full">
        <div className="max-w-[1240px] px-6 py-12 grid sm:grid-cols-2 grid-cols-1 gap-8 mx-auto">
          <div className="flex flex-col justify-center text-center sm:text-left">
            <h1 className="text-3xl sm:text-5xl font-bold text-yellow-300 mb-4 leading-tight tracking-tighter animate-fade-in typewriter">Choose Your Life.</h1>
            <h1 className="text-3xl sm:text-5xl font-bold text-yellow-300 leading-tight tracking-tighter animate-fade-in typewriter">Lose Your Limits.</h1>
            <p className="text-gray-300 mt-4 text-lg sm:text-xl">Embrace the journey of self-discovery and transformation.</p>
            <Link to="/register" className="mt-6 inline-block px-8 py-4 rounded-lg bg-yellow-500 text-gray-900 font-semibold transition duration-300 hover:bg-yellow-600 hover:text-white shadow-lg transform hover:scale-105">Get Started</Link>
          </div>
          <div className="flex justify-center">
            <img src="/images/Body.jpg" alt="Body" className="w-full h-auto rounded-lg shadow-lg transform transition duration-500 hover:scale-105 animate-fade-in" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Firstpage;
