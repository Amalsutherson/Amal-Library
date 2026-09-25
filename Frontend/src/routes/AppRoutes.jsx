import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "../components/navbar/navbar";

import Home from "../pages/Home/Home";
import Library from "../pages/Library/Library";
import BookDetails from "../pages/BookDetails/BookDetails";
import Reader from "../pages/Reader/Reader";
import UploadBook from "../pages/UploadBook/UploadBook";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import About from "../pages/About/About";
import BookAI from "../pages/BookAI/BookAI";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>

      {/* Common Navbar */}
      <Navbar />

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Library */}
        <Route
          path="/library"
          element={<Library />}
        />

        <Route path="/about" element={<About />} />

        {/* Book Details */}
        <Route
          path="/books/:id"
          element={<BookDetails />}
        />

        {/* Reader */}
        <Route
          path="/reader/:id"
          element={<Reader />}
        />

        {/* Book AI */}
        <Route
          path="/books/:id/ai"
          element={
            <ProtectedRoute>
              <BookAI />
            </ProtectedRoute>
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Upload Book */}
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadBook />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default AppRoutes;