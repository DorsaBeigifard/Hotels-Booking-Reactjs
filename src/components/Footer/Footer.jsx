import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 ">
      <div className="flex justify-center gap-6">
        <FaFacebook className="footer-btn hover:text-blue-600 transition-all" />
        <FaTwitter className="footer-btn hover:text-blue-400 transition-all" />
        <FaInstagram className="footer-btn hover:text-pink-500 transition-all" />
      </div>

      <div className="mt-5 text-center text-gray-400 text-sm">
        &copy; 2025 Your Company. All rights reserved. <br /> This template was
        made by{" "}
        <Link
          to={"https://github.com/DorsaBeigifard"}
          className="text-white hover:text-gray-300 transition-all"
        >
          Dorsa Beigifard
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
