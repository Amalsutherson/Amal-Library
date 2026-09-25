import "./navbar.css";

import { Link, useLocation } from "react-router-dom";
import {
  FaBookOpen,
  FaBars,
  FaTimes,
  FaSearch,
  FaUser,
} from "react-icons/fa";

import { useState } from "react";

function Navbar() {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="navbar">

      {/* =========================================
          LOGO
      ========================================= */}

      <Link
        to="/"
        className="navbar-logo"
        onClick={closeMobileMenu}
      >
        <div className="navbar-logo-icon">
          <FaBookOpen />
        </div>

        <div className="navbar-logo-text">
          <strong>Amal</strong>
          <span>Open Library</span>
        </div>
      </Link>


      {/* =========================================
          DESKTOP MENU
      ========================================= */}

      <nav className="navbar-menu">

        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "navbar-link active"
              : "navbar-link"
          }
        >
          Home
        </Link>

        <Link
          to="/library"
          className={
            location.pathname.startsWith("/library")
              ? "navbar-link active"
              : "navbar-link"
          }
        >
          Library
        </Link>

        <Link
          to="/categories"
          className={
            location.pathname.startsWith("/categories")
              ? "navbar-link active"
              : "navbar-link"
          }
        >
          Categories
        </Link>

        <Link
          to="/about"
          className={
            location.pathname.startsWith("/about")
              ? "navbar-link active"
              : "navbar-link"
          }
        >
          About
        </Link>

      </nav>


      {/* =========================================
          RIGHT ACTIONS
      ========================================= */}

      <div className="navbar-actions">

        <Link
          to="/library"
          className="navbar-search-button"
          title="Search Library"
        >
          <FaSearch />
        </Link>

        <Link
          to="/login"
          className="navbar-login"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="navbar-register"
        >
          Create Account
        </Link>

      </div>


      {/* =========================================
          MOBILE BUTTON
      ========================================= */}

      <button
        type="button"
        className="navbar-mobile-button"
        onClick={() =>
          setMobileMenuOpen(!mobileMenuOpen)
        }
        aria-label="Toggle navigation"
      >
        {mobileMenuOpen ? (
          <FaTimes />
        ) : (
          <FaBars />
        )}
      </button>


      {/* =========================================
          MOBILE MENU
      ========================================= */}

      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">

          <Link
            to="/"
            onClick={closeMobileMenu}
            className={
              location.pathname === "/"
                ? "mobile-link active"
                : "mobile-link"
            }
          >
            Home
          </Link>

          <Link
            to="/library"
            onClick={closeMobileMenu}
            className="mobile-link"
          >
            Library
          </Link>

          <Link
            to="/categories"
            onClick={closeMobileMenu}
            className="mobile-link"
          >
            Categories
          </Link>

          <Link
            to="/about"
            onClick={closeMobileMenu}
            className="mobile-link"
          >
            About
          </Link>

          <div className="mobile-divider"></div>

          <Link
            to="/login"
            onClick={closeMobileMenu}
            className="mobile-login"
          >
            <FaUser />
            Login
          </Link>

          <Link
            to="/register"
            onClick={closeMobileMenu}
            className="mobile-register"
          >
            Create Account
          </Link>

        </div>
      )}

    </header>
  );
}

export default Navbar;