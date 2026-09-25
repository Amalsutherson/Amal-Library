import "./BookAI.css";

import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaRobot,
  FaPaperPlane,
  FaBookOpen,
  FaLightbulb,
  FaTrash,
  FaStar,
  FaUser,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

import { getBook } from "../../services/bookService";
import { askAI } from "../../services/aiService";


function BookAI() {

  const { id } = useParams();

  const messagesEndRef = useRef(null);

  const [book, setBook] = useState(null);

  const [loadingBook, setLoadingBook] = useState(true);

  const [bookError, setBookError] = useState("");

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loadingAI, setLoadingAI] = useState(false);

  const [copiedIndex, setCopiedIndex] = useState(null);


  // ==========================================
  // Load Book
  // ==========================================

  useEffect(() => {

    async function loadBook() {

      try {

        const data = await getBook(id);

        setBook(data);

      } catch (error) {

        console.error(
          "Error loading book:",
          error
        );

        setBookError(
          "Unable to load book information."
        );

      } finally {

        setLoadingBook(false);

      }

    }

    loadBook();

  }, [id]);


  // ==========================================
  // Scroll to latest message
  // ==========================================

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loadingAI]);


  // ==========================================
  // Suggested Questions
  // ==========================================

  const suggestedQuestions = [

    `Give me a simple overview of "${book?.title || "this book"}".`,

    `What are the main ideas discussed in "${book?.title || "this book"}"?`,

    "Explain the important concepts from this book in simple words.",

    "Who would benefit most from reading this book?",

  ];


  // ==========================================
  // Send Question
  // ==========================================

  const handleAskAI = async (
    selectedQuestion = null
  ) => {

    const text = (
      selectedQuestion || question
    ).trim();

    if (!text || loadingAI) {
      return;
    }


    // User message

    const userMessage = {
      role: "user",
      content: text,
    };


    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setQuestion("");

    setLoadingAI(true);


    try {

      const response = await askAI(
        text,
        book.id
      );


      const answer =
        response?.data?.answer ||
        response?.answer ||
        "I couldn't generate an answer.";


      setMessages((previous) => [

        ...previous,

        {
          role: "assistant",
          content: answer,
        },

      ]);

    } catch (error) {

      console.error(
        "AI request failed:",
        error
      );


      setMessages((previous) => [

        ...previous,

        {
          role: "assistant",
          content:
            "I'm sorry, I couldn't process your question right now. Please check that the AI service is configured correctly and try again.",
          error: true,
        },

      ]);

    } finally {

      setLoadingAI(false);

    }

  };


  // ==========================================
  // Enter Key
  // ==========================================

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      handleAskAI();

    }

  };


  // ==========================================
  // Clear Chat
  // ==========================================

  const clearChat = () => {

    setMessages([]);

  };


  // ==========================================
  // Copy AI Answer
  // ==========================================

  const copyAnswer = async (
    content,
    index
  ) => {

    try {

      await navigator.clipboard.writeText(
        content
      );

      setCopiedIndex(index);

      setTimeout(() => {
        setCopiedIndex(null);
      }, 1800);

    } catch (error) {

      console.error(
        "Unable to copy answer:",
        error
      );

    }

  };


  // ==========================================
  // Loading Book
  // ==========================================

  if (loadingBook) {

    return (

      <div className="book-ai-page">

        <div className="ai-page-loading">

          <div className="ai-loading-icon">
            <FaRobot />
          </div>

          <h2>
            Preparing your AI assistant...
          </h2>

          <p>
            Loading book information
          </p>

        </div>

      </div>

    );

  }


  // ==========================================
  // Error
  // ==========================================

  if (bookError || !book) {

    return (

      <div className="book-ai-page">

        <div className="ai-page-error">

          <div>
            📚
          </div>

          <h2>
            Book unavailable
          </h2>

          <p>
            {bookError ||
              "The requested book could not be found."}
          </p>

          <Link
            to="/library"
            className="ai-back-button"
          >
            <FaArrowLeft />
            Back to Library
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="book-ai-page">


      {/* ======================================
          Header
      ======================================= */}

      <header className="book-ai-header">

        <div className="ai-header-left">

          <Link
            to={`/books/${book.id}`}
            className="ai-back-link"
          >

            <FaArrowLeft />

            <span>
              Back to Book
            </span>

          </Link>

        </div>


        <div className="ai-brand">

          <div className="ai-brand-icon">

            <FaRobot />

          </div>

          <div>

            <strong>
              Amal AI
            </strong>

            <span>
              Reading Assistant
            </span>

          </div>

        </div>


        <div className="ai-header-right">

          {messages.length > 0 && (

            <button
              className="clear-chat-button"
              onClick={clearChat}
              title="Clear conversation"
            >

              <FaTrash />

              <span>
                Clear
              </span>

            </button>

          )}

        </div>

      </header>


      {/* ======================================
          Book Context Bar
      ======================================= */}

      <section className="ai-book-context">

        <div className="ai-book-cover">

          {book.cover_image ? (

            <img
              src={book.cover_image}
              alt={book.title}
            />

          ) : (

            <span>
              📚
            </span>

          )}

        </div>


        <div className="ai-book-info">

          <span>
            CURRENTLY EXPLORING
          </span>

          <h1>
            {book.title}
          </h1>

          <p>
            by {book.author || "Unknown Author"}
          </p>

        </div>


        <div className="ai-book-rating">

          <FaStar />

          <strong>
            {Number(
              book.rating || 0
            ).toFixed(1)}
          </strong>

        </div>

      </section>


      {/* ======================================
          Main AI Layout
      ======================================= */}

      <main className="ai-main">


        {/* ==================================
            Welcome Panel
        =================================== */}

        {messages.length === 0 && (

          <section className="ai-welcome">

            <div className="welcome-orbit">

              <div className="welcome-robot">

                <FaRobot />

              </div>

            </div>


            <span className="welcome-label">
              YOUR READING COMPANION
            </span>


            <h2>
              What would you like
              to discover?
            </h2>


            <p>
              Ask questions about this book,
              explore its ideas, simplify
              difficult concepts or get help
              understanding what you're reading.
            </p>


            {/* Suggestions */}

            <div className="suggestions">

              <div className="suggestions-title">

                <FaLightbulb />

                Try asking

              </div>


              <div className="suggestion-grid">

                {suggestedQuestions.map(
                  (suggestion, index) => (

                    <button
                      key={index}
                      className="suggestion-card"
                      onClick={() =>
                        handleAskAI(
                          suggestion
                        )
                      }
                    >

                      <span>
                        {suggestion}
                      </span>

                      <FaArrowLeft />

                    </button>

                  )
                )}

              </div>

            </div>

          </section>

        )}


        {/* ==================================
            Chat
        =================================== */}

        {messages.length > 0 && (

          <section className="ai-chat-area">

            {messages.map(
              (message, index) => (

                <div
                  key={index}
                  className={
                    message.role === "user"
                      ? "chat-message user-message"
                      : "chat-message assistant-message"
                  }
                >

                  <div className="message-avatar">

                    {message.role === "user" ? (

                      <FaUser />

                    ) : (

                      <FaRobot />

                    )}

                  </div>


                  <div className="message-body">

                    <div className="message-name">

                      {message.role === "user"
                        ? "You"
                        : "Amal AI"}

                    </div>


                    <div
                      className={
                        message.error
                          ? "message-content message-error"
                          : "message-content"
                      }
                    >

                      {message.content}

                    </div>


                    {message.role ===
                      "assistant" && (

                      <button
                        className="copy-answer"
                        onClick={() =>
                          copyAnswer(
                            message.content,
                            index
                          )
                        }
                      >

                        {copiedIndex === index ? (

                          <>
                            <FaCheck />
                            Copied
                          </>

                        ) : (

                          <>
                            <FaCopy />
                            Copy
                          </>

                        )}

                      </button>

                    )}

                  </div>

                </div>

              )
            )}


            {/* Typing */}

            {loadingAI && (

              <div className="chat-message assistant-message">

                <div className="message-avatar">

                  <FaRobot />

                </div>


                <div className="message-body">

                  <div className="message-name">
                    Amal AI
                  </div>


                  <div className="typing-indicator">

                    <span></span>
                    <span></span>
                    <span></span>

                  </div>

                </div>

              </div>

            )}


            <div ref={messagesEndRef}></div>

          </section>

        )}


        {/* ==================================
            Composer
        =================================== */}

        <section className="ai-composer-wrapper">

          <div className="ai-composer">

            <textarea
              value={question}
              onChange={(event) =>
                setQuestion(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
              placeholder={
                "Ask Amal AI about this book..."
              }
              rows={1}
              disabled={loadingAI}
            />


            <button
              className="send-ai-button"
              onClick={() =>
                handleAskAI()
              }
              disabled={
                !question.trim() ||
                loadingAI
              }
            >

              <FaPaperPlane />

            </button>

          </div>


          <div className="composer-footer">

            <span>
              <FaRobot />
              AI responses may need verification.
            </span>

            <span>
              Enter to send · Shift + Enter for new line
            </span>

          </div>

        </section>


        {/* ==================================
            Bottom Navigation
        =================================== */}

        <div className="ai-bottom-navigation">

          <Link
            to={`/books/${book.id}`}
            className="ai-bottom-link"
          >

            <FaBookOpen />

            View Book Details

          </Link>

          {book.pdf_file && (

            <Link
              to={`/reader/${book.id}`}
              className="ai-bottom-link primary"
            >

              <FaBookOpen />

              Continue Reading

            </Link>

          )}

        </div>

      </main>

    </div>

  );

}


export default BookAI;