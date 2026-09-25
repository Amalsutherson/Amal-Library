import {
  FaBookOpen,
  FaRobot,
  FaCode,
  FaDatabase,
  FaCloudUploadAlt,
  FaGlobe,
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import "./About.css";

import amalProfile from "../../assets/amal.png";

function About() {
  return (
    <main className="about-page">

      {/* =========================================
          ABOUT AMAL HERO
      ========================================= */}

      <section className="amal-hero">

        <div className="amal-hero-content">

          <span className="about-small-label">
            THE PERSON BEHIND AMAL OPEN LIBRARY
          </span>

          <h1>
            Hello, I'm
            <br />
            <span>Amal.</span>
          </h1>

          <p className="amal-intro">
            I'm a software developer and the creator of
            Amal Open Library — a personal project built
            around books, technology, learning, and the
            idea of making knowledge easier to explore.
          </p>

          <div className="amal-role">
            <FaCode />
            <span>
              Software Developer | API & Integration | Python
            </span>
          </div>

        </div>


        {/* Amal Image */}

        <div className="amal-photo-container">

          <div className="amal-photo-decoration"></div>

          <div className="amal-photo">

            <img
              src={amalProfile}
              alt="Amal - Creator of Amal Open Library"
            />

          </div>

          <div className="amal-photo-caption">
            <strong>Amal</strong>
            <span>Creator of Amal Open Library</span>
          </div>

        </div>

      </section>


      {/* =========================================
          ABOUT AMAL
      ========================================= */}

      <section className="about-amal-section">

        <div className="about-amal-heading">

          <span className="about-small-label">
            ABOUT AMAL
          </span>

          <h2>
            A developer who loves
            <br />
            building useful things.
          </h2>

        </div>


        <div className="about-amal-content">

          <p>
            I'm Amal, a Computer Applications graduate and
            software developer from Tamil Nadu, India.
            My professional work has mainly focused on API
            development, integration, and enterprise
            application platforms.
          </p>

          <p>
            My experience includes working with WSO2 API
            Manager, WSO2 Micro Integrator, Joget, REST APIs,
            SOAP services, SQL, MySQL, Java, JavaScript,
            Python, and Django.
          </p>

          <p>
            While working with APIs and integration systems,
            I became increasingly interested in Python,
            backend development, automation, and AI.
            Amal Open Library is one of the projects where
            I can bring those interests together.
          </p>

        </div>

      </section>


      {/* =========================================
          DEVELOPER JOURNEY
      ========================================= */}

      <section className="amal-journey">

        <div className="journey-heading">

          <span className="about-small-label">
            MY JOURNEY
          </span>

          <h2>
            From learning to building
          </h2>

          <p>
            Technology has been a continuous learning journey
            for me — from software development and APIs to
            Python and AI-powered applications.
          </p>

        </div>


        <div className="journey-grid">

          <div className="journey-card">

            <div className="journey-icon">
              <FaGraduationCap />
            </div>

            <span>01</span>

            <h3>
              Computer Science
            </h3>

            <p>
              Completed a Bachelor of Computer Applications
              and developed a strong foundation in programming,
              databases, and software development.
            </p>

          </div>


          <div className="journey-card">

            <div className="journey-icon">
              <FaCode />
            </div>

            <span>02</span>

            <h3>
              Software Development
            </h3>

            <p>
              Worked on enterprise applications, API
              development, integration services, and
              application platforms.
            </p>

          </div>


          <div className="journey-card">

            <div className="journey-icon">
              <FaDatabase />
            </div>

            <span>03</span>

            <h3>
              APIs & Integration
            </h3>

            <p>
              Built and worked with REST and SOAP APIs,
              authentication, data transformation,
              integration flows, and databases.
            </p>

          </div>


          <div className="journey-card">

            <div className="journey-icon">
              <FaRobot />
            </div>

            <span>04</span>

            <h3>
              Python & AI
            </h3>

            <p>
              Exploring Python, Django, AI, and modern
              application development to build more useful
              software experiences.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          WHY I BUILT THE LIBRARY
      ========================================= */}

      <section className="why-amal">

        <div className="why-amal-number">
          01
        </div>

        <div className="why-amal-content">

          <span className="about-small-label">
            WHY I BUILT THIS
          </span>

          <h2>
            Amal Open Library started
            with a simple idea.
          </h2>

          <p>
            I wanted to build something that combines
            software development with learning and books.
          </p>

          <p>
            Instead of creating just another demonstration
            project, I wanted to build a complete application
            where users can discover books, upload resources,
            read online, and interact with AI.
          </p>

          <p>
            The library is also a practical way for me to
            continue improving my skills in React, Django,
            REST APIs, databases, authentication, file
            handling, and AI integration.
          </p>

        </div>

      </section>


      {/* =========================================
          AMAL AI
      ========================================= */}

      <section className="amal-ai-section">

        <div className="amal-ai-visual">

          <div className="ai-orbit ai-orbit-one"></div>

          <div className="ai-orbit ai-orbit-two"></div>

          <div className="amal-ai-avatar">

            <FaRobot />

            <span>AI</span>

          </div>

        </div>


        <div className="amal-ai-content">

          <span className="about-small-label">
            BUILT INTO THE LIBRARY
          </span>

          <h2>
            Meet Amal AI.
          </h2>

          <p>
            Amal AI is the intelligent assistant inside
            Amal Open Library.
          </p>

          <p>
            It is designed to make the library more
            interactive by allowing users to ask questions,
            explore information, and interact with books
            through AI.
          </p>

          <div className="ai-features">

            <div>
              <FaRobot />
              <span>AI-powered conversations</span>
            </div>

            <div>
              <FaBookOpen />
              <span>Book-focused assistance</span>
            </div>

            <div>
              <FaGlobe />
              <span>Interactive learning</span>
            </div>

          </div>

        </div>

      </section>


      {/* =========================================
          WHAT AMAL OPEN LIBRARY OFFERS
      ========================================= */}

      <section className="about-platform">

        <div className="platform-heading">

          <span className="about-small-label">
            AMAL OPEN LIBRARY
          </span>

          <h2>
            More than a collection of books.
          </h2>

          <p>
            The platform brings books, reading,
            technology, and AI together.
          </p>

        </div>


        <div className="platform-grid">

          <div className="platform-item">

            <FaBookOpen />

            <h3>
              Discover
            </h3>

            <p>
              Find books through the growing digital
              collection.
            </p>

          </div>


          <div className="platform-item">

            <FaCloudUploadAlt />

            <h3>
              Contribute
            </h3>

            <p>
              Upload books and help expand the collection.
            </p>

          </div>


          <div className="platform-item">

            <FaRobot />

            <h3>
              Interact
            </h3>

            <p>
              Use Amal AI to explore books in a more
              interactive way.
            </p>

          </div>


          <div className="platform-item">

            <FaGlobe />

            <h3>
              Learn
            </h3>

            <p>
              Explore knowledge from different subjects
              and categories.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          PERSONAL MESSAGE
      ========================================= */}

      <section className="amal-message">

        <div className="amal-message-mark">
          "
        </div>

        <h2>
          Keep learning.
          <br />
          Keep building.
          <br />
          Keep sharing.
        </h2>

        <p>
          That's the idea behind Amal Open Library.
        </p>

      </section>


      {/* =========================================
          LINKS
      ========================================= */}

      <section className="amal-links">

        <span className="about-small-label">
          FIND AMAL ONLINE
        </span>

        <div className="amal-social-links">

          <a
            href="https://github.com/Amalsutherson"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/amalsutherson/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
            LinkedIn
          </a>

        </div>

      </section>

    </main>
  );
}

export default About;