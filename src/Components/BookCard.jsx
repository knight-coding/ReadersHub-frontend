import React, { useEffect, useState } from 'react';
import read from '../Pages/ReadBook';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

function BookCard({ id, image, title, btnTitle, source }) {
  const [wishlist, setWishlist] = useState(false);
  const {role} = useContext(AuthContext);

  const handleWishlist = async  () => {
    try {
      const res = await fetch(`http://localhost:4000/books/wishlist/toggle/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if(data.isInWishlist === true){
          setWishlist(true);
        }else{
          setWishlist(false);
        }
      } else {
        alert('Login first');
        console.error('Error in BookCard wishlist call:', await res.text());
      }
    } catch (error) {
      console.error('Network error in wishlist call:', error);
    }
  };

  const handleDelete = async  () => {
    try {
      const res = await fetch(`http://localhost:4000/books/remove/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      if (res.ok) {
        alert("Book deleted successfully!");
      }
      else {
        console.error('Error in BookCard wishlist call:', await res.text());
      }
    } catch (error) {
      console.error('Network error in wishlist call:', error);
    }
  };

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await fetch(`http://localhost:4000/books/wishlist/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setWishlist(data.isInWishlist === true);
        } else {
          console.error('Error in BookCard wishlist call:', await res.text());
        }
      } catch (error) {
        console.error('Network error in isInWishlist call:', error);
      }
    };

    checkWishlist();
  }, [id]);  // add id as dependency if it changes



  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-xs bg-[#fffaf2] rounded-xl shadow-lg overflow-hidden relative m-3 flex flex-col">
      {/* Image with wishlist icon */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[150px] sm:h-[200px] md:h-[300px] object-fill rounded-t-xl"
        />
        {/* Wishlist icon with tooltip */}
        <button
          onClick={handleWishlist}
          aria-label={wishlist ? "Remove from wishlist" : "Add to wishlist"}
          title={wishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#B7410E] transition-transform"
        >
          {!wishlist ? (
            <img
              src="https://icon-library.com/images/wishlist-icon/wishlist-icon-19.jpg"
              alt="Add to wishlist"
              className="w-4 sm:w-5 md:w-6 lg:w-7 h-5 sm:h-6 md:h-7 lg:h-8"
            />
          ) : (
            <img
              src="https://cdn3.iconfinder.com/data/icons/e-commerce-8/91/favorite-512.png"
              alt="Remove from wishlist"
              className="w-4 sm:w-5 md:w-6 lg:w-7 h-5 sm:h-6 md:h-7 lg:h-8"
            />
          )}
        </button>
        {(role.includes('Admin') || role.includes('Editor')) ? 
          <button
            className='absolute top-[67px] right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#B7410E]'
            onClick={handleDelete}
          >
            <img
              src="https://img.icons8.com/?size=100&id=67884&format=png&color=000000"
              alt="Add to wishlist"
              className="w-4 sm:w-5 md:w-6 lg:w-7 h-5 sm:h-6 md:h-7 lg:h-8"
            />
          </button>
        :
          null
        }
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3
          className="text-base sm:text-lg font-semibold text-[#5C4033] text-center mb-3 line-clamp-2"
          title={title}
        >
          {title}
        </h3>

        {btnTitle === "Buy Now" ? (
          <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-[#B7410E] text-white px-5 py-2 rounded-full hover:bg-[#9a350d] transition font-semibold text-sm sm:text-base"
          >
            Buy Now
          </a>
        ) : (
          <Link
          to="/read"
          className="block w-full bg-[#B7410E] text-white px-5 py-2 text-center rounded-full hover:bg-[#9a350d] transition font-semibold text-sm sm:text-base"
          state={{ bookId: id, bookTitle: title }}
          aria-label="Read Book"
          >
            Read
          </Link>
        )}
      </div>
    </div>
  );
}

export default BookCard;
