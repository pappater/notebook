import React, { useEffect, useState } from "react";
console.log("GithubAuthButton component loaded");

const BACKEND_URL = "https://notebook-8eyk.onrender.com";

function GithubAuthButton({ onLogin, onLogout, onToken }) {
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
        window.location.href = "http://localhost:3000/";
      })
      .catch(() => {
        // Always redirect even if logout API fails
        window.location.href = "http://localhost:3000/";
      });
  };

  if (loggedIn && user) {
    return (
      <button onClick={handleLogout} style={{ margin: "10px" }}>
        Logout with GitHub ({user.login})
      </button>
    );
  }
  return (
    <button onClick={handleLogin} style={{ margin: "10px" }}>
      Login with GitHub
    </button>
  );
}

export default GithubAuthButton;
