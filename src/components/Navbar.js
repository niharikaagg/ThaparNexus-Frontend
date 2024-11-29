import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="bg-red-900 w-full h-16 flex items-center justify-between px-4 md:px-24">
        <div className="text-2xl md:text-5xl text-white">ThaparNexus</div>

        {/* Hamburger menu for mobile */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>

        {/* Desktop Menu */}
        <div
          className={`md:flex items-center ${
            isOpen ? "block" : "hidden"
          } w-full md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-10 text-white text-lg md:text-3xl mt-4 md:mt-0">
            <li className="text-center">
              <Link to="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>

            <li className="text-center">
              <Link to="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>

            <li className="text-center">
              <Link to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
