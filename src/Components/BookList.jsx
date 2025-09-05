import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard.jsx';
import conf from '../conf/conf.js';

function BookList({ category, books: booksProp, btnTitle, title }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = conf.backendUrl  

  useEffect(() => {
    // console.log('useEffect triggered for category:', category);
    if (booksProp) {
      setBooks(booksProp);
      setLoading(false);
    } else if (category) {
      setLoading(true);
      // console.log(`Fetching books for category: ${category}`);
        axios.get(`${API}/store/category/${encodeURIComponent(category)}`)
        .then(res => {
          setBooks(res.data.books || []);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [category, booksProp]);

  return (
    <section className="mb-12 px-4">
      {loading ? (
        <>
          <h2 className="text-2xl font-bold text-[#B7410E] mb-4">{title || category || "Books"}</h2>
          <p className="text-gray-500">Loading...</p>
        </>
      ) : books.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-[#B7410E] mb-4">{title || category || "Books"}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {books.map((book) => {
              return (
                <BookCard
                  key={book._id}
                  id={book._id}
                  image={book.coverImage}
                  title={book.title}
                  btnTitle={btnTitle}
                  source={book.source}
                />
              );
            })}
          </div>
        </>
      ) : null}
    </section>
  );
}

export default BookList;
