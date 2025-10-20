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

  const [collapsed, setCollapsed] = useState(true);

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
            <div
              className="fullscreen-modal-left"
              style={{
                width: collapsed ? "80px" : "340px",
                transition: "width 0.3s",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                  position: "relative",
                }}
              >
                <button
                  className="iframe-modal-close"
                  onClick={closeModal}
                  style={{
                    fontSize: "6rem",
                    lineHeight: "1",
                    background: "transparent",
                    border: "none",
                    color: "#222",
                    cursor: "pointer",
                    marginBottom: collapsed ? "8px" : "32px",
                    alignSelf: "flex-start",
                    fontWeight: 900,
                    padding: 0,
                  }}
                >
                  ×
                </button>
                {!collapsed && (
                  <button
                    className="collapse-menu-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setCollapsed(true);
                    }}
                    style={{
                      fontSize: "2.2rem",
                      background: "transparent",
                      border: "none",
                      color: "#222",
                      cursor: "pointer",
                      marginTop: "40px",
                      alignSelf: "flex-start",
                      fontWeight: 700,
                      padding: 0,
                    }}
                    aria-label="Collapse menu"
                  >
                    ▲
                  </button>
                )}
              </div>
              {collapsed && (
                <button
                  className="expand-menu-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setCollapsed(false);
                  }}
                  style={{
                    fontSize: "2.2rem",
                    background: "transparent",
                    border: "none",
                    color: "#222",
                    cursor: "pointer",
                    marginTop: "40px",
                    marginBottom: "32px",
                    alignSelf: "flex-start",
                    fontWeight: 700,
                    padding: 0,
                  }}
                  aria-label="Expand menu"
                >
                  ▼
                </button>
              )}
              <ul className="modal-menu-list" style={{ paddingLeft: 0 }}>
                <li>
                  <div
                    className="modal-menu-btn"
                    style={{
                      fontSize: collapsed ? "3.2rem" : "2rem",
                      fontWeight: 900,
                      marginBottom: 24,
                      width: "100%",
                      background: "none",
                      border: "none",
                      color: "#222",
                      textAlign: "left",
                      padding: "18px 0",
                      borderRadius: 8,
                      letterSpacing: 1,
                      cursor: "pointer",
                      transition: "background 0.2s",
                      position: "relative",
                    }}
                  >
                    {collapsed ? (
                      <span title="GitHub Login" style={{ cursor: "pointer" }}>
                        G
                      </span>
                    ) : (
                      <GithubAuthButton
                        onToken={onToken}
                        className="modal-menu-btn"
                        style={{
                          fontSize: "2rem",
                          fontWeight: 700,
                          marginBottom: 24,
                          width: "100%",
                          background: "none",
                          border: "none",
                          color: "#222",
                          textAlign: "left",
                          padding: "18px 0",
                          borderRadius: 8,
                          letterSpacing: 1,
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                      />
                    )}
                  </div>
                </li>
                {links.map((link, idx) => (
                  <li key={idx}>
                    <button
                      className="modal-menu-btn"
                      onClick={() => handleMenuClick(link.url)}
                      style={{
                        fontSize: collapsed ? "3.2rem" : "2rem",
                        fontWeight: 900,
                        marginBottom: 24,
                        width: "100%",
                        background: "none",
                        border: "none",
                        color: "#222",
                        textAlign: "left",
                        padding: "18px 0",
                        borderRadius: 8,
                        letterSpacing: 1,
                        cursor: "pointer",
                        transition: "background 0.2s",
                        position: "relative",
                      }}
                      title={collapsed ? link.name : undefined}
                    >
                      {collapsed ? link.name[0] : link.name}
                    </button>
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
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: 0,
                  }}
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
