import "./BookCard.css";
import { FaStar, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

import defaultBookCover from "../../assets/default-book-cover.svg";

function BookCard({ book }) {

  if (!book) {
    return null;
  }

  const coverImage = book.cover_image || defaultBookCover;

  const rating =
    book.rating !== null &&
    book.rating !== undefined &&
    book.rating !== ""
      ? Number(book.rating).toFixed(1)
      : "0.0";

  return (
    <article className="book-card">

      {/* Book Cover */}
      <Link
        to={`/books/${book.id}`}
        className="book-image-link"
      >
        <div className="book-image">

          <img
            src={coverImage}
            alt={book.title || "Book Cover"}
            onError={(event) => {
              event.currentTarget.src = defaultBookCover;
            }}
          />

        </div>
      </Link>


      {/* Book Information */}
      <div className="book-content">

        {/* Category */}
        <span className="book-category">
          {book.category || "General"}
        </span>


        {/* Title */}
        <h3 className="book-title">
          {book.title || "Untitled Book"}
        </h3>


        {/* Author */}
        <p className="book-author">
          by {book.author || "Unknown Author"}
        </p>


        {/* Rating */}
        <div className="book-rating">

          <FaStar />

          <span>
            {rating}
          </span>

        </div>


        {/* Read Book */}
        <Link
          to={`/reader/${book.id}`}
          className="book-read-button"
        >

          <FaBookOpen />

          <span>
            Read Book
          </span>

        </Link>

      </div>

    </article>
  );
}

export default BookCard;