import "./Reader.css";

import { useEffect, useRef, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
  FaExpand,
  FaMinus,
  FaMoon,
  FaPlus,
  FaSun,
  FaExternalLinkAlt,
  FaCompress,
  FaRobot,
  FaBookOpen,
  FaRedo,
} from "react-icons/fa";

import { getBook } from "../../services/bookService";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function Reader() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [scale, setScale] = useState(1.1);
  const [darkMode, setDarkMode] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const [containerWidth, setContainerWidth] = useState(null);
  const [fitWidthMode, setFitWidthMode] = useState(true);

  const readerRef = useRef(null);
  const pdfAreaRef = useRef(null);

  /*
   * ---------------------------------------------------------
   * LOAD BOOK
   * ---------------------------------------------------------
   */

  useEffect(() => {
    async function loadBook() {
      try {
        setLoading(true);
        setError("");

        const data = await getBook(id);

        setBook(data);
      } catch (error) {
        console.error("Error loading book:", error);
        setError("Unable to load this book.");
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [id]);

  /*
   * ---------------------------------------------------------
   * RESTORE SAVED READING POSITION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const savedPage = Number(
      localStorage.getItem(`reader-page-${id}`)
    );

    const savedZoom = Number(
      localStorage.getItem(`reader-zoom-${id}`)
    );

    const savedDarkMode =
      localStorage.getItem(`reader-dark-${id}`) === "true";

    if (savedPage > 0) {
      setPageNumber(savedPage);
    }

    if (savedZoom >= 0.6 && savedZoom <= 2) {
      setScale(savedZoom);
    }

    setDarkMode(savedDarkMode);
  }, [id]);

  /*
   * ---------------------------------------------------------
   * SAVE PAGE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (pageNumber) {
      localStorage.setItem(
        `reader-page-${id}`,
        pageNumber
      );
    }
  }, [id, pageNumber]);

  /*
   * ---------------------------------------------------------
   * SAVE ZOOM
   * ---------------------------------------------------------
   */

  useEffect(() => {
    localStorage.setItem(
      `reader-zoom-${id}`,
      scale
    );
  }, [id, scale]);

  /*
   * ---------------------------------------------------------
   * SAVE DARK MODE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    localStorage.setItem(
      `reader-dark-${id}`,
      darkMode
    );
  }, [id, darkMode]);

  /*
   * ---------------------------------------------------------
   * PDF LOAD
   * ---------------------------------------------------------
   */

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);

    const savedPage = Number(
      localStorage.getItem(`reader-page-${id}`)
    );

    if (
      savedPage >= 1 &&
      savedPage <= numPages
    ) {
      setPageNumber(savedPage);
    } else {
      setPageNumber(1);
    }
  }

  /*
   * ---------------------------------------------------------
   * PAGE NAVIGATION
   * ---------------------------------------------------------
   */

  const goToPreviousPage = useCallback(() => {
    setPageNumber((previous) =>
      Math.max(previous - 1, 1)
    );
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber((previous) =>
      Math.min(
        previous + 1,
        numPages || 1
      )
    );
  }, [numPages]);

  function jumpToPage(event) {
    const value = Number(event.target.value);

    if (!numPages) {
      return;
    }

    if (value >= 1 && value <= numPages) {
      setPageNumber(value);
    }
  }

  /*
   * ---------------------------------------------------------
   * ZOOM
   * ---------------------------------------------------------
   */

  const zoomIn = useCallback(() => {
    setFitWidthMode(false);

    setScale((previous) =>
      Math.min(
        Number((previous + 0.1).toFixed(2)),
        2
      )
    );
  }, []);

  const zoomOut = useCallback(() => {
    setFitWidthMode(false);

    setScale((previous) =>
      Math.max(
        Number((previous - 0.1).toFixed(2)),
        0.6
      )
    );
  }, []);

  function resetZoom() {
    setFitWidthMode(false);
    setScale(1.1);
  }

  /*
   * ---------------------------------------------------------
   * FIT WIDTH
   * ---------------------------------------------------------
   */

  const updateContainerWidth = useCallback(() => {
    if (!pdfAreaRef.current) {
      return;
    }

    const width =
      pdfAreaRef.current.clientWidth;

    if (width > 100) {
      setContainerWidth(
        Math.max(width - 60, 300)
      );
    }
  }, []);

  function fitToWidth() {
    updateContainerWidth();
    setFitWidthMode(true);
  }

  /*
   * ---------------------------------------------------------
   * RESIZE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    updateContainerWidth();

    window.addEventListener(
      "resize",
      updateContainerWidth
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateContainerWidth
      );
    };
  }, [updateContainerWidth]);

  /*
   * ---------------------------------------------------------
   * FULLSCREEN
   * ---------------------------------------------------------
   */

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await readerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error(
        "Fullscreen error:",
        error
      );
    }
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(
        Boolean(document.fullscreenElement)
      );
    }

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * KEYBOARD SHORTCUTS
   * ---------------------------------------------------------
   */

  useEffect(() => {
    function handleKeyboard(event) {
      if (
        event.target.tagName === "INPUT" ||
        event.target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPreviousPage();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToNextPage();
      }

      if (event.key === "+") {
        event.preventDefault();
        zoomIn();
      }

      if (event.key === "-") {
        event.preventDefault();
        zoomOut();
      }

      if (
        event.key.toLowerCase() === "f"
      ) {
        event.preventDefault();
        toggleFullscreen();
      }

      if (event.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [
    goToPreviousPage,
    goToNextPage,
    zoomIn,
    zoomOut,
  ]);

  /*
   * ---------------------------------------------------------
   * LOADING
   * ---------------------------------------------------------
   */

  if (loading) {
    return (
      <div className="reader-loading-page">
        <div className="reader-loading-card">
          <div className="reader-spinner"></div>

          <FaBookOpen className="loading-book-icon" />

          <h2>Preparing your book</h2>

          <p>
            Please wait while we prepare
            your reading experience.
          </p>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * ERROR
   * ---------------------------------------------------------
   */

  if (error || !book) {
    return (
      <div className="reader-error-page">
        <div className="reader-error-card">
          <div className="error-book-icon">
            📖
          </div>

          <h2>
            Unable to open book
          </h2>

          <p>
            {error ||
              "The requested book could not be found."}
          </p>

          <Link
            to="/library"
            className="error-back-button"
          >
            <FaArrowLeft />
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * PDF NOT AVAILABLE
   * ---------------------------------------------------------
   */

  if (!book.pdf_file) {
    return (
      <div className="reader-error-page">
        <div className="reader-error-card">
          <div className="error-book-icon">
            📚
          </div>

          <h2>PDF Not Available</h2>

          <p>
            This book does not have a PDF
            file uploaded yet.
          </p>

          <Link
            to={`/books/${book.id}`}
            className="error-back-button"
          >
            <FaArrowLeft />
            Back to Book
          </Link>
        </div>
      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * READING PROGRESS
   * ---------------------------------------------------------
   */

  const readingProgress =
    numPages && pageNumber
      ? Math.round(
          (pageNumber / numPages) * 100
        )
      : 0;

  return (
    <div
      ref={readerRef}
      className={`reader-page ${
        darkMode ? "reader-dark" : ""
      }`}
    >
      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <header className="reader-topbar">
        <div className="reader-header-left">
          <Link
            to={`/books/${book.id}`}
            className="reader-back-button"
          >
            <FaArrowLeft />

            <span>
              Back to Book
            </span>
          </Link>

          <div className="reader-book-info">
            <div className="reader-book-icon">
              <FaBookOpen />
            </div>

            <div>
              <h1>{book.title}</h1>

              <span>
                {book.author}
              </span>
            </div>
          </div>
        </div>

        <div className="reader-top-actions">
          <Link
            to={`/books/${book.id}/ai`}
            className="reader-ai-button"
            title="Ask AI about this book"
          >
            <FaRobot />

            <span>
              Ask AI
            </span>
          </Link>

          <button
            onClick={() =>
              setDarkMode(
                (previous) => !previous
              )
            }
            title={
              darkMode
                ? "Light mode"
                : "Reading mode"
            }
            className="reader-icon-button"
          >
            {darkMode ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </button>

          <a
            href={book.pdf_file}
            download
            className="reader-icon-button"
            title="Download PDF"
          >
            <FaDownload />
          </a>

          <a
            href={book.pdf_file}
            target="_blank"
            rel="noopener noreferrer"
            className="reader-icon-button"
            title="Open PDF"
          >
            <FaExternalLinkAlt />
          </a>

          <button
            onClick={toggleFullscreen}
            title={
              isFullscreen
                ? "Exit fullscreen"
                : "Fullscreen"
            }
            className="reader-icon-button"
          >
            {isFullscreen ? (
              <FaCompress />
            ) : (
              <FaExpand />
            )}
          </button>
        </div>
      </header>

      {/* =====================================================
          READING PROGRESS
      ====================================================== */}

      <div
        className="reader-progress-track"
        title={`${readingProgress}% read`}
      >
        <div
          className="reader-progress-bar"
          style={{
            width: `${readingProgress}%`,
          }}
        />
      </div>

      {/* =====================================================
          TOOLBAR
      ====================================================== */}

      <div className="reader-toolbar">
        <div className="toolbar-section toolbar-pages">
          <button
            className="toolbar-button"
            onClick={goToPreviousPage}
            disabled={pageNumber <= 1}
            title="Previous page"
          >
            <FaChevronLeft />
          </button>

          <div className="page-counter">
            <input
              type="number"
              min="1"
              max={numPages || 1}
              value={pageNumber}
              onChange={jumpToPage}
              aria-label="Page number"
            />

            <span>
              / {numPages || "--"}
            </span>
          </div>

          <button
            className="toolbar-button"
            onClick={goToNextPage}
            disabled={
              !numPages ||
              pageNumber >= numPages
            }
            title="Next page"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="toolbar-section toolbar-zoom">
          <button
            className="toolbar-button"
            onClick={zoomOut}
            title="Zoom out"
            disabled={scale <= 0.6}
          >
            <FaMinus />
          </button>

          <button
            className="zoom-value"
            onClick={resetZoom}
            title="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>

          <button
            className="toolbar-button"
            onClick={zoomIn}
            title="Zoom in"
            disabled={scale >= 2}
          >
            <FaPlus />
          </button>
        </div>

        <div className="toolbar-section toolbar-fit">
          <button
            className={`fit-button ${
              fitWidthMode
                ? "active"
                : ""
            }`}
            onClick={fitToWidth}
          >
            Fit Width
          </button>

          <button
            className="reset-button"
            onClick={resetZoom}
            title="Reset zoom"
          >
            <FaRedo />
          </button>
        </div>

        <div className="toolbar-progress">
          <span>
            {readingProgress}% read
          </span>
        </div>
      </div>

      {/* =====================================================
          PDF AREA
      ====================================================== */}

      <main
        ref={pdfAreaRef}
        className="pdf-reader-area"
      >
        <div className="pdf-reader-inner">
          <Document
            file={book.pdf_file}
            onLoadSuccess={
              onDocumentLoadSuccess
            }
            loading={
              <div className="pdf-loading">
                <div className="reader-spinner"></div>

                <p>
                  Loading PDF...
                </p>
              </div>
            }
            error={
              <div className="pdf-error">
                <div className="pdf-error-icon">
                  📄
                </div>

                <h3>
                  Unable to display PDF
                </h3>

                <p>
                  Please make sure the PDF
                  is accessible from your
                  Django server.
                </p>

                <a
                  href={book.pdf_file}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open PDF directly
                  <FaExternalLinkAlt />
                </a>
              </div>
            }
          >
            <div className="pdf-page-wrapper">
              <Page
                pageNumber={pageNumber}
                scale={
                  fitWidthMode
                    ? undefined
                    : scale
                }
                width={
                  fitWidthMode
                    ? containerWidth
                    : undefined
                }
                renderTextLayer={true}
                renderAnnotationLayer={true}
              />
            </div>
          </Document>
        </div>
      </main>

      {/* =====================================================
          BOTTOM READER BAR
      ====================================================== */}

      <footer className="reader-bottom-bar">
        <div className="reader-shortcuts">
          <span>
            ← →
            <small>
              Pages
            </small>
          </span>

          <span>
            + −
            <small>
              Zoom
            </small>
          </span>

          <span>
            F
            <small>
              Fullscreen
            </small>
          </span>
        </div>

        <div className="reader-bottom-info">
          <FaBookOpen />

          <span>
            {book.title}
          </span>

          <span className="bottom-divider">
            •
          </span>

          <span>
            Page {pageNumber}
            {numPages
              ? ` of ${numPages}`
              : ""}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Reader;