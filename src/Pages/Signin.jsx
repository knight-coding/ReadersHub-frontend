import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    terms: false
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, email, fullname, terms } = formData;

    if (!terms) {
      alert("You must agree to the Terms and Conditions.");
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      alert("Enter a valid email address.");
      return;
    }

    try {
      // Send data to your backend
      await axios.post('http://localhost:4000/register', {
        username,
        email,
        password,
        fullname
      });

      navigate('/login'); // Redirect after success
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf2]">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
           style={{ animation: 'fadeIn 0.8s ease-in-out' }}>
        <h2 className="text-black text-2xl text-center font-semibold mb-5">Sign Up</h2>
        
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="username" className="block text-sm font-medium text-black">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-3 rounded border border-gray-300"
          />

          <label htmlFor="username" className="block text-sm font-medium text-black">Fullname</label>
          <input
            type="text"
            id="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded border border-gray-300"
          />
          
          <label htmlFor="email" className="block text-sm font-medium text-black">Email Address</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded border border-gray-300"
          />
          
          <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded border border-gray-300"
          />
                  
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="terms"
              checked={formData.terms}
              onChange={handleChange}
              required
              className="w-auto mr-2"
            />
            <label htmlFor="terms" className="text-black text-sm">
              I agree to the Terms and Conditions
            </label>
          </div>
          
          <button
            type="submit"
            className="bg-orange-500 text-white rounded-xl w-full font-bold py-3 px-4 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        
        <p className="text-black text-sm mt-4">
          Already have an account? <a href="/login" className="text-orange-400 font-medium hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
