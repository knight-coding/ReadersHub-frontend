import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { loggedIn, role } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {}, [role]);

  return (
    <header className="shadow z-50 fixed top-0 left-0 w-full bg-[#fffaf2]">
      <nav className="border-gray-200 px-4 md:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4212/4212474.png"
              className="mr-3 w-14 rounded-3xl"
              alt="Logo"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <NavLink to="/store">Store</NavLink>
            {Array.isArray(role) &&
              (role.includes("Admin") || role.includes("Editor")) && (
                <NavLink to="/addBook">AddBook</NavLink>
              )}
            <NavLink to="/about">About</NavLink>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex md:items-center">
            {!loggedIn ? (
              <>
                <Link to="/login" className="px-4 py-2">
                  Log in
                </Link>
                <Link
                  to="/signin"
                  className="px-4 py-2 bg-blue-800 text-white rounded-lg"
                >
                  Get started
                </Link>
              </>
            ) : (
              <Link to="/account">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/021/079/672/original/user-account-icon-for-your-design-only-free-png.png"
                  alt="User"
                  className="rounded-2xl w-14"
                />
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex items-center p-2 text-gray-500 rounded-lg md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 px-4 pb-4 space-y-3">
            <NavLink
              to="/home"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Home
            </NavLink>
            <NavLink
              to="/explore"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Explore
            </NavLink>
            <NavLink
              to="/store"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              Store
            </NavLink>
            {Array.isArray(role) &&
              (role.includes("Admin") || role.includes("Editor")) && (
                <NavLink
                  to="/addBook"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  AddBook
                </NavLink>
              )}
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              About
            </NavLink>

            {/* Auth Buttons in Mobile */}
            {!loggedIn ? (
              <div className="flex flex-col space-y-2 mt-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  Log in
                </Link>
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 bg-blue-800 text-white rounded-lg text-center"
                >
                  Get started
                </Link>
              </div>
            ) : (
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="flex items-center px-4 py-2"
              >
                <img
                  src="https://static.vecteezy.com/system/resources/previews/021/079/672/original/user-account-icon-for-your-design-only-free-png.png"
                  className="rounded-2xl w-10"
                  alt="User"
                />
                <span className="ml-2">Account</span>
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
