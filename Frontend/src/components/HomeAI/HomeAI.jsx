import "./HomeAI.css";
import Amal from "../../assets/Amal.png";
import { useEffect, useRef, useState } from "react";

import {
  FaBook,
  FaPaperPlane,
  FaRobot,
  FaTimes,
} from "react-icons/fa";

import { getBooks } from "../../services/bookService";
import { askAI } from "../../services/aiService";


function HomeAI() {

  /* =====================================================
     PANEL STATE
     ===================================================== */

  const [isOpen, setIsOpen] = useState(false);


  /* =====================================================
     BOOK STATE
     ===================================================== */

  const [books, setBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState("");

  const [loadingBooks, setLoadingBooks] = useState(false);


  /* =====================================================
     CHAT STATE
     ===================================================== */

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loadingAI, setLoadingAI] = useState(false);


  /* =====================================================
     ERROR STATE
     ===================================================== */

  const [error, setError] = useState("");


  /* =====================================================
     INPUT REF
     ===================================================== */

  const inputRef = useRef(null);


  /* =====================================================
     OPEN AI FROM HOME PAGE
     
     This allows:
     
     Try Amal AI
     Footer → Amal AI
     
     to open this panel.
     ===================================================== */

  useEffect(() => {

    function handleOpenAI() {

      setIsOpen(true);

    }


    window.addEventListener(
      "open-amal-ai",
      handleOpenAI
    );


    return () => {

      window.removeEventListener(
        "open-amal-ai",
        handleOpenAI
      );

    };

  }, []);


  /* =====================================================
     LOAD BOOKS
     
     Books are loaded only when the AI panel is opened.
     ===================================================== */

  useEffect(() => {

    if (!isOpen) {
      return;
    }

    if (books.length > 0) {
      return;
    }


    async function loadBooks() {

      try {

        setLoadingBooks(true);

        setError("");


        const data = await getBooks();


        /*
         * Django REST Framework normally returns:
         *
         * [
         *   {...},
         *   {...}
         * ]
         *
         * But this also handles paginated responses.
         */

        const bookList = Array.isArray(data)
          ? data
          : data?.results || [];


        setBooks(bookList);


        /*
         * Automatically select first book.
         */

        if (bookList.length > 0) {

          setSelectedBook(
            String(bookList[0].id)
          );

        }

      } catch (err) {

        console.error(
          "Home AI book loading error:",
          err
        );

        setError(
          "Unable to load books. Please try again."
        );

      } finally {

        setLoadingBooks(false);

      }

    }


    loadBooks();

  }, [isOpen, books.length]);


  /* =====================================================
     CLOSE PANEL
     ===================================================== */

  function closeAI() {

    setIsOpen(false);

  }


  /* =====================================================
     OPEN PANEL
     ===================================================== */

  function openAI() {

    setIsOpen(true);

  }


  /* =====================================================
     CHANGE BOOK
     ===================================================== */

  function handleBookChange(event) {

    const bookId = event.target.value;

    setSelectedBook(bookId);

    setMessages([]);

    setQuestion("");

    setError("");

  }


  /* =====================================================
     ASK AI
     ===================================================== */

  async function handleAskAI(event) {

    event.preventDefault();


    const trimmedQuestion =
      question.trim();


    /*
     * Don't send empty question.
     */

    if (!trimmedQuestion) {
      return;
    }


    /*
     * Book is required.
     */

    if (!selectedBook) {

      setError(
        "Please select a book first."
      );

      return;

    }


    /*
     * Don't allow multiple requests.
     */

    if (loadingAI) {
      return;
    }


    setError("");


    /*
     * Find selected book.
     */

    const selectedBookData =
      books.find(
        (book) =>
          String(book.id) ===
          String(selectedBook)
      );


    /*
     * Add user's question immediately.
     */

    const userMessage = {

      id:
        `${Date.now()}-user`,

      type: "user",

      text: trimmedQuestion,

    };


    setMessages((previous) => [

      ...previous,

      userMessage,

    ]);


    /*
     * Clear input.
     */

    setQuestion("");


    /*
     * Start AI loading.
     */

    setLoadingAI(true);


    try {

      console.log(
        "Sending question to AI:",
        trimmedQuestion
      );

      console.log(
        "Selected book:",
        selectedBook
      );


      const response = await askAI(
        trimmedQuestion,
        selectedBook
      );


      console.log(
        "AI response:",
        response
      );


      /*
       * Your backend response:
       *
       * {
       *   success: true,
       *   message: "...",
       *   data: {
       *      question: "...",
       *      answer: "...",
       *      book_id: 1,
       *      book_title: "..."
       *   },
       *   error: null
       * }
       */

      const answer =
        response?.data?.answer ||
        response?.answer ||
        "I couldn't generate an answer.";


      const aiMessage = {

        id:
          `${Date.now()}-ai`,

        type: "ai",

        text: answer,

        bookTitle:
          response?.data?.book_title ||
          selectedBookData?.title ||
          "",

      };


      setMessages((previous) => [

        ...previous,

        aiMessage,

      ]);

    } catch (err) {

      console.error(
        "Amal AI request failed:",
        err
      );


      /*
       * Show error inside chat.
       */

      const errorMessage = {

        id:
          `${Date.now()}-error`,

        type: "ai",

        text:
          err?.message ||
          "AI is temporarily unavailable. Please try again.",

      };


      setMessages((previous) => [

        ...previous,

        errorMessage,

      ]);

    } finally {

      setLoadingAI(false);

    }

  }


  /* =====================================================
     SUGGESTED QUESTION
     ===================================================== */

  function useSuggestion(text) {

    setQuestion(text);


    /*
     * Focus input after selecting suggestion.
     */

    setTimeout(() => {

      inputRef.current?.focus();

    }, 50);

  }


  /* =====================================================
     CLEAR CHAT
     ===================================================== */

  function clearChat() {

    setMessages([]);

    setQuestion("");

    setError("");

  }


  /* =====================================================
     KEYBOARD HANDLER
     ===================================================== */

  function handleKeyDown(event) {

    /*
     * Enter = send
     *
     * Shift + Enter = new line
     */

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      handleAskAI(event);

    }

  }


  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <>
      {/* =================================================
          FLOATING AMAL AI BUTTON
          ================================================= */}

      {!isOpen && (

        <button
          type="button"
          className="home-ai-launcher"
          onClick={openAI}
          aria-label="Open Amal AI"
        >

          <span className="home-ai-launcher-icon">

            <FaRobot />

          </span>


          <span className="home-ai-launcher-text">

            <strong>
              Amal AI
            </strong>

            <small>
              Ask about books
            </small>

          </span>

        </button>

      )}


      {/* =================================================
          MOBILE OVERLAY
          ================================================= */}

      {isOpen && (

        <div
          className="home-ai-overlay"
          onClick={closeAI}
          aria-hidden="true"
        />

      )}


      {/* =================================================
          AI SIDE PANEL
          ================================================= */}

      <aside
        className={`home-ai-panel ${
          isOpen
            ? "home-ai-panel-open"
            : ""
        }`}
        aria-hidden={!isOpen}
      >

        {/* =================================================
            HEADER
            ================================================= */}

        <header className="home-ai-header">

          <div className="home-ai-header-left">

            <div className="home-ai-avatar">

              <img src={Amal} alt="Amal AI" />

            </div>


            <div>

              <h2>
                Amal AI
              </h2>

              <span>
                Library Assistant
              </span>

            </div>

          </div>


          <div className="home-ai-header-actions">

            {messages.length > 0 && (

              <button
                type="button"
                className="home-ai-clear"
                onClick={clearChat}
                title="New conversation"
              >
                New
              </button>

            )}


            <button
              type="button"
              className="home-ai-close"
              onClick={closeAI}
              aria-label="Close Amal AI"
            >

              <FaTimes />

            </button>

          </div>

        </header>


        {/* =================================================
            BOOK SELECTOR
            ================================================= */}

        <div className="home-ai-book-bar">

          <div className="home-ai-book-label">

            <FaBook />

            <span>
              Reading from
            </span>

          </div>


          <select
            value={selectedBook}
            onChange={handleBookChange}
            disabled={
              loadingBooks ||
              loadingAI
            }
          >

            {loadingBooks && (

              <option value="">
                Loading books...
              </option>

            )}


            {!loadingBooks &&
              books.length === 0 && (

                <option value="">
                  No books available
                </option>

              )}


            {!loadingBooks &&
              books.map((book) => (

                <option
                  key={book.id}
                  value={book.id}
                >
                  {book.title}
                </option>

              ))}

          </select>

        </div>


        {/* =================================================
            CONTENT
            ================================================= */}

        <div className="home-ai-content">

          {/* ERROR */}

          {error && (

            <div className="home-ai-error">

              {error}

            </div>

          )}


          {/* =================================================
              EMPTY / WELCOME STATE
              ================================================= */}

          {messages.length === 0 && (

            <div className="home-ai-welcome">

              <div className="home-ai-welcome-icon">

                <FaRobot />

              </div>


              <h3>
                Ask Amal AI
              </h3>


              <p>
                Ask questions about the selected book.
                I can help explain concepts, summarize
                ideas and find information from the book.
              </p>


              <div className="home-ai-suggestions">

                <button
                  type="button"
                  onClick={() =>
                    useSuggestion(
                      "What is this book about?"
                    )
                  }
                >
                  What is this book about?
                </button>


                <button
                  type="button"
                  onClick={() =>
                    useSuggestion(
                      "Summarize the main ideas of this book."
                    )
                  }
                >
                  Summarize the main ideas
                </button>


                <button
                  type="button"
                  onClick={() =>
                    useSuggestion(
                      "What are the important concepts in this book?"
                    )
                  }
                >
                  Important concepts
                </button>


                <button
                  type="button"
                  onClick={() =>
                    useSuggestion(
                      "Explain this book in simple terms."
                    )
                  }
                >
                  Explain it simply
                </button>

              </div>

            </div>

          )}


          {/* =================================================
              CHAT MESSAGES
              ================================================= */}

          {messages.length > 0 && (

            <div className="home-ai-messages">

              {messages.map((message) => (

                <div
                  key={message.id}
                  className={`home-ai-message ${
                    message.type === "user"
                      ? "home-ai-user-message"
                      : "home-ai-bot-message"
                  }`}
                >

                  {/* AI ICON */}

                  {message.type === "ai" && (

                    <div className="home-ai-small-avatar">

                      <FaRobot />

                    </div>

                  )}


                  {/* MESSAGE */}

                  <div className="home-ai-message-bubble">

                    {message.text}


                    {message.bookTitle && (

                      <small>
                        Based on:{" "}
                        {message.bookTitle}
                      </small>

                    )}

                  </div>

                </div>

              ))}


              {/* =================================================
                  AI TYPING
                  ================================================= */}

              {loadingAI && (

                <div className="home-ai-message home-ai-bot-message">

                  <div className="home-ai-small-avatar">

                    <FaRobot />

                  </div>


                  <div className="home-ai-typing">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>

              )}

            </div>

          )}

        </div>


        {/* =================================================
            INPUT
            ================================================= */}

        <div className="home-ai-input-area">

          <form onSubmit={handleAskAI}>

            <textarea
              ref={inputRef}
              value={question}
              onChange={(event) =>
                setQuestion(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
              placeholder={
                selectedBook
                  ? "Ask about this book..."
                  : "Select a book first..."
              }
              rows="2"
              disabled={
                loadingAI ||
                !selectedBook
              }
            />


            <button
              type="submit"
              disabled={
                loadingAI ||
                !question.trim() ||
                !selectedBook
              }
              aria-label="Send question"
            >

              <FaPaperPlane />

            </button>

          </form>


          <p>
            Amal AI uses the selected book as its context.
          </p>

        </div>

      </aside>
    </>
  );
}

export default HomeAI;