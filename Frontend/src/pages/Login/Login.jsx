import "./Login.css";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(formData);

      const destination = location.state?.from || "/";

      navigate(destination, { replace: true });
    } catch (error) {
      setError(error.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="library-auth-page">
      {/* Decorative background */}
      <div className="auth-decoration auth-decoration-one"></div>
      <div className="auth-decoration auth-decoration-two"></div>

      <div className="library-auth-container">
        {/* LEFT SIDE */}
        <section className="auth-introduction">
          <Link to="/" className="library-brand">
            <div className="brand-icon">
              <FaBookOpen />
            </div>

            <div>
              <h2>Amal Library</h2>
              <span>Read · Learn · Grow</span>
            </div>
          </Link>

          <div className="auth-intro-content">
            <span className="intro-small-title">
              YOUR DIGITAL READING SPACE
            </span>

            <h1>
              Welcome
              <br />
              <span>Back.</span>
            </h1>

            <p>
              Continue your reading journey and discover a world
              of knowledge, stories, and ideas.
            </p>

            <div className="library-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">
                  <FaBookOpen />
                </span>

                <div>
                  <strong>Explore Books</strong>
                  <p>Discover books across different categories.</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">♡</span>

                <div>
                  <strong>Save Your Favorites</strong>
                  <p>Keep your favorite books close to you.</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">✦</span>

                <div>
                  <strong>Build Your Library</strong>
                  <p>Create your own personalized reading space.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-quote">
            <span className="quote-mark">“</span>

            <p>
              A room without books is like a body without a soul.
            </p>

            <span className="quote-author">— Cicero</span>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="auth-form-section">
          <div className="auth-card">
            <div className="auth-card-header">
              <div className="auth-card-icon">
                <FaBookOpen />
              </div>

              <span className="auth-welcome">
                WELCOME BACK
              </span>

              <h2>Sign in to your library</h2>

              <p>
                Enter your details to continue reading.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Username / Email */}
              <div className="auth-field">
                <label htmlFor="identifier">
                  Username or Email
                </label>

                <div className="auth-input-wrapper">
                  <FaUser className="auth-input-icon" />

                  <input
                    id="identifier"
                    type="text"
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleChange}
                    placeholder="Enter your username or email"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      alert("Password recovery will be added later.")
                    }
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="auth-input-wrapper">
                  <FaLock className="auth-input-icon" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="remember-row">
                <label className="remember-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Login button */}
              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Signing in...
                  </>
                ) : (
                  <>
                    Enter Library
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            {/* Google placeholder */}
            <button
              type="button"
              className="google-button"
              onClick={() =>
                alert("Google login will be added later.")
              }
            >
              <span className="google-letter">G</span>
              Continue with Google
            </button>

            <div className="auth-bottom-text">
              <span>Don't have an account?</span>

              <Link to="/register">
                Create one
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;