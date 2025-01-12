import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaEnvelope, FaCog } from "react-icons/fa";

const Downbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t flex justify-around items-center py-2">
      {/* Home */}
      <Link
        to="/dashboard"
        className="flex flex-col items-center text-primary hover:text-secondary"
      >
        <FaHome size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      {/* Profile */}
      <Link
        to="/profile"
        className="flex flex-col items-center text-primary hover:text-secondary"
      >
        <FaUser size={24} />
        <span className="text-xs mt-1">Profile</span>
      </Link>
      {/* Messages */}
      <Link
        to="/form"
        className="flex flex-col items-center text-primary hover:text-secondary"
      >
        <FaEnvelope size={24} />
        <span className="text-xs mt-1">From</span>
      </Link>
      {/* Settings */}
      <Link
        to="/settings"
        className="flex flex-col items-center text-primary hover:text-secondary"
      >
        <FaCog size={24} />
        <span className="text-xs mt-1">Settings</span>
      </Link>
    </div>
  );
};

export default Downbar;
