import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Navbar = ({ textColor = "text-white" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Start with null to indicate loading state
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const loginBgColor =
    textColor === "text-blue-800" ? "bg-blue-800" : "bg-white";
  const loginTextColor =
    textColor === "text-blue-800" ? "text-white" : "text-blue-800";
  const loginHoverColor =
    textColor === "text-blue-800" ? "hover:bg-blue-400" : "hover:bg-gray-300";

  return (
    <div className={textColor}>
      <nav className="flex items-center justify-between p-4">
        <div className={`text-xl font-bold ${textColor}`}>PMIAcademy</div>

        {/* Centered navigation items on larger screens */}
        <div
          className={`hidden md:flex justify-center flex-grow space-x-8 ml-4 ${textColor}`}
        >
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/courses" className="hover:text-blue-200">
            Courses
          </Link>
          <Link to="/simulator" className="hover:text-blue-200">
            Simulator
          </Link>
          <Link to="/pmi" className="hover:text-blue-200">
            PMI
          </Link>
          <Link to="/about" className="hover:text-blue-200">
            About Us
          </Link>
        </div>

        {/* Conditional buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated === null ? null : isAuthenticated ? (
            <Link to="/dashboard">
              <div
                className={`w-24 ${textColor} rounded-full px-2 py-1.5 hover:underline hover:scale-105 cursor-pointer text-center`}
              >
                Dashboard
              </div>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <div
                  className={`w-24 ${loginBgColor} ${loginTextColor} rounded-full px-2 py-1.5 ${loginHoverColor} cursor-pointer text-center`}
                >
                  Login
                </div>
              </Link>
              <Link to="/register">
                <div className="w-24 bg-blue-800 text-white rounded-full px-2 py-1.5 hover:bg-blue-500 cursor-pointer text-center">
                  Sign Up
                </div>
              </Link>
            </>
          )}
          <ShoppingCartIcon className={textColor} />
        </div>

        {/* Hamburger menu and Cart icon for small screens */}
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? (
              <CloseIcon className={textColor} />
            ) : (
              <MenuIcon className={textColor} />
            )}
          </button>
          <ShoppingCartIcon className={textColor} />
        </div>
      </nav>

      {/* Separate div for mobile menu */}
      {isOpen && (
        <div
          className={`md:hidden bg-gradient-to-b from-[#152354] via-[#1B2D6B] to-[#2F4DBA] p-4 ${textColor}`}
        >
          <Link to="/" className="block py-2 hover:text-blue-200">
            Home
          </Link>
          <Link to="/courses" className="block py-2 hover:text-blue-200">
            Courses
          </Link>
          <Link to="/simulator" className="block py-2 hover:text-blue-200">
            Simulator
          </Link>
          <Link to="/pmi" className="block py-2 hover:text-blue-200">
            PMI
          </Link>
          <Link to="/about" className="block py-2 hover:text-blue-200">
            About Us
          </Link>
          {isAuthenticated === null ? null : isAuthenticated ? (
            <Link to="/dashboard">
              <button className="block w-full text-left bg-white text-blue-500 px-4 py-2 rounded-full mt-2 hover:bg-blue-100">
                Dashboard
              </button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <button className="block w-full text-left bg-white text-blue-500 px-4 py-2 rounded-full mt-2 hover:bg-blue-100">
                  Sign Up
                </button>
              </Link>
              <Link to="/login">
                <button className="block w-full text-left bg-white text-blue-500 px-4 py-2 rounded-full mt-2 hover:bg-blue-100">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
