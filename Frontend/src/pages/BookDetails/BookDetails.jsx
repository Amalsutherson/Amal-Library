import "./BookDetails.css";

import { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaBookOpen,
  FaHeart,
  FaStar,
  FaRobot,
  FaLanguage,
  FaCalendarAlt,
  FaUser,
  FaBookmark,
  FaShareAlt,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";

import { getBook } from "../../services/bookService";


function BookDetails() {

  const { id } = useParams();

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [favorite, setFavorite] = useState(false);

  const [copied, setCopied] = useState(false);


  // ==========================================
  // Get Book
  // ==========================================

  useEffect(() => {

    async function loadBook() {

      try {

        const data = await getBook(id);

        setBook(data);

      } catch (error) {

        console.error(
          "Error loading book:",
          error
        );

        setError(
          "Unable to load this book."
        );

      } finally {

        setLoading(false);

      }

    }

    loadBook();

  }, [id]);


  // ==========================================
  // Favorite
  // ==========================================

  const handleFavorite = () => {

    setFavorite((previous) => !previous);

  };


  // ==========================================
  // Share
  // ==========================================

  const handleShare = async () => {

    const url = window.location.href;

    try {

      if (navigator.share) {

        await navigator.share({
          title: book?.title || "Amal Library",
          text: `Check out "${book?.title}" in Amal Library.`,
          url,
        });

      } else {

        await navigator.clipboard.writeText(url);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);

      }

    } catch (error) {

      console.log(
        "Share cancelled or unavailable."
      );

    }

  };


  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (

      <div className="book-details-page">

        <div className="book-details-loading">

          <div className="loading-book-icon">
            📖
          </div>

          <h2>
            Opening the book...
          </h2>

          <p>
            Preparing your reading experience
          </p>

          <div className="book-loading-line"></div>

        </div>

      </div>

    );

  }


  // ==========================================
  // Error
  // ==========================================

  if (error) {

    return (

      <div className="book-details-page">

        <div className="book-details-error">

          <div className="details-error-icon">
            📚
          </div>

          <h2>
            We couldn't open this book
          </h2>

          <p>
            {error}
          </p>

          <Link
            to="/library"
            className="details-back-button"
          >
            <FaArrowLeft />
            Back to Library
          </Link>

        </div>

      </div>

    );

  }


  // ==========================================
  // Book Not Found
  // ==========================================

  if (!book) {

    return (

      <div className="book-details-page">

        <div className="book-details-error">

          <div className="details-error-icon">
            🔎
          </div>

          <h2>
            Book not found
          </h2>

          <p>
            This book may have been removed
            or is no longer available.
          </p>

          <Link
            to="/library"
            className="details-back-button"
          >
            <FaArrowLeft />
            Back to Library
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="book-details-page">


      {/* ======================================
          Decorative Background
      ======================================= */}

      <div className="details-background-glow"></div>


      {/* ======================================
          Top Navigation
      ======================================= */}

      <div className="book-details-topbar">

        <Link
          to="/library"
          className="back-library"
        >

          <FaArrowLeft />

          <span>
            Back to Library
          </span>

        </Link>


        <div className="details-breadcrumb">

          <span>
            Library
          </span>

          <FaChevronRight />

          <span>
            Book
          </span>

          <FaChevronRight />

          <strong>
            Details
          </strong>

        </div>

      </div>


      {/* ======================================
          Main Book Section
      ======================================= */}

      <section className="book-details-container">


        {/* ==================================
            COVER AREA
        =================================== */}

        <div className="book-cover-section">


          <div className="cover-decoration"></div>


          <div className="book-details-cover">

            {book.cover_image ? (

              <img
                src={book.cover_image}
                alt={book.title}
              />

            ) : (

              <div className="book-cover-placeholder">

                <span>
                  📚
                </span>

                <small>
                  Amal Library
                </small>

              </div>

            )}

          </div>


          {/* Cover Actions */}

          <div className="cover-actions">

            <button
              className={
                favorite
                  ? "cover-action favorite-active"
                  : "cover-action"
              }
              onClick={handleFavorite}
              title="Favorite"
            >

              <FaHeart />

            </button>


            <button
              className="cover-action"
              onClick={handleShare}
              title="Share"
            >

              <FaShareAlt />

            </button>

          </div>


          {copied && (

            <div className="copied-message">
              Link copied!
            </div>

          )}

        </div>


        {/* ==================================
            INFORMATION
        =================================== */}

        <div className="book-details-info">


          {/* Category */}

          <div className="details-category-row">

            <span className="details-category">

              {book.category || "General"}

            </span>


            {book.language && (

              <span className="details-language">

                <FaLanguage />

                {book.language}

              </span>

            )}

          </div>


          {/* Title */}

          <h1>
            {book.title}
          </h1>


          {/* Author */}

          <div className="details-author">

            <div className="author-icon">
              <FaUser />
            </div>

            <div>

              <span>
                Written by
              </span>

              <strong>
                {book.author || "Unknown Author"}
              </strong>

            </div>

          </div>


          {/* Rating */}

          <div className="details-rating-row">

            <div className="details-rating">

              <FaStar />

              <strong>
                {Number(book.rating || 0).toFixed(1)}
              </strong>

              <span>
                / 5
              </span>

            </div>


            <span className="rating-divider">
              |
            </span>


            <span className="reader-label">
              Library Collection
            </span>

          </div>


          {/* Description */}

          <div className="details-introduction">

            <p>
              {book.description ||
                "Explore this book and discover new ideas, stories and knowledge through the Amal Library."}
            </p>

          </div>


          {/* Book Meta */}

          <div className="details-meta-grid">


            <div className="details-meta-item">

              <div className="meta-icon">
                <FaLanguage />
              </div>

              <div>

                <span>
                  Language
                </span>

                <strong>
                  {book.language || "English"}
                </strong>

              </div>

            </div>


            <div className="details-meta-item">

              <div className="meta-icon">
                <FaCalendarAlt />
              </div>

              <div>

                <span>
                  Published
                </span>

                <strong>
                  {book.publication_year || "N/A"}
                </strong>

              </div>

            </div>


            <div className="details-meta-item">

              <div className="meta-icon">
                <FaBookOpen />
              </div>

              <div>

                <span>
                  Format
                </span>

                <strong>
                  {book.pdf_file
                    ? "Digital PDF"
                    : "Information Only"}
                </strong>

              </div>

            </div>


          </div>


          {/* ==================================
              PRIMARY ACTIONS
          =================================== */}

          <div className="book-details-actions">


            {book.pdf_file ? (

              <Link
                to={`/reader/${book.id}`}
                className="primary-book-button"
              >

                <FaBookOpen />

                <span>
                  Start Reading
                </span>

                <FaChevronRight />

              </Link>

            ) : (

              <button
                className="primary-book-button disabled-button"
                disabled
              >

                <FaBookOpen />

                PDF Not Available

              </button>

            )}


            <Link
              to={`/books/${book.id}/ai`}
              className="ai-book-button"
            >

              <FaRobot />

              <span>
                Ask AI About This Book
              </span>

            </Link>

          </div>


          {/* Secondary actions */}

          <div className="secondary-actions">


            <button
              className={
                favorite
                  ? "secondary-action active"
                  : "secondary-action"
              }
              onClick={handleFavorite}
            >

              <FaHeart />

              {favorite
                ? "Saved to Favorites"
                : "Add to Favorites"}

            </button>


            <button
              className="secondary-action"
              onClick={handleShare}
            >

              <FaShareAlt />

              Share Book

            </button>

          </div>

        </div>

      </section>


      {/* ======================================
          ABOUT BOOK
      ======================================= */}

      <section className="about-book-section">


        <div className="about-book-header">

          <span>
            INSIDE THE BOOK
          </span>

          <h2>
            About this book
          </h2>

        </div>


        <div className="about-book-content">


          <div className="quote-mark">
            <FaQuoteLeft />
          </div>


          <div>

            <p>
              {book.description ||
                "This book is part of the Amal Library collection. Open the book to begin reading and use the AI Reading Assistant when you need help understanding its content."}
            </p>

          </div>

        </div>

      </section>


      {/* ======================================
          READING EXPERIENCE
      ======================================= */}

      <section className="reading-features">


        <div className="reading-features-header">

          <span>
            YOUR READING EXPERIENCE
          </span>

          <h2>
            More than just a book.
          </h2>

          <p>
            Amal Library brings your reading,
            discovery and AI assistance together
            in one place.
          </p>

        </div>


        <div className="reading-features-grid">


          <div className="reading-feature-card">

            <div className="feature-number">
              01
            </div>

            <div className="feature-icon">
              <FaBookOpen />
            </div>

            <h3>
              Read Online
            </h3>

            <p>
              Open the digital book directly
              in the Amal Library reader.
            </p>

          </div>


          <div className="reading-feature-card">

            <div className="feature-number">
              02
            </div>

            <div className="feature-icon ai-feature-icon">
              <FaRobot />
            </div>

            <h3>
              Ask AI
            </h3>

            <p>
              Ask questions and get assistance
              while exploring the book.
            </p>

          </div>


          <div className="reading-feature-card">

            <div className="feature-number">
              03
            </div>

            <div className="feature-icon">
              <FaBookmark />
            </div>

            <h3>
              Save & Return
            </h3>

            <p>
              Keep interesting books in your
              personal collection.
            </p>

          </div>


        </div>

      </section>


      {/* ======================================
          FINAL CTA
      ======================================= */}

      <section className="book-reading-cta">

        <div>

          <span>
            READY TO BEGIN?
          </span>

          <h2>
            Your next chapter
            starts here.
          </h2>

        </div>


        {book.pdf_file ? (

          <Link
            to={`/reader/${book.id}`}
            className="cta-read-button"
          >

            <FaBookOpen />

            Start Reading

            <FaArrowLeft
              className="cta-arrow"
            />

          </Link>

        ) : (

          <Link
            to={`/books/${book.id}/ai`}
            className="cta-read-button"
          >

            <FaRobot />

            Explore with AI

            <FaArrowLeft
              className="cta-arrow"
            />

          </Link>

        )}

      </section>

    </div>

  );

}


export default BookDetails;