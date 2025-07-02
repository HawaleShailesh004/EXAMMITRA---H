import React, { useState } from "react";
import "../CSS/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../Database/appwriteConfig";
import { useUser } from "../context/userContext";

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await account.deleteSessions("current");
    localStorage.setItem("manualLogout", "true");
    setUser(null);
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <img src="/images/final logo.jpg" alt="Logo" className="logo" />

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      {/* Menu Content */}
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/">Home</Link>
          </li>
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/upload">Upload New</Link>
          </li>
          {user && (
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}
        </ul>

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
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Login
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
