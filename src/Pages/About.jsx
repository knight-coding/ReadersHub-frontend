import React from 'react';

function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 min-h-[80vh]">
      <h1 className="text-4xl font-bold text-center text-[#5C4033] mb-6">About BookStore</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Welcome to <span className="font-semibold text-[#B7410E]">BookStore</span>! Your one-stop destination for discovering, exploring, and enjoying a wide variety of books. Whether you’re a student, a professional, or a passionate reader, our curated collection has something for everyone.
      </p>
      <div className="bg-[#f9f6f2] rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#B7410E] mb-2">Our Mission</h2>
        <p className="text-gray-800">
          We aim to make reading accessible and enjoyable for all. Our platform brings together trending titles, academic resources, self-help guides, and more, helping you find the perfect book for every moment.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-semibold text-[#5C4033] mb-2">Why Choose Us?</h3>
          <ul className="list-disc list-inside text-gray-700">
            <li>Wide range of categories</li>
            <li>Easy search and navigation</li>
            <li>Curated recommendations</li>
            <li>Friendly user experience</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-semibold text-[#5C4033] mb-2">Contact Us</h3>
          <p className="text-gray-700">
            Have questions or suggestions? Reach out at <a href="mailto:info@bookstore.com" className="text-blue-700 underline">info@bookstore.com</a>
          </p>
        </div>
      </div>
      <div className="text-center mt-10 text-gray-500">
        &copy; {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </div>
  );
}
export default About
