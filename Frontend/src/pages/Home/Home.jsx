import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/Hero/Hero";
import SearchBar from "../../components/SearchBar/SearchBar";
import FeaturedBooks from "../../components/FeaturedBooks/FeaturedBooks";
function Home() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <FeaturedBooks />

      <Hero />
      <main style={{ padding: "60px", textAlign: "center" }}>
        <h1>Welcome to Open Library</h1>
        <p>Your digital library to upload, discover, and read books.</p>
      </main>
    </>
  );
}

export default Home;