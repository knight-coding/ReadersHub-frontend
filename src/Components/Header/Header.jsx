import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Header() {
  const { loggedIn, role } = useContext(AuthContext);
  useEffect(() => {

  }, [role, loggedIn])

  return (
    <header className="shadow z-50 top-0">
      <nav className="bg-[#fffaf2] border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4212/4212474.png"
              className="mr-3 w-14 rounded-3xl"
              alt="Logo"
            />
          </Link>

          {!loggedIn ? (
            <div className="flex items-center lg:order-2">
              <Link
                to="/login"
                className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
              <Link
                to="/signin"
                className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Get started
              </Link>
            </div>
          ) : (
            <div className="flex items-center lg:order-2">
              <Link to="/account" className="flex items-center">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/021/079/672/original/user-account-icon-for-your-design-only-free-png.png"
                  alt="User"
                  className="rounded-2xl w-14"
                />
              </Link>
            </div>
          )}

          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-700 lg:p-0`
                  }
                >
                  Explore
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/store"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-700 lg:p-0`
                  }
                >
                  Store
                </NavLink>
              </li>

              {(Array.isArray(role) && (role.includes("Admin") || role.includes("Editor"))) && (
                <li>
                  <NavLink
                    to="/addBook"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-blue-700" : "text-gray-700"
                      } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-700 lg:p-0`
                    }
                  >
                    AddBook
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-blue-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-cyan-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
