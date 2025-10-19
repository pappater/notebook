import React, { useState, useEffect } from "react";
import "./App.css";
import Clock from "./components/Clock";
import HamburgerMenu from "./components/HamburgerMenu";
import TodoList from "./components/TodoList";
import NoteEditor from "./components/NoteEditor";

import GithubAuthButton from "./components/GithubAuthButton";

function App() {
  console.log("App component rendered");
  const [darkMode, setDarkMode] = useState(false);
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [githubToken, setGithubToken] = useState(null);
  const [gistId, setGistId] = useState(null);
  const [error, setError] = useState(null);
  const [userLogin, setUserLogin] = useState(null);
  // Add a flag to track when gist is loaded
  const [gistLoaded, setGistLoaded] = useState(false);

  // Always keep userLogin in sync with backend session
  useEffect(() => {
    fetch("https://notebook-8eyk.onrender.com/api/status", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user && data.user.login) {
          setUserLogin(data.user.login);
        }
      });
  }, []);

  const handleToken = (token) => {
    setGithubToken(token);
  };

  const loadOrCreateGist = (token, login) => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetch("https://api.github.com/gists", {
      headers: {
        Authorization: `token ${token}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch gists");
        return res.json();
      })
      .then((gists) => {
        let foundGistOwnedByUser = null;
        for (const gist of gists) {
          if (
            gist.files &&
            gist.files["notebook-data.json"] &&
            gist.owner &&
            gist.owner.login &&
            login &&
            gist.owner.login === login
          ) {
            foundGistOwnedByUser = gist;
            break;
          }
        }
        if (foundGistOwnedByUser) {
          setGistId(foundGistOwnedByUser.id);
          fetch(`https://api.github.com/gists/${foundGistOwnedByUser.id}`, {
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          })
            .then((res) => {
              if (!res.ok) throw new Error("Failed to fetch gist data");
              return res.json();
            })
            .then((gistData) => {
              const file = gistData.files["notebook-data.json"];
              if (file) {
                if (file.truncated) {
                  fetch(file.raw_url)
                    .then((res) => res.text())
                    .then((content) => {
                      try {
                        const parsed = JSON.parse(content);
                        if (isMounted) {
                          setTodos(parsed.todos || []);
                          setNotes(parsed.notes || []);
                          setCurrentNote(parsed.currentNote || null);
                          setLoading(false);
                          setGistLoaded(true);
                        }
                      } catch (e) {
                        setError("Failed to parse gist data.");
                        setLoading(false);
                      }
                    })
                    .catch((err) => {
                      setError("Failed to fetch truncated gist file.");
                      setLoading(false);
                    });
                } else if (file.content) {
                  try {
                    const parsed = JSON.parse(file.content);
                    if (isMounted) {
                      setTodos(parsed.todos || []);
                      setNotes(parsed.notes || []);
                      setCurrentNote(parsed.currentNote || null);
                      setLoading(false);
                      setGistLoaded(true);
                    }
                  } catch (e) {
                    setError("Failed to parse gist data.");
                    setLoading(false);
                  }
                } else {
                  setLoading(false);
                }
              } else {
                setLoading(false);
              }
            })
            .catch((err) => {
              setError(err.message);
              setLoading(false);
            });
        } else {
          // Only create a new gist if no owned gist exists
          fetch("https://api.github.com/gists", {
            method: "POST",
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public: false,
              files: {
                "notebook-data.json": {
                  content: JSON.stringify(
                    { todos: [], notes: [], currentNote: null },
                    null,
                    2
                  ),
                },
              },
              description: "Notebook App Data",
            }),
          })
            .then((res) => {
              if (!res.ok) throw new Error("Failed to create gist");
              return res.json();
            })
            .then((newGist) => {
              setGistId(newGist.id);
              setTodos([]);
              setNotes([]);
              setCurrentNote(null);
              setLoading(false);
              setGistLoaded(true);
            })
            .catch((err) => {
              setError(err.message);
              setLoading(false);
            });
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    // Save data to gist when todos or notes change
    console.log("Save-to-gist useEffect triggered:", {
      githubToken,
      gistId,
      todos,
      notes,
      currentNote,
    });
    if (githubToken && gistId && gistLoaded) {
      // Always send a valid content string for notebook-data.json
      const safeTodos = Array.isArray(todos) ? todos : [];
      const safeNotes = Array.isArray(notes) ? notes : [];
      const patchBody = {
        files: {
          "notebook-data.json": {
            content: JSON.stringify(
              { todos: safeTodos, notes: safeNotes, currentNote },
              null,
              2
            ),
          },
        },
      };
      console.log("PATCHING GIST", { token: githubToken, gistId, patchBody });
      fetch(`https://api.github.com/gists/${gistId}`, {
        method: "PATCH",
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patchBody),
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((errData) => {
              if (res.status === 409) {
                setError(
                  "You do not have permission to update this gist. Please contact support or log in with the correct account."
                );
                throw new Error(
                  "Failed to update gist: " + (errData.message || res.status)
                );
              } else {
                setError(
                  "Failed to update gist: " + (errData.message || res.status)
                );
                throw new Error(
                  "Failed to update gist: " + (errData.message || res.status)
                );
              }
            });
          }
        })
        .catch((err) => {
          // Error already handled above
          console.error("PATCH gist exception:", err);
        });
    }
  }, [todos, notes, currentNote, githubToken, gistId, gistLoaded]);

  // New useEffect to trigger loadOrCreateGist when both githubToken and userLogin are set
  useEffect(() => {
    if (githubToken && userLogin) {
      loadOrCreateGist(githubToken, userLogin);
    }
  }, [githubToken, userLogin]);

  // 1. Only fetch gists and create a new one after both githubToken and userLogin are set, and only if gistId is not set
  useEffect(() => {
    if (githubToken && userLogin && !gistId) {
      let isMounted = true;
      setLoading(true);
      setError(null);
      fetch("https://api.github.com/gists", {
        headers: {
          Authorization: `token ${githubToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch gists");
          return res.json();
        })
        .then((gists) => {
          let foundGistOwnedByUser = null;
          for (const gist of gists) {
            if (
              gist.files &&
              gist.files["notebook-data.json"] &&
              gist.owner &&
              gist.owner.login &&
              userLogin &&
              gist.owner.login === userLogin
            ) {
              foundGistOwnedByUser = gist;
              break;
            }
          }
          if (foundGistOwnedByUser) {
            setGistId(foundGistOwnedByUser.id);
            fetch(`https://api.github.com/gists/${foundGistOwnedByUser.id}`, {
              headers: {
                Authorization: `token ${githubToken}`,
                Accept: "application/vnd.github.v3+json",
              },
            })
              .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch gist data");
                return res.json();
              })
              .then((gistData) => {
                const file = gistData.files["notebook-data.json"];
                if (file) {
                  if (file.truncated) {
                    fetch(file.raw_url)
                      .then((res) => res.text())
                      .then((content) => {
                        try {
                          const parsed = JSON.parse(content);
                          if (isMounted) {
                            setTodos(parsed.todos || []);
                            setNotes(parsed.notes || []);
                            setCurrentNote(parsed.currentNote || null);
                            setLoading(false);
                            setGistLoaded(true);
                          }
                        } catch (e) {
                          setError("Failed to parse gist data.");
                          setLoading(false);
                        }
                      })
                      .catch((err) => {
                        setError("Failed to fetch truncated gist file.");
                        setLoading(false);
                      });
                  } else if (file.content) {
                    try {
                      const parsed = JSON.parse(file.content);
                      if (isMounted) {
                        setTodos(parsed.todos || []);
                        setNotes(parsed.notes || []);
                        setCurrentNote(parsed.currentNote || null);
                        setLoading(false);
                        setGistLoaded(true);
                      }
                    } catch (e) {
                      setError("Failed to parse gist data.");
                      setLoading(false);
                    }
                  } else {
                    setLoading(false);
                  }
                } else {
                  setLoading(false);
                }
              })
              .catch((err) => {
                setError(err.message);
                setLoading(false);
              });
          } else {
            // Only create a new gist if no owned gist exists
            fetch("https://api.github.com/gists", {
              method: "POST",
              headers: {
                Authorization: `token ${githubToken}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                public: false,
                files: {
                  "notebook-data.json": {
                    content: JSON.stringify(
                      { todos: [], notes: [], currentNote: null },
                      null,
                      2
                    ),
                  },
                },
                description: "Notebook App Data",
              }),
            })
              .then((res) => {
                if (!res.ok) throw new Error("Failed to create gist");
                return res.json();
              })
              .then((newGist) => {
                setGistId(newGist.id);
                setTodos([]);
                setNotes([]);
                setCurrentNote(null);
                setLoading(false);
                setGistLoaded(true);
              })
              .catch((err) => {
                setError(err.message);
                setLoading(false);
              });
          }
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
      return () => {
        isMounted = false;
      };
    }
  }, [githubToken, userLogin, gistId]);

  return (
    <div className={`app ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="header">
        <div
          style={{
            position: "fixed",
            top: "16px",
            right: "32px",
            zIndex: 1000,
          }}
        >
          <Clock />
        </div>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <HamburgerMenu darkMode={darkMode} onToken={handleToken} />
        </div>
      </div>
      <div className="main-content">
        {error && (
          <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        {loading ? (
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <div className="loader" style={{ fontSize: "1.5em" }}>
              Loading data...
            </div>
          </div>
        ) : (
          <div className="center-panel">
            <TodoList todos={todos} setTodos={setTodos} darkMode={darkMode} />
            <NoteEditor
              notes={notes}
              setNotes={setNotes}
              currentNote={currentNote}
              setCurrentNote={setCurrentNote}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
      <footer
        style={{
          width: "100%",
          textAlign: "right",
          padding: "12px 24px 8px 0",
        }}
      >
        <div>
          <span style={{ fontWeight: "bold", fontSize: "2em" }}>Notebook</span>
        </div>
        <div style={{ fontSize: "1em", color: "#888", marginTop: "2px" }}>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </footer>
    </div>
  );
}
export default App;
