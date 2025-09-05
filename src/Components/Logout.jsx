import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import conf from '../conf/conf';

export default function Account() {
  const { setLoggedIn, setUser, setRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const API = conf.backendUrl

  const logout = async () => {
    try {
      const res = await fetch(`${API}/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      
      if (res.ok) {
        localStorage.removeItem('accessToken');
        setLoggedIn(false);
        setUser(null);
        setRole([]);
        navigate('/');
      } else {
        console.error('Error in logout call:', await res.text());
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button 
      className='border-black bg-blue-600 hover:bg-blue-400 text-white text-md rounded-lg px-3 py-2'
      onClick={logout}
    >
      Log Out
    </button>
  );
}
