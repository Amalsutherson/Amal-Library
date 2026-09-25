import "./Library.css";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaSearch,
  FaBookOpen,
  FaStar,
  FaFilter,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

import { getBooks } from "../../services/bookService";

function Library() {

  // ==========================================
  // State
  // ==========================================

  const [books, setBooks] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const [sortBy, setSortBy] = useState("latest");

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);


  // ==========================================
  // Load Books
  // ==========================================

  useEffect(() => {

    async function loadBooks() {

      try {

        const data = await getBooks();

        setBooks(data);

      } catch (error) {

        console.error("Error loading books:", error);

        setError("Unable to load books.");

      } finally {

        setLoading(false);

      }

    }

    loadBooks();

  }, []);


  // ==========================================
  // Dynamic Categories
  // ==========================================

  const categories = useMemo(() => {

    const uniqueCategories = [
      ...new Set(
        books
          .map((book) => book.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];

  }, [books]);


  // ==========================================
  // Dynamic Languages
  // ==========================================

  const languages = useMemo(() => {

    const uniqueLanguages = [
      ...new Set(
        books
          .map((book) => book.language)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueLanguages];

  }, [books]);


  // ==========================================
  // Filter + Search + Sort
  // ==========================================

  const filteredBooks = useMemo(() => {

    let result = [...books];

    // Search
    if (searchTerm.trim()) {

      const search = searchTerm
        .toLowerCase()
        .trim();

      result = result.filter((book) => {

        const title =
          book.title?.toLowerCase() || "";

        const author =
          book.author?.toLowerCase() || "";

        const category =
          book.category?.toLowerCase() || "";

        return (
          title.includes(search) ||
          author.includes(search) ||
          category.includes(search)
        );

      });

    }


    // Category
    if (selectedCategory !== "All") {

      result = result.filter(
        (book) =>
          book.category === selectedCategory
      );

    }


    // Language
    if (selectedLanguage !== "All") {

      result = result.filter(
        (book) =>
          book.language === selectedLanguage
      );

    }


    // Sorting
    switch (sortBy) {

      case "rating":

        result.sort(
          (a, b) =>
            Number(b.rating || 0) -
            Number(a.rating || 0)
        );

        break;


      case "az":

        result.sort((a, b) =>
          (a.title || "").localeCompare(
            b.title || ""
          )
        );

        break;


      case "popular":

        result.sort(
          (a, b) =>
            Number(b.rating || 0) -
            Number(a.rating || 0)
        );

        break;


      case "latest":

      default:

        result.sort(
          (a, b) =>
            new Date(b.created_at || 0) -
            new Date(a.created_at || 0)
        );

        break;

    }

    return result;

  }, [
    books,
    searchTerm,
    selectedCategory,
    selectedLanguage,
    sortBy,
  ]);


  // ==========================================
  // Clear Filters
  // ==========================================

  const clearFilters = () => {

    setSearchTerm("");

    setSelectedCategory("All");

    setSelectedLanguage("All");

    setSortBy("latest");

  };


  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== "All" ||
    selectedLanguage !== "All";


  // ==========================================
  // Loading
  // ==========================================

  if (loading) {

    return (

      <div className="library-page">

        <section className="library-loading">

          <div className="library-loading-icon">
            📚
          </div>

          <h2>
            Opening the library...
          </h2>

          <p>
            Gathering your collection
          </p>

          <div className="loading-line"></div>

        </section>

      </div>

    );

  }


  // ==========================================
  // Error
  // ==========================================

  if (error) {

    return (

      <div className="library-page">

        <section className="library-error">

          <div className="error-icon">
            📖
          </div>

          <h2>
            Library unavailable
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Try Again
          </button>

        </section>

      </div>

    );

  }


  // ==========================================
  // Main
  // ==========================================

  return (

    <div className="library-page">


      {/* ======================================
          Hero
      ======================================= */}

      <section className="library-hero">

        <div className="library-hero-content">

          <span className="library-eyebrow">
            ✦ THE AMAL COLLECTION
          </span>

          <h1>
            A world of stories,
            <span> waiting for you.</span>
          </h1>

          <p>
            Explore a growing collection of books,
            knowledge and ideas. Find something worth
            reading today.
          </p>

        </div>


        <div className="library-hero-decoration">

          <div className="floating-book book-one">
            📕
          </div>

          <div className="floating-book book-two">
            📘
          </div>

          <div className="floating-book book-three">
            📗
          </div>

          <div className="hero-orbit"></div>

        </div>

      </section>


      {/* ======================================
          Search
      ======================================= */}

      <section className="library-toolbar">

        <div className="library-search-wrapper">

          <FaSearch className="library-search-icon" />

          <input
            type="text"
            placeholder="Search by title, author or category..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

          {searchTerm && (

            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>

          )}

          <button className="search-button">
            Search
          </button>

        </div>


        <button
          className="mobile-filter-button"
          onClick={() =>
            setMobileFiltersOpen(
              !mobileFiltersOpen
            )
          }
        >
          <FaFilter />
          Filters
        </button>

      </section>


      {/* ======================================
          Main Content
      ======================================= */}

      <section className="library-main">


        {/* ==================================
            Sidebar
        =================================== */}

        <aside
          className={`library-sidebar ${
            mobileFiltersOpen
              ? "mobile-open"
              : ""
          }`}
        >

          <div className="sidebar-header">

            <div>

              <span className="sidebar-small-title">
                REFINE
              </span>

              <h3>
                Browse
              </h3>

            </div>

            <button
              className="sidebar-close"
              onClick={() =>
                setMobileFiltersOpen(false)
              }
            >
              <FaTimes />
            </button>

          </div>


          {/* Category */}

          <div className="filter-section">

            <div className="filter-title">
              <span>Category</span>
            </div>

            <div className="filter-options">

              {categories.map((category) => (

                <button
                  key={category}
                  className={
                    selectedCategory === category
                      ? "filter-option active"
                      : "filter-option"
                  }
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                >

                  <span>
                    {category}
                  </span>

                  {selectedCategory === category && (
                    <span className="filter-check">
                      ✓
                    </span>
                  )}

                </button>

              ))}

            </div>

          </div>


          {/* Language */}

          <div className="filter-section">

            <div className="filter-title">
              <span>Language</span>
            </div>

            <div className="filter-options">

              {languages.map((language) => (

                <button
                  key={language}
                  className={
                    selectedLanguage === language
                      ? "filter-option active"
                      : "filter-option"
                  }
                  onClick={() =>
                    setSelectedLanguage(language)
                  }
                >

                  <span>
                    {language}
                  </span>

                  {selectedLanguage === language && (
                    <span className="filter-check">
                      ✓
                    </span>
                  )}

                </button>

              ))}

            </div>

          </div>


          {/* Clear */}

          {hasActiveFilters && (

            <button
              className="clear-filters"
              onClick={clearFilters}
            >
              <FaTimes />
              Clear all filters
            </button>

          )}

        </aside>


        {/* ==================================
            Books Area
        =================================== */}

        <main className="library-books-area">


          {/* Books Header */}

          <div className="books-topbar">

            <div>

              <span className="books-count-label">
                YOUR NEXT READ
              </span>

              <h2>
                All Books
              </h2>

              <p>
                Showing{" "}
                <strong>
                  {filteredBooks.length}
                </strong>{" "}
                {filteredBooks.length === 1
                  ? "book"
                  : "books"}
              </p>

            </div>


            <div className="sort-wrapper">

              <label htmlFor="sortBooks">
                Sort by
              </label>

              <select
                id="sortBooks"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
              >

                <option value="latest">
                  Latest
                </option>

                <option value="popular">
                  Most Popular
                </option>

                <option value="rating">
                  Highest Rated
                </option>

                <option value="az">
                  A-Z
                </option>

              </select>

            </div>

          </div>


          {/* Active Search */}

          {hasActiveFilters && (

            <div className="active-filters">

              <span>
                Active:
              </span>

              {searchTerm && (

                <button
                  onClick={() =>
                    setSearchTerm("")
                  }
                >
                  Search: "{searchTerm}"
                  <FaTimes />
                </button>

              )}

              {selectedCategory !== "All" && (

                <button
                  onClick={() =>
                    setSelectedCategory("All")
                  }
                >
                  {selectedCategory}
                  <FaTimes />
                </button>

              )}

              {selectedLanguage !== "All" && (

                <button
                  onClick={() =>
                    setSelectedLanguage("All")
                  }
                >
                  {selectedLanguage}
                  <FaTimes />
                </button>

              )}

            </div>

          )}


          {/* =================================
              Empty State
          ================================== */}

          {filteredBooks.length === 0 ? (

            <div className="empty-library">

              <div className="empty-icon">
                🔎
              </div>

              <h3>
                No books found
              </h3>

              <p>
                We couldn't find anything matching
                your current filters.
              </p>

              <button
                onClick={clearFilters}
                className="empty-reset-button"
              >
                Clear Filters
              </button>

            </div>

          ) : (


            /* =================================
               Book Grid
            ================================== */

            <div className="library-grid">

              {filteredBooks.map((book) => (

                <article
                  className="library-book-card"
                  key={book.id}
                >


                  {/* Cover */}

                  <Link
                    to={`/books/${book.id}`}
                    className="book-cover-wrapper"
                  >

                    {book.cover_image ? (

                      <img
                        src={book.cover_image}
                        alt={book.title}
                        className="book-cover"
                      />

                    ) : (

                      <div className="book-cover-placeholder">

                        <span>
                          📚
                        </span>

                        <small>
                          No Cover
                        </small>

                      </div>

                    )}


                    <div className="book-cover-overlay">

                      <span>
                        <FaBookOpen />
                        View Book
                      </span>

                    </div>


                    {book.category && (

                      <span className="book-category-badge">
                        {book.category}
                      </span>

                    )}

                  </Link>


                  {/* Content */}

                  <div className="book-card-content">


                    <div className="book-card-meta">

                      <span className="book-language">
                        {book.language || "English"}
                      </span>

                      <span className="book-rating">

                        <FaStar />

                        {Number(book.rating || 0).toFixed(1)}

                      </span>

                    </div>


                    <Link
                      to={`/books/${book.id}`}
                      className="book-title-link"
                    >

                      <h3>
                        {book.title}
                      </h3>

                    </Link>


                    <p className="book-author">
                      {book.author
                        ? `by ${book.author}`
                        : "Unknown author"}
                    </p>


                    <p className="book-description">

                      {book.description
                        ? book.description.length > 95
                          ? `${book.description.slice(
                              0,
                              95
                            )}...`
                          : book.description
                        : "Discover this book in the Amal Library."}

                    </p>


                    <Link
                      to={`/books/${book.id}`}
                      className="book-view-link"
                    >

                      <span>
                        Explore Book
                      </span>

                      <FaArrowRight />

                    </Link>

                  </div>

                </article>

              ))}

            </div>

          )}

        </main>

      </section>

    </div>

  );

}


export default Library;