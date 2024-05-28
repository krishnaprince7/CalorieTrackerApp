import React from 'react';
import { IoLogoInstagram, IoLogoGithub } from "react-icons/io5";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-[1240px] mx-auto flex flex-col items-center">
        <div className="flex space-x-8 mb-6">
          <a href="https://www.linkedin.com/in/krishna-vishwakarma-485267291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-500 transition-colors duration-300">
            <CiLinkedin size={30} />
          </a>
          <a href="https://www.instagram.com/_princekrishna?igsh=MTcyc3Jkc2E4eGMyeg==" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-500 transition-colors duration-300">
            <IoLogoInstagram size={30} />
          </a>
          <a href="https://github.com/krishnaprince7" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:text-yellow-500 transition-colors duration-300">
            <IoLogoGithub size={30} />
          </a>
        </div>
        <p className="text-sm text-gray-400">© 2024 Krishna. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
