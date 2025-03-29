import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { IoBookmark } from "react-icons/io5";
import { TiHeart } from "react-icons/ti";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    navigate("/bookmarks");
  };
  return (
    <div className="z-10 py-1  border border-b-1 border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo-no-background.png"
            alt="logo"
            className="h-8"
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkClick}
              className="text-xl text-yellow-500 cursor-pointer transition-transform transform hover:scale-125"
            >
              <IoBookmark />
            </button>
            <button className="text-xl text-red-700 cursor-pointer transition-transform transform hover:scale-125">
              <TiHeart />
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          <RenderNavLinks setIsOpen={setIsOpen} />

          <button className="btn btn--primary">Login</button>
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden flex items-center gap-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>
          <button className="btn btn--primary">Login</button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`sm:hidden flex flex-col items-center bg-white overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <RenderNavLinks setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Navbar;

function RenderNavLinks({ setIsOpen }) {
  const navLinks = [
    { text: "Home", path: "/" },
    { text: "About Us", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];
  return navLinks.map(({ text, path }) => (
    <NavLink
      key={path}
      to={path}
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        `lg:text-sm nav-link ${isActive ? "nav-link-active" : ""}`
      }
    >
      {text}
    </NavLink>
  ));
}
