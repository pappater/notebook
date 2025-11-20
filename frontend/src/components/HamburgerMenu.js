import React, { useState } from "react";
import GithubAuthButton from "./GithubAuthButton";
import "./HamburgerMenu.css";

function HamburgerMenu({ darkMode, onToken }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;
  const [modalOpen, setModalOpen] = useState(false);
  // Default to Articlay URL
  const links = [
    { name: "Articlay", url: "https://pappater.github.io/articlay/" },
    { name: "Niche", url: "https://pappater.github.io/niche/" },
    { name: "Yearify", url: "https://pappater.github.io/yearprogress/" },
    { name: "Blog", url: "https://pappater.github.io/blog/" },
    { name: "Mockpoet", url: "https://pappater.github.io/mockpoet/" },
    { name: "Horse", url: "https://pappater.github.io/horse/" },
    { name: "Fish", url: "https://pappater.github.io/fish/" },
  ];
  const defaultMenuIdx = 0; // Articlay
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

  // On mobile, always show full menu names (collapsed = false), on desktop allow collapse/expand
  const [collapsed, setCollapsed] = useState(!isMobile);

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
        <div
          className={`fullscreen-modal-overlay ${
            darkMode ? "dark-mode" : "light-mode"
          }`}
        >
          <div
            className="fullscreen-modal-content"
            style={
              isMobile
                ? {
                    flexDirection: "column",
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                  }
                : {}
            }
          >
            <div
              className="fullscreen-modal-left"
              style={
                isMobile
                  ? {
                      width: "100vw",
                      minWidth: 0,
                      maxWidth: "100vw",
                      padding: "16px 4px 8px 4px",
                      borderRight: "none",
                      borderBottom: "1px solid #ddd",
                      minHeight: "unset",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      overflowX: "auto",
                      overflowY: "hidden",
                      maxHeight: 80,
                      transition: "none",
                    }
                  : {
                      width: collapsed ? "80px" : "340px",
                      transition: "width 0.3s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minHeight: "100vh",
                      boxSizing: "border-box",
                      position: "relative",
                    }
              }
            >
              {/* Sticky X and expand/collapse buttons at top */}
              <div
                style={{
                  width: "100%",
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                  background: darkMode ? "#23232a" : "#f5f5f5",
                  display: "flex",
                  flexDirection: collapsed ? "column" : "row",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "space-between",
                  paddingTop: isMobile ? 0 : "16px",
                  paddingBottom: isMobile ? 0 : collapsed ? "8px" : "16px",
                  paddingLeft: isMobile ? 0 : "8px",
                  paddingRight: isMobile ? 0 : "8px",
                }}
              >
                <button
                  className="iframe-modal-close"
                  onClick={closeModal}
                  style={{
                    fontSize: "6rem",
                    background: "transparent",
                    border: "none",
                    color: darkMode ? "#f3f3f3" : "#222",
                    cursor: "pointer",
                    marginBottom: collapsed ? "8px" : 0,
                    marginTop: 0,
                    marginLeft: isMobile ? 0 : collapsed ? 0 : "8px",
                    fontWeight: 900,
                    padding: 0,
                    display: "block",
                  }}
                >
                  ×
                </button>
                {/* Only show collapse/expand on desktop */}
                {!isMobile && !collapsed && (
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
                      color: darkMode ? "#f3f3f3" : "#222",
                      cursor: "pointer",
                      marginTop: 0,
                      marginBottom: 0,
                      fontWeight: 700,
                      padding: 0,
                    }}
                    aria-label="Collapse menu"
                  >
                    ▲
                  </button>
                )}
                {!isMobile && collapsed && (
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
                      color: darkMode ? "#f3f3f3" : "#222",
                      cursor: "pointer",
                      marginTop: 0,
                      marginBottom: 0,
                      fontWeight: 700,
                      padding: 0,
                      display: "block",
                    }}
                    aria-label="Expand menu"
                  >
                    ▼
                  </button>
                )}
              </div>
              {/* Scrollable menu list below sticky header */}
              <div
                style={{
                  width: "100%",
                  flex: 1,
                  overflowY: !isMobile ? "auto" : "hidden",
                }}
              >
                <ul
                  className="modal-menu-list"
                  style={
                    isMobile
                      ? {
                          flexDirection: "row",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          width: "100%",
                          padding: 0,
                          margin: 0,
                          overflowX: "auto",
                          overflowY: "hidden",
                          maxWidth: "100vw",
                        }
                      : { paddingLeft: 0 }
                  }
                >
                  <li>
                    {!isMobile && collapsed ? (
                      <div
                        className="modal-menu-btn"
                        style={{
                          fontSize: "3.2rem",
                          fontWeight: 900,
                          marginBottom: 24,
                          width: "100%",
                          background: "none",
                          border: "none",
                          color: darkMode ? "#f3f3f3" : "#222",
                          textAlign: "left",
                          padding: "18px 0",
                          borderRadius: 8,
                          letterSpacing: 1,
                          cursor: "pointer",
                          transition: "background 0.2s",
                          position: "relative",
                        }}
                      >
                        <span
                          title="GitHub Login"
                          style={{ cursor: "pointer" }}
                        >
                          G
                        </span>
                      </div>
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
                          color: darkMode ? "#f3f3f3" : "#222",
                          textAlign: "left",
                          padding: "18px 0",
                          borderRadius: 8,
                          letterSpacing: 1,
                          cursor: "pointer",
                          transition: "background 0.2s",
                        }}
                      />
                    )}
                  </li>
                  {links.map((link, idx) => (
                    <li key={idx}>
                      <button
                        className={`modal-menu-btn${
                          selectedIdx === idx ? " selected" : ""
                        }`}
                        onClick={() => handleMenuClick(link.url, idx)}
                        style={{
                          fontSize: !isMobile && collapsed ? "3.2rem" : "2rem",
                          fontWeight: 900,
                          marginBottom: 4,
                          width: "100%",
                          background: selectedIdx === idx ? "#e0e7ff" : "none",
                          border:
                            selectedIdx === idx ? "2px solid #6366f1" : "none",
                          color:
                            selectedIdx === idx
                              ? darkMode
                                ? "#fff"
                                : "#3730a3"
                              : darkMode
                              ? "#f3f3f3"
                              : "#222",
                          textAlign: "left",
                          padding: selectedIdx === idx ? "18px 18px" : "18px 0",
                          borderRadius: 8,
                          letterSpacing: 1,
                          cursor: "pointer",
                          transition:
                            "background 0.2s, border 0.2s, color 0.2s, padding 0.2s",
                          position: "relative",
                        }}
                        title={!isMobile && collapsed ? link.name : undefined}
                      >
                        {!isMobile && collapsed ? (
                          <span title={link.name}>{link.name[0]}</span>
                        ) : (
                          link.name
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              className="fullscreen-modal-right"
              style={
                isMobile
                  ? {
                      flex: 1,
                      width: "100vw",
                      minWidth: 0,
                      maxWidth: "100vw",
                      height: "calc(100vh - 80px)",
                      minHeight: 0,
                      overflow: "auto",
                    }
                  : {}
              }
            >
              {iframeUrl && (
                <iframe
                  src={iframeUrl}
                  title="Application Viewer"
                  className="iframe-modal-frame"
                  style={
                    isMobile
                      ? {
                          width: "100vw",
                          height: "100%",
                          minWidth: 0,
                          minHeight: 0,
                          borderRadius: 0,
                          display: "block",
                          border: "none",
                        }
                      : {
                          width: "100%",
                          height: "100%",
                          border: "none",
                          borderRadius: 0,
                        }
                  }
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
