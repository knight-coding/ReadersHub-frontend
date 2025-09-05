import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import conf from '../conf/conf';

const LoginPage = () => {
  const Navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {setLoggedIn, setUser, setRole  } = useContext(AuthContext);
  const API = conf.backendUrl

  const validateLogin = (e) => {
    e.preventDefault();
    
    // Reset errors
    setEmailError('');
    setPasswordError('');

    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      axios.post(`${API}/auth`, { email, password })
        .then(res => {
          // console.log("Login successful", res.data);
          // Save token in localStorage
          localStorage.setItem("accessToken", res.data.accessToken);
          setLoggedIn(true);
          Navigate('/')
        })
        .catch(err => {
          console.error(err.response?.data || err.message);
          alert(err.response?.data?.message || "Login failed");
        }
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-[#fffaf2] justify-center relative overflow-hidden w-full">
      <div 
        className="absolute inset-0 bg-cove bg-center z-0 w-full h-full"
        style={{
          filter: 'brightness(0.8)'
        }}
      ></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" backdrop-blur-sm border bg-white border-white/20  rounded-xl p-2 sm:p-8 w-full max-w-md mx-2 shadow-2xl shadow-black/50 z-10"
      >
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-black mb-2"
          >
            Welcome Back
          </motion.h2>
          <p className="text-black-300">Sign in to your account</p>
        </div>

        <form onSubmit={validateLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-white/10 border border-gray-500 border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="mt-1 text-sm text-red-400">{emailError}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-black-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 border-gray-500 py-3 bg-white/10 border border-white/20 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="mt-1 text-sm text-red-400">{passwordError}</p>}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-white/20 rounded bg-white/10"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-black-300">
                Remember me
              </label>
            </div>

            <a href="#" className="text-sm text-orange-400 hover:text-orange-300 hover:underline transition-colors">
              Forgot password?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-black py-3 px-4 rounded-lg font-medium shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
          >
            Sign In
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <a href="/signin" className="text-orange-400 hover:text-orange-300 font-medium hover:underline transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;