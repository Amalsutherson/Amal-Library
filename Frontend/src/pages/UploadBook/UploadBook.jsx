import "./UploadBook.css";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBook,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFilePdf,
  FaImage,
  FaTimes,
  FaUpload,
} from "react-icons/fa";

import { createBook } from "../../services/bookService";

function UploadBook() {
  const navigate = useNavigate();

  const coverInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    language: "English",
    publication_year: "",
    rating: "0",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const [coverPreview, setCoverPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /*
   * Cleanup cover preview URL
   */
  useEffect(() => {
    return () => {
      if (coverPreview) {
        URL.revokeObjectURL(coverPreview);
      }
    };
  }, [coverPreview]);

  /*
   * Form input
   */
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  /*
   * Cover image
   */
  function handleCoverChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // 5 MB limit
    if (file.size > 5 * 1024 * 1024) {
      setError("Cover image must be smaller than 5 MB.");
      return;
    }

    setCoverImage(file);

    if (coverPreview) {
      URL.revokeObjectURL(coverPreview);
    }

    setCoverPreview(URL.createObjectURL(file));
  }

  /*
   * PDF
   */
  function handlePdfChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSuccess("");

    if (file.type !== "application/pdf") {
      setError("Please select a valid PDF file.");
      return;
    }

    setPdfFile(file);
  }

  /*
   * Remove cover
   */
  function removeCover() {
    setCoverImage(null);
    setCoverPreview("");

    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  }

  /*
   * Remove PDF
   */
  function removePdf() {
    setPdfFile(null);

    if (pdfInputRef.current) {
      pdfInputRef.current.value = "";
    }
  }

  /*
   * Format file size
   */
  function formatFileSize(bytes) {
    if (!bytes) {
      return "0 KB";
    }

    const megabytes = bytes / (1024 * 1024);

    if (megabytes >= 1) {
      return `${megabytes.toFixed(2)} MB`;
    }

    return `${Math.ceil(bytes / 1024)} KB`;
  }

  /*
   * Submit
   */
  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
     * Basic validation
     */
    if (!formData.title.trim()) {
      setError("Please enter the book title.");
      return;
    }

    if (!formData.author.trim()) {
      setError("Please enter the author name.");
      return;
    }

    if (!formData.category.trim()) {
      setError("Please enter a category.");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter a book description.");
      return;
    }

    if (!coverImage) {
      setError("Please select a cover image.");
      return;
    }

    if (!pdfFile) {
      setError("Please select a PDF file.");
      return;
    }

    /*
     * Publication year validation
     */
    if (formData.publication_year) {
      const year = Number(formData.publication_year);

      if (year < 1000 || year > 2100) {
        setError("Please enter a valid publication year.");
        return;
      }
    }

    /*
     * Rating validation
     */
    const rating = Number(formData.rating);

    if (rating < 0 || rating > 5) {
      setError("Rating must be between 0 and 5.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", formData.title.trim());
      data.append("author", formData.author.trim());
      data.append("description", formData.description.trim());
      data.append("category", formData.category.trim());
      data.append("language", formData.language.trim() || "English");

      if (formData.publication_year) {
        data.append(
          "publication_year",
          formData.publication_year
        );
      }

      data.append("rating", formData.rating);

      data.append("cover_image", coverImage);
      data.append("pdf_file", pdfFile);

      console.log("Uploading book...");

      const createdBook = await createBook(data);

      console.log("Book uploaded:", createdBook);

      setSuccess("Your book has been added to the library.");

      setTimeout(() => {
        navigate(`/books/${createdBook.id}`);
      }, 1200);
    } catch (error) {
      console.error("Upload failed:", error);

      setError(
        error.message ||
          "Unable to upload book. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="upload-book-page">

      {/* HEADER */}

      <header className="upload-book-header">

        <Link to="/library" className="upload-back">
          <FaArrowLeft />
          <span>Back to Library</span>
        </Link>

        <div className="upload-brand">
          <div className="upload-brand-icon">
            <FaBook />
          </div>

          <div>
            <span>AMAL LIBRARY</span>
            <small>Add to the collection</small>
          </div>
        </div>

        <div className="upload-header-spacer"></div>

      </header>


      {/* PAGE INTRO */}

      <section className="upload-hero">

        <div className="upload-hero-content">

          <span className="upload-eyebrow">
            <FaBook />
            LIBRARY COLLECTION
          </span>

          <h1>
            Add a new
            <em> book</em>
          </h1>

          <p>
            Share a book with your library. Add its details,
            cover and PDF so it can be discovered and read online.
          </p>

        </div>

        <div className="upload-hero-decoration">
          <div className="hero-book">
            <span>AMAL</span>
            <strong>LIBRARY</strong>
          </div>
        </div>

      </section>


      {/* MAIN */}

      <main className="upload-main">

        <form
          className="upload-book-form"
          onSubmit={handleSubmit}
        >

          {/* BOOK INFORMATION */}

          <section className="upload-section">

            <div className="upload-section-heading">

              <div className="section-number">
                01
              </div>

              <div>
                <h2>Book information</h2>

                <p>
                  Tell readers about this book.
                </p>
              </div>

            </div>


            <div className="form-grid">

              <div className="form-group form-group-wide">

                <label htmlFor="title">
                  Book title
                  <span>*</span>
                </label>

                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Clean Code"
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="author">
                  Author
                  <span>*</span>
                </label>

                <input
                  id="author"
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="e.g. Robert C. Martin"
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="category">
                  Category
                  <span>*</span>
                </label>

                <input
                  id="category"
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Python, AI, Fiction..."
                  required
                />

              </div>


              <div className="form-group">

                <label htmlFor="language">
                  Language
                </label>

                <input
                  id="language"
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  placeholder="English"
                />

              </div>


              <div className="form-group">

                <label htmlFor="publication_year">
                  Publication year
                </label>

                <input
                  id="publication_year"
                  type="number"
                  name="publication_year"
                  value={formData.publication_year}
                  onChange={handleChange}
                  placeholder="2026"
                  min="1000"
                  max="2100"
                />

              </div>


              <div className="form-group">

                <label htmlFor="rating">
                  Initial rating
                </label>

                <div className="rating-input">

                  <input
                    id="rating"
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                  />

                  <span>/ 5</span>

                </div>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group description-group">

              <div className="label-row">

                <label htmlFor="description">
                  Description
                  <span>*</span>
                </label>

                <span className="character-count">
                  {formData.description.length} characters
                </span>

              </div>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write a short description about the book, its subject, or what readers can expect..."
                rows="7"
                maxLength="2000"
                required
              />

            </div>

          </section>


          {/* FILES */}

          <section className="upload-section">

            <div className="upload-section-heading">

              <div className="section-number">
                02
              </div>

              <div>
                <h2>Book files</h2>

                <p>
                  Add the cover and the complete PDF.
                </p>
              </div>

            </div>


            <div className="file-upload-grid">

              {/* COVER */}

              <div className="file-upload-card">

                <div className="file-card-header">

                  <div>
                    <h3>Book cover</h3>
                    <p>JPG, PNG or WEBP · Max 5 MB</p>
                  </div>

                  <FaImage />

                </div>


                {!coverImage ? (

                  <button
                    type="button"
                    className="drop-zone"
                    onClick={() => coverInputRef.current?.click()}
                  >

                    <FaCloudUploadAlt />

                    <strong>
                      Choose cover image
                    </strong>

                    <span>
                      Click here to browse
                    </span>

                  </button>

                ) : (

                  <div className="cover-preview-box">

                    <img
                      src={coverPreview}
                      alt="Book cover preview"
                    />

                    <div className="cover-preview-overlay">

                      <span>
                        {coverImage.name}
                      </span>

                      <button
                        type="button"
                        onClick={removeCover}
                        title="Remove cover"
                      >
                        <FaTimes />
                      </button>

                    </div>

                  </div>

                )}


                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleCoverChange}
                  hidden
                />

              </div>


              {/* PDF */}

              <div className="file-upload-card">

                <div className="file-card-header">

                  <div>
                    <h3>Book PDF</h3>
                    <p>PDF document · Complete book</p>
                  </div>

                  <FaFilePdf />

                </div>


                {!pdfFile ? (

                  <button
                    type="button"
                    className="drop-zone pdf-drop-zone"
                    onClick={() => pdfInputRef.current?.click()}
                  >

                    <FaFilePdf />

                    <strong>
                      Choose PDF book
                    </strong>

                    <span>
                      Click here to browse
                    </span>

                  </button>

                ) : (

                  <div className="pdf-selected">

                    <div className="pdf-icon">
                      <FaFilePdf />
                    </div>

                    <div className="pdf-info">

                      <strong>
                        {pdfFile.name}
                      </strong>

                      <span>
                        {formatFileSize(pdfFile.size)}
                      </span>

                    </div>

                    <button
                      type="button"
                      className="remove-file"
                      onClick={removePdf}
                      title="Remove PDF"
                    >
                      <FaTimes />
                    </button>

                  </div>

                )}


                <input
                  ref={pdfInputRef}
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={handlePdfChange}
                  hidden
                />

              </div>

            </div>

          </section>


          {/* STATUS */}

          {error && (

            <div className="upload-message upload-error">

              <FaTimes />

              <div>
                <strong>Upload could not be completed</strong>
                <span>{error}</span>
              </div>

            </div>

          )}


          {success && (

            <div className="upload-message upload-success">

              <FaCheckCircle />

              <div>
                <strong>Book added successfully</strong>
                <span>{success}</span>
              </div>

            </div>

          )}


          {/* ACTIONS */}

          <div className="upload-actions">

            <Link
              to="/library"
              className="cancel-upload"
            >
              Cancel
            </Link>


            <button
              type="submit"
              className="upload-submit-button"
              disabled={loading}
            >

              {loading ? (
                <>
                  <span className="upload-spinner"></span>
                  Uploading book...
                </>
              ) : (
                <>
                  <FaUpload />
                  Add to Library
                </>
              )}

            </button>

          </div>

        </form>

      </main>

    </div>
  );
}

export default UploadBook;