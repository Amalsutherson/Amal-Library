import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-tag">📚 Welcome to Open Library</span>

        <h1>
          Discover, Read &
         <span> Share Books</span>
        </h1>

        <p>
          Explore thousands of free books, upload your own collection,
          and enjoy reading anywhere, anytime.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Browse Books</button>
          <button className="secondary-btn">Upload Book</button>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800"
          alt="Library"
        />
      </div>
    </section>
  );
}

export default Hero;