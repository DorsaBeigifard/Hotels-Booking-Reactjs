import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center text-gray-400 text-sm py-2">
      &copy; 2025 | This template was made by{" "}
      <Link
        to={"https://github.com/DorsaBeigifard"}
        className="text-white hover:text-gray-300 transition-all"
      >
        Dorsa Beigifard
      </Link>
    </footer>
  );
};

export default Footer;
