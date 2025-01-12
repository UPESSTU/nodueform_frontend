import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Upes_logo from "../assets/UPES-logo.svg";
import Downbar from "./Downbar";

const Base = ({ children, title }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
      <div className="bg-background min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white  shadow-md p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/">
              <img src={Upes_logo} alt="UPES Logo" className="w-24 h-auto" />
            </Link>
            <h1 className="text-black text-2xl font-semibold">{title}</h1>
            <button className="text-primary md:hidden" onClick={toggleNavbar}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
            <nav
              className={`${
                isOpen ? "block" : "hidden"
              } absolute top-16 left-0 w-full bg-white shadow-md md:relative md:top-0 md:w-auto md:flex md:items-center`}
            >
              <Link
                to="/"
                className="block mt-4 md:inline-block md:mt-0 md:ml-6"
              >
                Home
              </Link>
              <Link
                to="/form"
                className="block mt-4 md:inline-block md:mt-0 md:ml-6"
              >
                Form
              </Link>
              <Link
                to="/contact"
                className="block mt-4 md:inline-block md:mt-0 md:ml-6"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto flex-grow ">{children}</main>

        <Downbar/>

        {/* Footer */}
        <footer className="bg-white shadow-md p-4">
          <div className="container mx-auto text-center">
            <p>&copy; 2021 UPES</p>
          </div>
        </footer>
      </div>
    );
};

Base.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default Base;
