import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <section className="search-section">
      <div className="search-container">

        <h2>Find Your Favorite Book</h2>

        <p>
          Search thousands of books by title, author or category.
        </p>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search books, authors..."
          />

          <button>
            <FaSearch />
            Search
          </button>

        </div>

      </div>
    </section>
  );
}

export default SearchBar;