import React, {useState, useEffect, useContext} from 'react'
import BookCard from '../Components/BookCard'
import { AuthContext } from '../Context/AuthContext';
import Logout from '../Components/Logout'
import { useNavigate } from 'react-router-dom';
import conf from '../conf/conf';

function Account() {
  const [booksId, setBooksId] = useState([]);
  const { logout, user, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const API = conf.backendUrl;

  useEffect(() => {
    if (!loggedIn) {
      navigate("/home");
    }
  }, [loggedIn]);

  useEffect(() => {
      if (!user) return;
      const getWishlist = async () => {
        try {
          const res = await fetch(`${API}/books/wishlist/mywishlist`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
  
          if (res.ok) {
            const data = await res.json();
            setBooksId(data.wishlist)
          } else {
            console.error('Error in myWishlistt call:', await res.text());
          }
        } catch (error) {
          console.error('Network error in myWishlist call:', error);
        }
      };
  
      getWishlist();
    }, [user]);  // add id as dependency if it changes

  return (
    <div className='min-h-[90vh] w-full bg-[#f9f6f2]'>
      <div className='flex flex-col items-center w-full'> {/* Top */}
        <img 
          src="https://static.vecteezy.com/system/resources/previews/021/079/672/original/user-account-icon-for-your-design-only-free-png.png" alt=""
          className='w-44 mb-1'
        />
        <div className='flex gap-2'> {/* Buttons */}
          <button className='border-black bg-blue-600 hover:bg-blue-400 text-white text-md rounded-lg px-3 py-2'>
            View Details
          </button>
          <Logout/>
        </div>
      </div>
      <div className='mt-10'>
        <div>
          <p className='text-3xl font-bold underline underline-offset-8 text-center text-blue-900'>Your Wishlist</p>
        </div>
        <div className='mt-10'>
          { booksId && booksId.length > 0 ?
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 shadow-black'>
              {booksId.map((book) => {
                return (
                  <BookCard 
                    btnTitle={"Read"}
                    key={book._id}
                    id={book._id}
                    image={book.coverImage}
                    title={book.title}
                    source={book.source}
                  />
                )
              })}
            </div>
            :
            <p className='text-center text-lg'>No favorites added yet....</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Account
