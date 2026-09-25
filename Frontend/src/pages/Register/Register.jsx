import "../Login/Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

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

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register(formData);

      navigate("/", { replace: true });
    } catch (error) {
      setError(error.message || "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="library-auth-page">
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
              START YOUR READING JOURNEY
            </span>

            <h1>
              Join Our
              <br />
              <span>Library.</span>
            </h1>

            <p>
              Create your free account and open the door to
              thousands of pages filled with knowledge and
              imagination.
            </p>

            <div className="library-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">
                  <FaBookOpen />
                </span>

                <div>
                  <strong>Discover New Books</strong>
                  <p>
                    Explore books from different categories.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">♡</span>

                <div>
                  <strong>Save Your Favorites</strong>
                  <p>
                    Keep the books you love in one place.
                  </p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">✦</span>

                <div>
                  <strong>Personal Reading Space</strong>
                  <p>
                    Build your own digital library.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-quote">
            <span className="quote-mark">“</span>

            <p>
              The more that you read, the more things you will know.
            </p>

            <span className="quote-author">— Dr. Seuss</span>
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
                BECOME A MEMBER
              </span>

              <h2>Create your account</h2>

              <p>
                Join Amal Library and start exploring.
              </p>
            </div>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Username */}

              <div className="auth-field">
                <label htmlFor="username">
                  Username
                </label>

                <div className="auth-input-wrapper">
                  <FaUser className="auth-input-icon" />

                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                  />
                </div>
              </div>

              {/* Email */}

              <div className="auth-field">
                <label htmlFor="email">
                  Email address
                </label>

                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">
                    @
                  </span>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}

              <div className="auth-field">
                <label htmlFor="password">
                  Password
                </label>

                <div className="auth-input-wrapper">
                  <FaLock className="auth-input-icon" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
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

              {/* Confirm password */}

              <div className="auth-field">
                <label htmlFor="password2">
                  Confirm password
                </label>

                <div className="auth-input-wrapper">
                  <FaLock className="auth-input-icon" />

                  <input
                    id="password2"
                    type={showPassword2 ? "text" : "password"}
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword2(!showPassword2)
                    }
                  >
                    {showPassword2 ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="auth-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="button-spinner"></span>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight />
                  </>
                )}
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <button
              type="button"
              className="google-button"
              onClick={() =>
                alert("Google signup will be added later.")
              }
            >
              <span className="google-letter">G</span>
              Continue with Google
            </button>

            <div className="auth-bottom-text">
              <span>Already have an account?</span>

              <Link to="/login">
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Register;