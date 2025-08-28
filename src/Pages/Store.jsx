import React from 'react';
import BookList from '../Components/BookList';

function StorePage() {
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

  return (
    <div className="bg-[#f9f6f2] min-h-screen py-10">
      <h1 className="text-4xl font-bold text-center text-[#5C4033] mb-12">
        Explore Our Bookstore 📚
      </h1>

      {categories.map((cat) => (
        <BookList key={cat} category={cat} btnTitle={"Buy Now"} />
      ))}
    </div>
  );
}

export default StorePage;
