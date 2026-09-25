import "./HowItWorks.css";

import {
  FaCloudUploadAlt,
  FaSearch,
  FaBookOpen,
  FaArrowRight,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaCloudUploadAlt />,
    title: "Upload a Book",
    description:
      "Share a book with the Amal Open Library community by adding its cover, PDF, and important details.",
  },
  {
    id: 2,
    icon: <FaSearch />,
    title: "Discover",
    description:
      "Explore the collection and find books by title, author, category, or language.",
  },
  {
    id: 3,
    icon: <FaBookOpen />,
    title: "Read & Enjoy",
    description:
      "Open a book online and enjoy reading your favorite titles from anywhere.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works">

      {/* HEADER */}
      <div className="how-header">

        <span className="how-tag">
          SIMPLE & EASY
        </span>

        <h2>
          How Amal Open Library Works
        </h2>

        <p>
          Discover, share, and read books through a simple
          experience built for everyone.
        </p>

      </div>


      {/* STEPS */}
      <div className="steps-container">

        {steps.map((step, index) => (
          <div
            className="step-wrapper"
            key={step.id}
          >

            <div className="step-card">

              <span className="step-number">
                {String(step.id).padStart(2, "0")}
              </span>

              <div className="step-icon">
                {step.icon}
              </div>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.description}
              </p>

            </div>


            {index < steps.length - 1 && (
              <FaArrowRight className="step-arrow" />
            )}

          </div>
        ))}

      </div>

    </section>
  );
}

export default HowItWorks;