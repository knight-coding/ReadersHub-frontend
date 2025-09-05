import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import conf from '../conf/conf';

function AddBook() {
  const Navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    genre: [],  // array of selected categories
    source: '',
    image: '',
    description: ''
  });

  const [message, setMessage] = useState('');
  const API = conf.backendUrl

  // Predefined categories
  const categories = [
    'Self-Help',
    'Psychology',
    'Fiction',
    'Biography',
    'Science',
    'History',
    'Philosophy',
    'Technology',
    'Health',
    'Business',
    'Finance'
  ];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add category from predefined list
  const addCategory = (cat) => {
    if (!form.genre.includes(cat)) {
      setForm(prev => ({ ...prev, genre: [...prev.genre, cat] }));
    }
  };

  // Remove selected category
  const removeCategory = (cat) => {
    setForm(prev => ({
      ...prev,
      genre: prev.genre.filter(c => c !== cat)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (form.genre.length === 0) {
      setMessage('Please select at least one category.');
      return;
    }

    const payload = {
      title: form.title,
      author: form.author,
      genre: form.genre,
      source: form.source,
      coverImage: form.image,
      description: form.description
    };

    try {
      const res = await fetch(`${API}/books/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessage(errorData.message || 'Failed to add book.');
      } else {
        setMessage('Book added successfully!');
        setForm({ title: '', author: '', genre: [], source: '', image: '', description: '' });
        Navigate('/explore');
      }
    } catch {
      setMessage('Error adding book.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6f2] flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold text-[#5C4033] mb-8">Add a New Book</h1>
      <form
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit}
      >

        {/* Title */}
        <div>
          <label className="block text-[#B7410E] font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Book Title"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-[#B7410E] font-semibold mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Author Name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-[#B7410E] font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Book Description"
            rows={4}
          />
        </div>

        {/* Source */}
        <div>
          <label className="block text-[#B7410E] font-semibold mb-1">Source (URL)</label>
          <input
            type="url"
            name="source"
            value={form.source}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Book Source URL"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-[#B7410E] font-semibold mb-1">Image (URL)</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Book Cover Image URL"
          />
        </div>
        {/* Other inputs unchanged */}

        <div>
          <label className="block text-[#B7410E] font-semibold mb-1">Select Categories</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => addCategory(cat)}
                disabled={form.genre.includes(cat)}
                className={`px-3 py-1 rounded-full border ${
                  form.genre.includes(cat)
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Show selected categories as tags */}
          <div className="flex flex-wrap gap-2">
            {form.genre.map(cat => (
              <div
                key={cat}
                className="flex items-center bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{cat}</span>
                <button
                  type="button"
                  onClick={() => removeCategory(cat)}
                  className="ml-2 font-bold hover:text-red-600"
                  aria-label={`Remove ${cat}`}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Add Book
        </button>

        {message && (
          <div className="text-center text-[#B7410E] font-semibold mt-2">{message}</div>
        )}
      </form>
    </div>
  );
}

export default AddBook;
