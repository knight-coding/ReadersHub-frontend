import React from "react";
import { Link, NavLink } from "react-router-dom";

function Home() {
  return (
    <main className="bg-[#fdf6ec]">
      {/* SECTION 1: Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 py-10">
        <div className="flex flex-col md:flex-row w-full max-w-6xl rounded-2xl overflow-hidden shadow-2xl border border-[#d4bfa1]">
          
          {/* Text */}
          <div className="md:w-1/2 w-full flex flex-col justify-center p-8 md:p-12 bg-gradient-to-br from-[#B7410E] via-[#bd5123] text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover the World of Books
            </h1>
            <p className="text-lg md:text-xl mb-6 text-[#fff6e5]">
              Review your favorites, revisit the classics, and share your literary voice.
            </p>
            <NavLink to="/explore">
              <button className="bg-[#E6B17E] text-[#5C4033] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-[#f3d5ae] transition">
                Start Reviewing ✍️
              </button>
            </NavLink>
          </div>

          {/* Image */}
          <div className="md:w-1/2 w-full bg-[#fefcf7] flex items-center justify-center p-6">
            <img
              src="https://png.pngtree.com/png-clipart/20230913/original/pngtree-student-sitting-at-desk-vector-png-image_11078292.png"
              alt="Student at desk"
              className="max-w-full h-auto rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: Trending Books */}
      <section className="py-16 px-6 bg-[#fffaf2]">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Row 1 */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full rounded-xl shadow-2xl overflow-hidden mb-12">
            
            {/* Image */}
            <div className="md:w-1/2 w-full p-6 flex justify-center bg-[#fdf6ec]">
              <img
                src="https://api.time.com/wp-content/uploads/2023/12/Anticipated-Culture_BOOKS-2.png?w=1200&h=628&crop=1"
                alt="Trending Books"
                className="rounded-xl shadow-lg w-full max-w-md object-cover"
              />
            </div>

            {/* Text */}
            <div className="md:w-1/2 w-full p-8 text-center md:text-left">
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

          {/* Row 2: Categories */}
          <div className="w-full">
            <h3 className="text-2xl font-semibold text-[#5C4033] text-center mb-6">
              Explore by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Fiction",
                "Non-fiction",
                "Biography",
                "Self-help",
                "Psychology",
                "Comics",
                "Finance",
                "History",
              ].map((category, index) => (
                <div
                  key={index}
                  className="bg-[#fdf6ec] text-[#5C4033] rounded-xl shadow p-6 text-center hover:bg-[#f1e6d6] cursor-pointer transition"
                >
                  <h4 className="text-lg font-medium">{category}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Store */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center rounded-xl shadow-2xl bg-[#fffaf2] overflow-hidden">
          
          {/* Text */}
          <div className="md:w-1/2 w-full p-8 text-center md:text-left">
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
          <div className="md:w-1/2 w-full p-6 flex justify-center bg-[#fdf6ec]">
            <img
              src="https://i0.wp.com/www.wscuc.org/wp-content/uploads/2021/06/online_library_blue.png?ssl=1"
              alt="Book Store"
              className="rounded-xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
