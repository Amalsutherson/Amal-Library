import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./LatestBooks.css";
import BookCard from "../BookCard/BookCard";
import { getBooks } from "../../services/bookService";

function LatestBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatestBooks();
  }, []);

  async function loadLatestBooks() {
    try {
      const data = await getBooks();

      // Backend already returns newest books first
      const latestBooks = Array.isArray(data)
        ? data.slice(0, 8)
        : data.results?.slice(0, 8) || [];

      setBooks(latestBooks);
    } catch (error) {
      console.error("Error loading latest books:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="latest-books">

      <div className="section-header">
        <span className="section-tag">
          Latest Collection
        </span>

        <h2>Recently Added Books</h2>

        <p>
          Discover the newest books uploaded to the Amal Open Library.
        </p>
      </div>

      {loading && (
        <div className="latest-books-status">
          Loading latest books...
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="latest-books-status">
          No books have been uploaded yet.
        </div>
      )}

      {!loading && books.length > 0 && (
        <>
          <div className="latest-books-grid">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
              />
            ))}
          </div>

          <div className="view-all">
            <Link
              to="/library"
              className="view-all-button"
            >
              View All Books
              <span>→</span>
            </Link>
          </div>
        </>
      )}

    </section>
  );
}

export default LatestBooks;