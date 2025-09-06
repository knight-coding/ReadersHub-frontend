import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import conf from '../conf/conf';

function BookCard({ id, image, title, btnTitle, source, onDelete }) {
  const [wishlist, setWishlist] = useState(false);
  const { role, loggedIn } = useContext(AuthContext);
  const API = conf.backendUrl;

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  };

  const handleWishlist = async () => {
    if (!loggedIn) {
      alert('Please login first to use wishlist.');
      return;
    }

    try {
      const res = await fetch(`${API}/books/wishlist/toggle/${id}`, {
        method: 'POST',
        headers: authHeaders,
      });

      if (res.ok) {
        const data = await res.json();
        setWishlist(data.isInWishlist);
      } else {
        console.error('Error in wishlist call:', await res.text());
      }
    } catch (error) {
      console.error('Network error in wishlist call:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API}/books/remove/${id}`, {
        method: 'DELETE',
        headers: authHeaders,
      });

      if (res.ok) {
        alert('Book deleted successfully!');
        if (onDelete) onDelete(id);
      } else {
        console.error('Error in delete call:', await res.text());
      }
    } catch (error) {
      console.error('Network error in delete call:', error);
    }
  };

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const res = await fetch(`${API}/books/wishlist/${id}`, {
          method: 'GET',
          headers: authHeaders,
        });

        if (res.ok) {
          const data = await res.json();
          setWishlist(data.isInWishlist);
        } else {
          console.error('Error in isInWishlist call:', await res.text());
        }
      } catch (error) {
        console.error('Network error in isInWishlist call:', error);
      }
    };

    if (loggedIn) {
      checkWishlist();
    }
  }, [id, loggedIn]);

  return (
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-xs bg-[#fffaf2] rounded-xl shadow-lg overflow-hidden relative m-3 flex flex-col">
      {/* Image with wishlist & delete buttons */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[150px] sm:h-[200px] md:h-[300px] object-fill rounded-t-xl"
        />

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          aria-label={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#B7410E] transition-transform"
        >
          {!wishlist ? (
            <img
              src="https://img.icons8.com/?size=100&id=16076&format=png&color=000000"
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

        {/* Delete button (Admin/Editor only) */}
        {(role.includes('Admin') || role.includes('Editor')) && (
          <button
            className="absolute top-[67px] right-3 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#B7410E]"
            onClick={handleDelete}
          >
            <img
              src="https://img.icons8.com/?size=100&id=67884&format=png&color=000000"
              alt="Delete book"
              className="w-4 sm:w-5 md:w-6 lg:w-7 h-5 sm:h-6 md:h-7 lg:h-8"
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3
          className="text-base sm:text-lg font-semibold text-[#5C4033] text-center mb-3 line-clamp-2"
          title={title}
        >
          {title}
        </h3>

        {btnTitle === 'Buy Now' ? (
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
