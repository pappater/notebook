import React, { useState } from "react";
import GithubAuthButton from "./GithubAuthButton";
import "./HamburgerMenu.css";

function HamburgerMenu({ darkMode, onToken }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [iframeUrl, setIframeUrl] = useState(null);

  const links = [
    { name: "Yearify", url: "https://pappater.github.io/yearprogress/" },
    { name: "Blog", url: "https://pappater.github.io/blog/" },
    { name: "Articlay", url: "https://pappater.github.io/articlay/" },
  ];

  const openModal = () => {
    setModalOpen(true);
    setIframeUrl(null);
  };
  const closeModal = () => {
    setModalOpen(false);
    setIframeUrl(null);
  };
  const handleMenuClick = (url) => {
    setIframeUrl(url);
  };

  return (
    <>
      <button className="hamburger-btn" onClick={openModal}>
        <div className={`hamburger-icon ${modalOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      {modalOpen && (
        <div className="fullscreen-modal-overlay">
          <div className="fullscreen-modal-content">
            <div className="fullscreen-modal-left">
              <button className="iframe-modal-close" onClick={closeModal} style={{ fontSize: '6rem', lineHeight: '1', background: 'transparent', border: 'none', color: '#222', cursor: 'pointer', marginBottom: '48px', alignSelf: 'flex-start', fontWeight: 900, padding: 0 }}>×</button>
              <ul className="modal-menu-list">
                <li>
                  <GithubAuthButton
                    onToken={onToken}
                    className="modal-menu-btn"
                    style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 24, width: '100%', background: 'none', border: 'none', color: '#222', textAlign: 'left', padding: '18px 0', borderRadius: 8, letterSpacing: 1, cursor: 'pointer', transition: 'background 0.2s' }}
                  />
                </li>
                {links.map((link, idx) => (
                  <li key={idx}>
                    <button className="modal-menu-btn" onClick={() => handleMenuClick(link.url)}>{link.name}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fullscreen-modal-right">
              <div className="fullscreen-modal-header"></div>
              {iframeUrl && (
                <iframe
                  src={iframeUrl}
                  title="Application Viewer"
                  className="iframe-modal-frame"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: 0 }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default HamburgerMenu;
