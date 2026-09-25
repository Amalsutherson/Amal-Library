import { useEffect, useState } from "react";
import "./FeaturedBooks.css";

import BookCard from "../BookCard/BookCard";
import { getBooks } from "../../services/bookService";

function FeaturedBooks() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    loadFeaturedBooks();
  }, []);


  async function loadFeaturedBooks() {

    try {

      setLoading(true);
      setError("");

      const data = await getBooks();

      let allBooks = [];

      if (Array.isArray(data)) {
        allBooks = data;
      } else if (Array.isArray(data.results)) {
        allBooks = data.results;
      }

      // Latest 4 books
      setBooks(allBooks.slice(0, 4));

    } catch (err) {

      console.error(
        "Failed to load featured books:",
        err
      );

      setError(
        "Unable to load books. Please try again."
      );

    } finally {

      setLoading(false);

    }
  }


  return (
    <section className="featured-books">

      {/* Section Header */}
      <div className="section-title">

        <div>

          <span className="section-label">
            EXPLORE THE COLLECTION
          </span>

          <h2>
            Featured Books
          </h2>

          <p>
            Discover recently added books to the
            Amal Open Library.
          </p>

        </div>

      </div>


      {/* Loading */}
      {loading && (
        <div className="books-status">
          Loading books...
        </div>
      )}


      {/* Error */}
      {!loading && error && (
        <div className="books-status books-error">
          {error}
        </div>
      )}


      {/* Empty */}
      {!loading &&
        !error &&
        books.length === 0 && (

          <div className="books-status">
            No books have been uploaded yet.
          </div>

        )}


      {/* Books */}
      {!loading &&
        !error &&
        books.length > 0 && (

          <div className="book-grid">

            {books.map((book) => (

              <BookCard
                key={book.id}
                book={book}
              />

            ))}

          </div>

        )}

    </section>
  );
}

export default FeaturedBooks;