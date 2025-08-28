import React, {useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-[#fdf6ec]">
        <div className='h-[90vh] flex items-center'> {/* section 1 */}
            <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-[#d4bfa1]">
                
                {/* Text Section */}
                <div className="md:w-1/2 w-full flex flex-col justify-center p-10 bg-gradient-to-br from-[#B7410E] via-[#bd5123] text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Discover the World of Books
                </h1>
                <p className="text-lg md:text-xl mb-6 text-[#fff6e5]">
                    Review your favorites, revisit the classics, and share your literary voice.
                </p>
                <NavLink to="/explore"> {/* Todo searchBook page */}
                    <button className="bg-[#E6B17E] text-[#5C4033] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#f3d5ae] transition">
                        Start Reviewing ✍️
                    </button>
                </NavLink>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 w-full bg-[#fefcf7] flex items-center justify-center p-6">
                <img
                    src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-student-sitting-at-desk-vector-png-image_11078292.png"
                    alt="Student at desk"
                    className="block md:flex max-w-full h-auto rounded-xl shadow-md"
                />
                </div>
            </div>
        </div>

        <div className='h-[90vh] flex items-center'> {/* section 2 */}
            {/* Section 2 */}
            <div className="w-full flex flex-col items-center justify-center bg-[#fffaf2] px-4 py-10 rounded-lg shadow-2xl">

            {/* Row 1: Image + Text */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl mb-10">
                {/* Image */}
                <div className="md:w-1/2 w-full p-4 flex justify-center">
                <img
                    src="https://api.time.com/wp-content/uploads/2023/12/Anticipated-Culture_BOOKS-2.png?w=1200&h=628&crop=1"
                    alt="Trending Books"
                    className="rounded-xl shadow-lg w-full max-w-md object-cover"
                />
                </div>

                {/* Text */}
                <div className="md:w-1/2 w-full p-4 text-center md:text-left">
                <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
                    View Trending Books 🔥
                </h2>
                <p className="text-[#6b4c3b] mb-6 text-lg">
                    Explore what others are reading, reviewing, and recommending in our Community Section.
                </p>
                <Link to="/explore">
                    <button className="bg-[#B7410E] text-white font-medium px-6 py-3 rounded-full shadow-md hover:bg-[#9a350d] transition">
                    Go to Explore
                    </button>
                </Link>
                </div>
            </div>

            {/* Row 2: Featured Categories */}
            <div className="w-full max-w-6xl mt-6">
                <h3 className="text-2xl font-semibold text-[#5C4033] text-center mb-6">Explore by Category</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
                {["Fiction", "Non-fiction", "Biography", "Self-help", "Psychology", "Comics", "Finance", "History"].map((category, index) => (
                    <div
                    key={index}
                    className="bg-[#fdf6ec] text-[#5C4033] rounded-xl shadow p-4 text-center hover:bg-[#f1e6d6] cursor-pointer transition"
                    >
                    <h4 className="text-lg font-medium">{category}</h4>
                    </div>
                ))}
                </div>
            </div>
            </div>

        </div>
        <div className='min-h-[90vh] w-full flex flex-col items-center justify-center'> {/* Section 3 */}
                <div className="flex flex-col md:flex-row items-center shadow-2xl justify-center w-full max-w-6xl my-10 rounded-lg  px-4 py-10 bg-[#fffaf2]">

                    {/* Text */}
                    <div className="md:w-1/2 w-full p-4 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-[#5C4033] mb-4">
                            Purchase Books
                        </h2>
                        <p className="text-[#6b4c3b] mb-6 text-lg">
                            Find and purchase your favorite books directly from our affiliated bookstore — all in one place.
                        </p>
                        <Link to="/store">
                            <button className="bg-[#B7410E] text-white font-medium px-6 py-3 rounded-full shadow-md hover:bg-[#9a350d] transition">
                            Book Store
                            </button>
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="md:w-1/2 w-full p-4 flex justify-center items-center">
                        <img
                            src="https://i0.wp.com/www.wscuc.org/wp-content/uploads/2021/06/online_library_blue.png?ssl=1"
                            alt="Trending Books"
                            className="rounded-xl shadow-lg w-full max-w-md object-cover"
                        />
                    </div>
                </div>
        </div>
    </main>
  );
}

export default Home;
