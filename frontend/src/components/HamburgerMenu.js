import React, { useState } from "react";
import GithubAuthButton from "./GithubAuthButton";
import "./HamburgerMenu.css";

function HamburgerMenu({ darkMode, onToken }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openInModal = (url) => {
    setModalUrl(url);
    setIsOpen(false);
  };

  const closeModal = () => {
    setModalUrl(null);
  };

  const links = [
    { name: "Yearigy", url: "https://yearigy.com" },
    { name: "Blog", url: "https://blog.example.com" },
    { name: "Articlay", url: "https://articlay.com" },
  ];

  return (
    <>
      <button className="hamburger-btn" onClick={toggleMenu}>
        <div className={`hamburger-icon ${isOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`menu-overlay ${isOpen ? "open" : ""}`}>
        <div className="menu-content">
          <h2>My Applications</h2>
          <ul className="menu-links">
            {links.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => openInModal(link.url)}
                  className="menu-link-btn"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <GithubAuthButton onToken={onToken} />
          </div>
          <button className="close-menu" onClick={toggleMenu}>
            Close
          </button>
        </div>
      </div>

      {modalUrl && (
        <div className="iframe-modal-overlay" onClick={closeModal}>
          <div
            className="iframe-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="iframe-modal-header">
              <h3>Application Viewer</h3>
              <button className="iframe-modal-close" onClick={closeModal}>
                715
              </button>
            </div>
            <iframe
              src={modalUrl}
              title="Application Viewer"
              className="iframe-modal-frame"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default HamburgerMenu;
