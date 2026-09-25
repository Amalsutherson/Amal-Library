import "./UploadCTA.css";
import {
  FaCloudUploadAlt,
  FaBook,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

function UploadCTA() {
  return (
    <section className="upload-cta">
      <div className="upload-cta-container">

        {/* Left Content */}
        <div className="upload-cta-content">

          <span className="upload-cta-tag">
            📚 SHARE YOUR KNOWLEDGE
          </span>

          <h2>
            Have a Book to Share?
            <span> Make It Available to Everyone.</span>
          </h2>

          <p>
            Upload your books and help readers discover new knowledge,
            stories, and ideas. Build a collection that anyone can explore.
          </p>

          <div className="upload-features">

            <div className="upload-feature">
              <FaBook />
              <span>Share your books</span>
            </div>

            <div className="upload-feature">
              <FaUsers />
              <span>Reach readers</span>
            </div>

          </div>

          <button className="upload-cta-button">
            <FaCloudUploadAlt />
            Upload Your Book
            <FaArrowRight />
          </button>

        </div>

        {/* Right Visual */}
        <div className="upload-visual">

          <div className="upload-circle">
            <FaCloudUploadAlt />
          </div>

          <div className="floating-card card-one">
            📖
            <span>Share Books</span>
          </div>

          <div className="floating-card card-two">
            🌎
            <span>Reach Readers</span>
          </div>

          <div className="floating-card card-three">
            ⭐
            <span>Build Knowledge</span>
          </div>

        </div>

      </div>
    </section>
  );
}

export default UploadCTA;