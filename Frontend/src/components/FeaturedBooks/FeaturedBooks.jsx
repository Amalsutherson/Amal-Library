import "./FeaturedBooks.css";
import BookCard from "../BookCard/BookCard";

function FeaturedBooks() {
  return (
    <section className="featured-books">

      <div className="section-title">
        <h2>Featured Books</h2>
        <p>Discover our most popular books.</p>
      </div>

      <div className="book-grid">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>

    </section>
  );
}

export default FeaturedBooks;