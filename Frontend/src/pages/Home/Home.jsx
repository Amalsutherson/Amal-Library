import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaCloudUploadAlt,
  FaCompass,
  FaRobot,
  FaSearch,
  FaUserPlus,
} from "react-icons/fa";

import SearchBar from "../../components/SearchBar/SearchBar";
import FeaturedBooks from "../../components/FeaturedBooks/FeaturedBooks";
import LatestBooks from "../../components/LatestBooks/LatestBooks";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import UploadCTA from "../../components/UploadCTA/UploadCTA";
import HomeAI from "../../components/HomeAI/HomeAI";

function Home() {
  const openAI = () => {
    window.dispatchEvent(
      new CustomEvent("open-amal-ai")
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f2e9",
        color: "#241c17",
        fontFamily:
          "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      {/* =========================================
          NAVBAR
      ========================================= */}

    

      {/* =========================================
          AMAL AI
      ========================================= */}

      <HomeAI />

      {/* =========================================
          HERO
      ========================================= */}

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "100px 7% 70px",
          background:
            "linear-gradient(135deg, #fbf8f2 0%, #f3e9dc 100%)",
        }}
      >
        {/* Decorative circle */}

        <div
          style={{
            position: "absolute",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            right: "-150px",
            top: "-150px",
            background:
              "rgba(184, 92, 58, 0.08)",
          }}
        />

        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            left: "-150px",
            bottom: "-150px",
            background:
              "rgba(197, 150, 82, 0.08)",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1250px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.1fr) minmax(320px, 0.9fr)",
            gap: "70px",
            alignItems: "center",
          }}
        >
          {/* LEFT */}

          <div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "25px",
                color: "#b85c3a",
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "3px",
              }}
            >
              <span
                style={{
                  width: "40px",
                  height: "1px",
                  background: "#b85c3a",
                }}
              />

              AMAL OPEN LIBRARY
            </div>

            <h1
              style={{
                margin: 0,
                fontFamily:
                  "Georgia, 'Times New Roman', serif",
                fontSize:
                  "clamp(55px, 7vw, 95px)",
                fontWeight: "500",
                lineHeight: "0.92",
                letterSpacing: "-5px",
              }}
            >
              Stories worth
              <br />

              <span
                style={{
                  color: "#b85c3a",
                  fontStyle: "italic",
                }}
              >
                discovering.
              </span>
            </h1>

            <p
              style={{
                maxWidth: "570px",
                marginTop: "32px",
                marginBottom: "30px",
                color: "#756b63",
                fontSize: "16px",
                lineHeight: "1.8",
              }}
            >
              Discover books, read online, explore new
              ideas and understand what you are reading
              with Amal AI.
            </p>

            {/* BUTTONS */}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >

              <Link
                to="/library"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 24px",
                  background: "#241c17",
                  color: "#ffffff",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                <FaBookOpen />
                Explore Library
                <FaArrowRight />
              </Link>

              <Link
                to="/register"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "16px 22px",
                  background: "#ffffff",
                  color: "#4c3a2e",
                  border:
                    "1px solid #ded4c7",
                  textDecoration: "none",
                  borderRadius: "4px",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                <FaUserPlus />
                Create Account
              </Link>

            </div>

            {/* SMALL INFO */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "35px",
                color: "#756b63",
                fontSize: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                {["AL", "R", "B", "+"].map(
                  (item, index) => (
                    <div
                      key={item}
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft:
                          index === 0
                            ? "0"
                            : "-7px",
                        borderRadius: "50%",
                        border:
                          "2px solid #fbf8f2",
                        background:
                          index === 0
                            ? "#b85c3a"
                            : "#6f5848",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent:
                          "center",
                        fontSize: "8px",
                        fontWeight: "800",
                      }}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>

              <div>
                <strong
                  style={{
                    display: "block",
                    color: "#4c3a2e",
                  }}
                >
                  Built for readers
                </strong>

                <span>
                  Discover · Read · Understand
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT BOOK */}

          <div
            style={{
              minHeight: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >

            {/* Book */}

            <div
              style={{
                width: "290px",
                height: "410px",
                padding: "32px",
                position: "relative",
                background:
                  "linear-gradient(145deg, #7b3024, #a34e37)",
                color: "#f7e9d3",
                borderRadius:
                  "3px 10px 10px 3px",
                boxShadow:
                  "30px 35px 45px rgba(50,30,20,0.22)",
                transform:
                  "rotate(-5deg)",
              }}
            >

              <div
                style={{
                  borderTop:
                    "1px solid rgba(255,255,255,.35)",
                  paddingTop: "15px",
                }}
              >
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    border:
                      "1px solid rgba(255,255,255,.45)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "center",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  AL
                </div>

                <div
                  style={{
                    marginTop: "65px",
                    fontSize: "10px",
                    letterSpacing: "4px",
                    color: "#dfbd80",
                  }}
                >
                  AMAL
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    fontFamily:
                      "Georgia, serif",
                    fontSize: "43px",
                    lineHeight: "0.85",
                    letterSpacing: "-3px",
                  }}
                >
                  OPEN
                  <br />
                  LIBRARY
                </div>

                <div
                  style={{
                    marginTop: "30px",
                    fontSize: "8px",
                    letterSpacing: "2px",
                  }}
                >
                  DISCOVER · READ · LEARN
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  right: "30px",
                  bottom: "32px",
                  height: "1px",
                  background:
                    "rgba(255,255,255,.35)",
                }}
              />

            </div>

            {/* Floating AI */}

            <button
              type="button"
              onClick={openAI}
              style={{
                position: "absolute",
                right: "0",
                bottom: "55px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 17px",
                border:
                  "1px solid #ded4c7",
                borderRadius: "30px",
                background:
                  "rgba(255,255,255,.92)",
                color: "#4c3a2e",
                boxShadow:
                  "0 12px 30px rgba(40,25,15,.10)",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "11px",
              }}
            >
              <FaRobot
                style={{
                  color: "#b85c3a",
                }}
              />
              Ask Amal AI
            </button>

          </div>
        </div>


        {/* SEARCH */}

        <div
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: "1050px",
            margin: "55px auto 0",
            padding: "22px",
            background:
              "rgba(255,255,255,.75)",
            border:
              "1px solid #ded4c7",
            boxShadow:
              "0 20px 50px rgba(50,30,20,.07)",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <strong
              style={{
                color: "#4c3a2e",
                fontSize: "12px",
              }}
            >
              Find your next book
            </strong>

            <Link
              to="/library"
              style={{
                color: "#b85c3a",
                textDecoration: "none",
                fontSize: "11px",
                fontWeight: "700",
              }}
            >
              Browse all books →
            </Link>
          </div>

          <SearchBar />

        </div>

      </section>


      {/* =========================================
          INTRODUCTION
      ========================================= */}

      <section
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "110px 7%",
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
      >

        <div>

          <span
            style={{
              color: "#b85c3a",
              fontSize: "11px",
              fontWeight: "800",
              letterSpacing: "3px",
            }}
          >
            ABOUT THE LIBRARY
          </span>

          <h2
            style={{
              margin:
                "18px 0 25px",
              fontFamily:
                "Georgia, 'Times New Roman', serif",
              fontSize:
                "clamp(40px, 5vw, 62px)",
              fontWeight: "500",
              lineHeight: "1",
              letterSpacing: "-3px",
            }}
          >
            A library for
            <br />

            <em
              style={{
                color: "#b85c3a",
              }}
            >
              curious minds.
            </em>
          </h2>

          <p
            style={{
              color: "#756b63",
              lineHeight: "1.8",
              fontSize: "15px",
              maxWidth: "550px",
            }}
          >
            Amal Open Library is a digital space where
            readers can discover books, read them online,
            share knowledge and use intelligent tools to
            understand the ideas inside them.
          </p>

          <Link
            to="/library"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
              color: "#241c17",
              textDecoration: "none",
              borderBottom:
                "1px solid #241c17",
              paddingBottom: "6px",
              fontSize: "12px",
              fontWeight: "800",
            }}
          >
            Enter the library
            <FaArrowRight />
          </Link>

        </div>

        <div
          style={{
            padding: "40px",
            borderTop:
              "1px solid #ded4c7",
            borderBottom:
              "1px solid #ded4c7",
          }}
        >

          <FaBookOpen
            style={{
              color: "#b85c3a",
              fontSize: "28px",
              marginBottom: "20px",
            }}
          />

          <p
            style={{
              margin: 0,
              fontFamily:
                "Georgia, 'Times New Roman', serif",
              fontSize: "24px",
              fontStyle: "italic",
              lineHeight: "1.5",
              color: "#4c3a2e",
            }}
          >
            Every book opens a door to another
            way of thinking.
          </p>

          <div
            style={{
              marginTop: "20px",
              color: "#8b7d72",
              fontSize: "10px",
              fontWeight: "800",
              letterSpacing: "2px",
            }}
          >
            AMAL OPEN LIBRARY
          </div>

        </div>

      </section>


      {/* =========================================
          FEATURED BOOKS
      ========================================= */}

      <section
        style={{
          padding: "30px 7% 100px",
        }}
      >

        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent:
                "space-between",
              marginBottom: "40px",
            }}
          >

            <div>

              <span
                style={{
                  color: "#b85c3a",
                  fontSize: "10px",
                  fontWeight: "800",
                  letterSpacing: "3px",
                }}
              >
                CURATED COLLECTION
              </span>

              <h2
                style={{
                  margin:
                    "12px 0 0",
                  fontFamily:
                    "Georgia, serif",
                  fontSize:
                    "clamp(40px, 5vw, 60px)",
                  fontWeight: "500",
                  letterSpacing: "-3px",
                }}
              >
                Featured{" "}
                <em
                  style={{
                    color: "#b85c3a",
                  }}
                >
                  reading
                </em>
              </h2>

            </div>

            <Link
              to="/library"
              style={{
                color: "#4c3a2e",
                textDecoration: "none",
                fontSize: "11px",
                fontWeight: "800",
              }}
            >
              View all →
            </Link>

          </div>

          <FeaturedBooks />

        </div>

      </section>


      {/* =========================================
          AMAL AI
      ========================================= */}

      <section
        style={{
          background:
            "linear-gradient(135deg,#251c17,#3b281f)",
          color: "#fff",
          padding: "90px 7%",
        }}
      >

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "70px",
            alignItems: "center",
          }}
        >

          <div>

            <span
              style={{
                color: "#d19b62",
                fontSize: "10px",
                fontWeight: "800",
                letterSpacing: "3px",
              }}
            >
              INTELLIGENT READING
            </span>

            <h2
              style={{
                margin:
                  "18px 0 20px",
                fontFamily:
                  "Georgia, serif",
                fontSize:
                  "clamp(45px, 5vw, 68px)",
                fontWeight: "500",
                lineHeight: ".95",
                letterSpacing: "-3px",
              }}
            >
              Don't just read.
              <br />

              <em
                style={{
                  color: "#d19b62",
                }}
              >
                Understand.
              </em>
            </h2>

            <p
              style={{
                maxWidth: "520px",
                color: "#b9aaa0",
                lineHeight: "1.8",
                fontSize: "14px",
              }}
            >
              Ask Amal AI about the book you're
              reading. Get explanations, summaries,
              important concepts and answers based
              on your selected book.
            </p>

            <button
              type="button"
              onClick={openAI}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                marginTop: "20px",
                padding: "15px 21px",
                border: 0,
                borderRadius: "4px",
                background: "#f0ddc1",
                color: "#2b201a",
                cursor: "pointer",
                fontWeight: "800",
                fontSize: "12px",
              }}
            >
              <FaRobot />
              Open Amal AI
              <FaArrowRight />
            </button>

          </div>


          {/* AI CARD */}

          <div
            style={{
              padding: "25px",
              border:
                "1px solid rgba(255,255,255,.12)",
              background:
                "rgba(255,255,255,.05)",
              borderRadius: "8px",
            }}
          >

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                paddingBottom: "20px",
                borderBottom:
                  "1px solid rgba(255,255,255,.1)",
              }}
            >

              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  background: "#d19b62",
                  color: "#2b201a",
                }}
              >
                <FaRobot />
              </div>

              <div>

                <strong
                  style={{
                    display: "block",
                    fontSize: "13px",
                  }}
                >
                  Amal AI
                </strong>

                <span
                  style={{
                    color: "#95877c",
                    fontSize: "10px",
                  }}
                >
                  Library Assistant
                </span>

              </div>

              <span
                style={{
                  marginLeft: "auto",
                  color: "#8eb49a",
                  fontSize: "9px",
                }}
              >
                ● Online
              </span>

            </div>


            <div
              style={{
                marginTop: "25px",
                marginLeft: "20%",
                padding: "13px",
                borderRadius:
                  "10px 10px 2px 10px",
                background: "#91472e",
                fontSize: "11px",
                lineHeight: "1.5",
              }}
            >
              What is the main idea of this
              book?
            </div>


            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >

              <div
                style={{
                  width: "30px",
                  height: "30px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  background: "#d19b62",
                  color: "#2b201a",
                  fontSize: "10px",
                }}
              >
                <FaRobot />
              </div>

              <div>

                <strong
                  style={{
                    display: "block",
                    color: "#d19b62",
                    fontSize: "10px",
                    marginBottom: "5px",
                  }}
                >
                  Amal AI
                </strong>

                <p
                  style={{
                    margin: 0,
                    color: "#b9aaa0",
                    fontSize: "11px",
                    lineHeight: "1.7",
                  }}
                >
                  I can explain the main ideas,
                  summarize the book or help you
                  understand a specific concept.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          LATEST BOOKS
      ========================================= */}

      <section
        style={{
          padding: "100px 7%",
        }}
      >

        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
            }}
          >

            <div>

              <span
                style={{
                  color: "#b85c3a",
                  fontSize: "10px",
                  fontWeight: "800",
                  letterSpacing: "3px",
                }}
              >
                FRESH FROM THE SHELF
              </span>

              <h2
                style={{
                  margin:
                    "12px 0 0",
                  fontFamily:
                    "Georgia, serif",
                  fontSize:
                    "clamp(40px, 5vw, 60px)",
                  fontWeight: "500",
                  letterSpacing: "-3px",
                }}
              >
                Recently{" "}
                <em
                  style={{
                    color: "#b85c3a",
                  }}
                >
                  added
                </em>
              </h2>

            </div>

            <Link
              to="/library"
              style={{
                color: "#4c3a2e",
                textDecoration: "none",
                fontSize: "11px",
                fontWeight: "800",
              }}
            >
              Explore collection →
            </Link>

          </div>

          <LatestBooks />

        </div>

      </section>


      {/* =========================================
          HOW IT WORKS
      ========================================= */}

      <section
        style={{
          padding: "80px 7% 100px",
          background: "#eee6da",
        }}
      >

        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
          }}
        >

          <span
            style={{
              color: "#b85c3a",
              fontSize: "10px",
              fontWeight: "800",
              letterSpacing: "3px",
            }}
          >
            SIMPLE BY DESIGN
          </span>

          <h2
            style={{
              margin:
                "15px 0 45px",
              fontFamily:
                "Georgia, serif",
              fontSize:
                "clamp(40px, 5vw, 60px)",
              fontWeight: "500",
              lineHeight: "1",
              letterSpacing: "-3px",
            }}
          >
            Your next book is
            <br />

            <em
              style={{
                color: "#b85c3a",
              }}
            >
              closer than you think.
            </em>
          </h2>

          <HowItWorks />

        </div>

      </section>


      {/* =========================================
          UPLOAD CTA
      ========================================= */}

      <section
        style={{
          padding: "90px 7%",
        }}
      >

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "65px 8%",
            background:
              "linear-gradient(135deg,#dbc4a3,#ead9bf)",
            position: "relative",
            overflow: "hidden",
          }}
        >

          <FaCloudUploadAlt
            style={{
              color: "#4c3a2e",
              fontSize: "35px",
              marginBottom: "20px",
            }}
          />

          <span
            style={{
              display: "block",
              color: "#b85c3a",
              fontSize: "10px",
              fontWeight: "800",
              letterSpacing: "3px",
            }}
          >
            GROW THE LIBRARY
          </span>

          <h2
            style={{
              margin:
                "15px 0",
              fontFamily:
                "Georgia, serif",
              fontSize:
                "clamp(40px, 5vw, 58px)",
              fontWeight: "500",
              letterSpacing: "-3px",
            }}
          >
            Have a book to share?
          </h2>

          <p
            style={{
              maxWidth: "500px",
              color: "#665344",
              lineHeight: "1.8",
              fontSize: "14px",
            }}
          >
            Help grow Amal Open Library by adding
            books and making knowledge easier to
            discover.
          </p>

          <Link
            to="/upload"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "11px",
              marginTop: "15px",
              padding: "15px 20px",
              background: "#241c17",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: "800",
            }}
          >
            <FaCloudUploadAlt />
            Upload a Book
            <FaArrowRight />
          </Link>

        </div>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

      <footer
        style={{
          background: "#211b17",
          color: "#fff",
          padding:
            "70px 7% 25px",
        }}
      >

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: "60px",
            paddingBottom: "50px",
          }}
        >

          {/* BRAND */}

          <div
            style={{
              display: "flex",
              gap: "15px",
            }}
          >

            <Link
              to="/"
              style={{
                width: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                border:
                  "1px solid #63554b",
                color: "#dfbd80",
                textDecoration: "none",
                fontFamily:
                  "Georgia, serif",
                fontSize: "16px",
              }}
            >
              AL
            </Link>

            <div>

              <h3
                style={{
                  margin:
                    "0 0 8px",
                  fontFamily:
                    "Georgia, serif",
                  fontSize: "22px",
                  fontWeight: "500",
                }}
              >
                Amal Open Library
              </h3>

              <p
                style={{
                  maxWidth: "320px",
                  margin: 0,
                  color: "#92857b",
                  fontSize: "11px",
                  lineHeight: "1.7",
                }}
              >
                A digital space for discovering,
                reading and understanding books.
              </p>

            </div>

          </div>


          {/* LINKS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, 1fr)",
              gap: "25px",
            }}
          >

            <div>

              <strong
                style={{
                  display: "block",
                  marginBottom: "17px",
                  color: "#d6c6b8",
                  fontSize: "10px",
                  letterSpacing: "2px",
                }}
              >
                LIBRARY
              </strong>

              <Link
                to="/library"
                style={footerLink}
              >
                Browse Books
              </Link>

              <Link
                to="/upload"
                style={footerLink}
              >
                Upload Book
              </Link>

            </div>


            <div>

              <strong
                style={{
                  display: "block",
                  marginBottom: "17px",
                  color: "#d6c6b8",
                  fontSize: "10px",
                  letterSpacing: "2px",
                }}
              >
                AI
              </strong>

              <button
                type="button"
                onClick={openAI}
                style={footerButton}
              >
                Amal AI
              </button>

            </div>


            <div>

              <strong
                style={{
                  display: "block",
                  marginBottom: "17px",
                  color: "#d6c6b8",
                  fontSize: "10px",
                  letterSpacing: "2px",
                }}
              >
                ACCOUNT
              </strong>

              <Link
                to="/login"
                style={footerLink}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={footerLink}
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingTop: "20px",
            borderTop:
              "1px solid #362d27",
            display: "flex",
            justifyContent:
              "space-between",
            color: "#756960",
            fontSize: "9px",
            letterSpacing: "1px",
          }}
        >

          <span>
            © {new Date().getFullYear()} Amal
            Open Library
          </span>

          <span>
            DISCOVER · READ · UNDERSTAND
          </span>

        </div>

      </footer>

    </div>
  );
}


/* =========================================
   FOOTER STYLES
========================================= */

const footerLink = {
  display: "block",
  marginBottom: "11px",
  color: "#8e8178",
  textDecoration: "none",
  fontSize: "11px",
};

const footerButton = {
  display: "block",
  marginBottom: "11px",
  padding: 0,
  border: 0,
  background: "transparent",
  color: "#8e8178",
  fontSize: "11px",
  cursor: "pointer",
};


export default Home;