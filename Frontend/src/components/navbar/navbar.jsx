import "./navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__logo">
        <span className="logo-icon">📚</span>
        <h2>Open Library</h2>
      </div>

      <nav className="navbar__menu">
        <a href="/">Home</a>
        <a href="/library">Library</a>
        <a href="/categories">Categories</a>
        <a href="/about">About</a>
      </nav>
        
      <div className="navbar__actions">
        <button className="btn btn-login">Login</button>
        <button className="btn btn-register">Register</button>
      </div>
    </header>
  );
}

export default Navbar;