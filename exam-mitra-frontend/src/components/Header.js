import React from "react";
import "../CSS/Header.css";
import "../CSS/Home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { account } from "../Database/appwriteConfig";
import { useUser } from "../context/userContext";

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  // Logout handler: deletes all sessions, sets manualLogout flag and resets user context
  const handleLogout = async () => {
    await account.deleteSessions(); // logs out user from Appwrite
    localStorage.setItem("manualLogout", "true");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo Image */}
      <img src="/images/final logo.jpg" alt="Logo" className="logo" />

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/upload">Upload New</Link>
        </li>
        {/* Show Dashboard link only if user is logged in */}
        {user && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>

      {/* Login/Logout Buttons */}
      <div className="nav-buttons">
        {user ? (
          <>
            <span className="username">👤 {user.name}</span>
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="btn-secondary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button className="btn-primary" onClick={() => navigate("/login")}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
