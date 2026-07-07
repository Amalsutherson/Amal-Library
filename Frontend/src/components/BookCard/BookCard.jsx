import "./BookCard.css";
import { FaStar, FaBookOpen } from "react-icons/fa";

function BookCard() {
  return (
    <div className="book-card">

      <div className="book-image">
        <img
          src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500"
          alt="Book Cover"
        />
      </div>

      <div className="book-content">

        <span className="category">Programming</span>

        <h3>Learning Python</h3>

        <p className="author">
          by Mark Lutz
        </p>

        <div className="rating">
          <FaStar />
          <span>4.8</span>
        </div>

        <button>
          <FaBookOpen />
          Read Book
        </button>

      </div>

    </div>
  );
}

export default BookCard;