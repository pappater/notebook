import React, { useState } from "react";
import GithubAuthButton from "./GithubAuthButton";
import "./HamburgerMenu.css";

function HamburgerMenu({ darkMode, onToken }) {
  const [modalOpen, setModalOpen] = useState(false);
  // Default to Articlay URL
  const links = [
    { name: "Yearify", url: "https://pappater.github.io/yearprogress/" },
    { name: "Blog", url: "https://pappater.github.io/blog/" },
    { name: "Articlay", url: "https://pappater.github.io/articlay/" },
  ];
  const defaultMenuIdx = 2; // Articlay
  const [iframeUrl, setIframeUrl] = useState(links[defaultMenuIdx].url);
  const [selectedIdx, setSelectedIdx] = useState(defaultMenuIdx);

  const openModal = () => {
    setModalOpen(true);
    setIframeUrl(links[defaultMenuIdx].url); // Default to Articlay
  };
  const closeModal = () => {
    setModalOpen(false);
    setIframeUrl(null);
  };
  const handleMenuClick = (url, idx) => {
    setIframeUrl(url);
    setSelectedIdx(idx);
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
                    background: "transparent",
                    border: "none",
                    color: "#222",
                    cursor: "pointer",
                    marginBottom: collapsed ? "56px" : "32px",
                    marginTop: collapsed ? "0px" : 0,
                    marginLeft: collapsed ? "8px" : 0,
                    alignSelf: collapsed ? "flex-start" : "flex-start",
                    fontWeight: 900,
                    padding: 0,
                    display: "block",
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
                    setCollapsed(false);
                  }}
                  style={{
                    fontSize: "2.2rem",
                    background: "transparent",
                    border: "none",
                    color: "#222",
                    cursor: "pointer",
                    marginTop: "32px",
                    marginBottom: "32px",
                    alignSelf: "center",
                    fontWeight: 700,
                    padding: 0,
                    display: "block",
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
                      className={`modal-menu-btn${
                        selectedIdx === idx ? " selected" : ""
                      }`}
                      onClick={() => handleMenuClick(link.url, idx)}
                      style={{
                        fontSize: collapsed ? "3.2rem" : "2rem",
                        fontWeight: 900,
                        marginBottom: 4,
                        width: "100%",
                        background: selectedIdx === idx ? "#e0e7ff" : "none",
                        border:
                          selectedIdx === idx ? "2px solid #6366f1" : "none",
                        color: selectedIdx === idx ? "#3730a3" : "#222",
                        textAlign: "left",
                        padding: selectedIdx === idx ? "18px 18px" : "18px 0",
                        borderRadius: 8,
                        letterSpacing: 1,
                        cursor: "pointer",
                        transition:
                          "background 0.2s, border 0.2s, color 0.2s, padding 0.2s",
                        position: "relative",
                      }}
                      title={collapsed ? link.name : undefined}
                    >
                      {collapsed ? (
                        <span title={link.name}>{link.name[0]}</span>
                      ) : (
                        link.name
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fullscreen-modal-right">
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
