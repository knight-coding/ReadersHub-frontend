import React, { useEffect, useState } from 'react';
import BookList from '../Components/BookList';
import conf from '../conf/conf';

function Explore() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);
    const API = conf.backendUrl

    useEffect(() => {
        fetch(`${API}/store/all`)
            .then(res => res.json())
            .then(data => {
                setBooks(data);
                setFilteredBooks(data);
            })
            .catch(err => {
                console.error("Failed to fetch books:", err);
                setBooks([]);
                setFilteredBooks([]);
            });
    }, []);

    const handleSearch = () => {
        if (!searchTerm.trim()) {
          setFilteredBooks(books);
          return;
        }
        const term = searchTerm.toLowerCase();
        setFilteredBooks(
          books.filter(book =>
              book.title.toLowerCase().includes(term) ||
              (book.author && book.author.toLowerCase().includes(term)) ||
              (book.category && book.category.toLowerCase().includes(term))
          )
        );
    };

    return (
        <div className="p-4 min-h-[90vh] bg-[#f9f6f2]">
            <h1 className="text-2xl text-center font-semibold mb-6">Explore Books</h1>
            <div className="flex justify-center items-center mb-8 gap-2">
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Search by title, author, or category"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            {searchTerm.trim() === '' ? (
                <BookList title="All Books" books={filteredBooks} btntitle={"read"} />
            ) : filteredBooks.length === 0 ? (
                <div className="text-center text-[#B7410E] mt-8 text-lg font-semibold">
                    No books found matching your search.
                </div>
            ) : (
                <BookList title="All Books" books={filteredBooks} btntitle={"read"} />
            )}
        </div>
    );
}

export default Explore;