import { FaInstagram, FaEnvelope, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      
      {/* TOP BLUE SECTION */}
      <div className="footer-top">
        <div className="footer-icons">
  <FaInstagram />
  <FaEnvelope />
  <FaYoutube />
  <FaXTwitter />
</div>

        <div className="footer-links">
          <a>About</a>
          <a>Contact Us</a>
          <a>Terms & Conditions</a>
          <a>Privacy Policy</a>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="footer-bottom">
        <p>© 2026 Purnyx Entertainment Pvt. Ltd. | All Rights Reserved</p>
        <p>
          235, Binnamangala, 2nd Floor, 13th Cross Road, 2nd Stage,
          Indira Nagar, Bengaluru - 560038, Bharat (India)
        </p>
      </div>

    </footer>
  );
};

export default Footer;