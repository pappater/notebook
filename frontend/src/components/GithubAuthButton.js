import React, { useEffect, useState } from "react";
console.log("GithubAuthButton component loaded");

const BACKEND_URL = "https://notebook-8eyk.onrender.com";

function GithubAuthButton({ onLogin, onLogout, onToken, darkMode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("GithubAuthButton useEffect running");
    fetch(`${BACKEND_URL}/api/status`, {
      credentials: "include",
    })
      .then((res) => {
        console.log(
          "GithubAuthButton /api/status response status:",
          res.status
        );
        return res.json();
      })
      .then((data) => {
        console.log("GithubAuthButton /api/status response data:", data);
        setLoggedIn(data.logged_in);
        setUser(data.user || null);
        if (data.logged_in) {
          if (onLogin) onLogin(data.user);
          if (onToken && data.token) {
            console.log(
              "GithubAuthButton: passing token to onToken:",
              data.token
            );
            onToken(data.token);
          }
        }
        if (!data.logged_in && onLogout) onLogout();
      })
      .catch((err) => {
        console.error("GithubAuthButton /api/status fetch error:", err);
      });
  }, [onLogin, onLogout, onToken]);

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/login/github`;
  };

  const handleLogout = () => {
    fetch(`${BACKEND_URL}/logout`, {
      credentials: "include",
    })
      .then(() => {
        setLoggedIn(false);
        setUser(null);
        if (onLogout) onLogout();
        // Only redirect, do not fetch / again
        window.location.href = "https://pappater.github.io/notebook";
      })
      .catch(() => {
        // Always redirect even if logout API fails
        window.location.href = "https://pappater.github.io/notebook/";
      });
  };

  if (loggedIn && user) {
    return (
      <div
        className="modal-menu-btn"
        onClick={handleLogout}
        style={{
          cursor: "pointer",
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: 24,
          width: "100%",
          background: "none",
          border: "none",
          color: darkMode ? "#fff" : "#222",
          textAlign: "left",
          padding: "18px 0",
          borderRadius: 8,
          letterSpacing: 1,
          transition: "background 0.2s",
        }}
        tabIndex={0}
        role="button"
      >
        Logout with GitHub ({user.login})
      </div>
    );
  }
  return (
    <div
      className="modal-menu-btn"
      onClick={handleLogin}
      style={{
        cursor: "pointer",
        fontSize: "2rem",
        fontWeight: 700,
        marginBottom: 24,
        width: "100%",
        background: "none",
        border: "none",
        color: darkMode ? "#fff" : "#222",
        textAlign: "left",
        padding: "18px 0",
        borderRadius: 8,
        letterSpacing: 1,
        transition: "background 0.2s",
      }}
      tabIndex={0}
      role="button"
    >
      Login with GitHub
    </div>
  );
}

export default GithubAuthButton;
