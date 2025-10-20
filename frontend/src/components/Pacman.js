import React, { useRef, useEffect, useState } from "react";

// Minimal Pacman game using canvas
function Pacman() {
  // Pacman speed control
  const pacmanFrame = useRef(0);
  const PACMAN_SPEED_FRAMES = 12; // Move every 12 frames (slower)
  // Ghost speed control
  const ghostFrame = useRef(0);
  const GHOST_SPEED_FRAMES = 18; // Move every 18 frames (even slower)
  // Helper to check if Pacman or ghost can move to a tile
  function canMove(x, y) {
    return maze[y] && maze[y][x] && maze[y][x] !== "#";
  }
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(true);

  // Maze layout (simple grid)
  // Bigger maze layout
  const maze = [
    "############################",
    "#..........##..............#",
    "#.####.##.#.####.##.####..#",
    "#.#  #.##.#.#  #.##.#  #..#",
    "#.#  #.##.#.#  #.##.#  #..#",
    "#.####.##.#.####.##.####..#",
    "#..........................#",
    "#.####.##.#.####.##.####..#",
    "#.#  #.##.#.#  #.##.#  #..#",
    "#.#  #.##.#.#  #.##.#  #..#",
    "#.####.##.#.####.##.####..#",
    "#..........................#",
    "############################"
  ];
  // Responsive tile size based on screen width
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 640;
  const cols = maze[0].length;
  const rows = maze.length;
  const tileSize = Math.floor((screenWidth - 40) / cols); // fill most of screen width

  // Pacman state
  const pacman = useRef({ x: 1, y: 1, dx: 1, dy: 0, radius: tileSize * 1.1 });
  // Ghosts
  const ghosts = useRef([
    { x: Math.floor(cols / 2), y: Math.floor(rows / 2), color: "#f43f5e", dx: 0, dy: 1 },
    { x: Math.floor(cols / 2) + 2, y: Math.floor(rows / 2), color: "#06b6d4", dx: 1, dy: 0 }
  ]);
  // Pellets
  const pellets = useRef([]);

  // Initialize pellets
  useEffect(() => {
    let newPellets = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Place a pellet on every open tile except walls
        if (maze[r][c] !== "#") {
          newPellets.push({ x: c, y: r, eaten: false });
        }
      }
    }
    pellets.current = newPellets;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    function drawMaze() {
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (maze[r][c] === "#") {
            ctx.fillStyle = "#222";
            ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
          }
        }
      }
    }

    function drawPacman() {
      const px = pacman.current.x * tileSize + tileSize / 2;
      const py = pacman.current.y * tileSize + tileSize / 2;
      let startAngle = 0.25 * Math.PI;
      let endAngle = 1.75 * Math.PI;
      if (!mouthOpen) {
        startAngle = 0.05 * Math.PI;
        endAngle = 1.95 * Math.PI;
      }
      ctx.save();
      ctx.beginPath();
  ctx.arc(px, py, pacman.current.radius, startAngle, endAngle, false);
      ctx.lineTo(px, py);
      ctx.closePath();
      ctx.fillStyle = "#ffe600";
      ctx.fill();
      ctx.restore();
      // Eye
      ctx.beginPath();
      ctx.arc(px + 5, py - 5, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#222";
      ctx.fill();
    }

    function drawPellets() {
      pellets.current.forEach((pellet) => {
        if (!pellet.eaten) {
          ctx.beginPath();
          ctx.arc(
            pellet.x * tileSize + tileSize / 2,
            pellet.y * tileSize + tileSize / 2,
            3,
            0,
            2 * Math.PI
          );
          ctx.fillStyle = "#fff";
          ctx.fill();
        }
      });
    }

    function drawGhosts() {
      ghosts.current.forEach((ghost) => {
        const gx = ghost.x * tileSize + tileSize / 2;
        const gy = ghost.y * tileSize + tileSize / 2;
        ctx.beginPath();
  ctx.arc(gx, gy, tileSize * 0.7, Math.PI, 2 * Math.PI);
  ctx.lineTo(gx + tileSize * 0.7, gy + tileSize * 0.7);
  ctx.lineTo(gx - tileSize * 0.7, gy + tileSize * 0.7);
        ctx.closePath();
        ctx.fillStyle = ghost.color;
        ctx.fill();
        // Eyes
        ctx.beginPath();
        ctx.arc(gx - 3, gy - 2, 2, 0, 2 * Math.PI);
        ctx.arc(gx + 3, gy - 2, 2, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(gx - 3, gy - 2, 1, 0, 2 * Math.PI);
        ctx.arc(gx + 3, gy - 2, 1, 0, 2 * Math.PI);
        ctx.fillStyle = "#222";
        ctx.fill();
      });
    }

    function clear() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }


    function update() {
      if (gameOver) return;
      clear();
      drawMaze();
      drawPellets();
      drawGhosts();
      drawPacman();

      // Animate mouth
      setMouthOpen((m) => !m);

      // Move Pacman (slow down)
      pacmanFrame.current = (pacmanFrame.current + 1) % PACMAN_SPEED_FRAMES; // Move every 12 frames
      if (pacmanFrame.current === 0) {
        let nx = pacman.current.x + pacman.current.dx;
        let ny = pacman.current.y + pacman.current.dy;
        if (canMove(nx, ny)) {
          pacman.current.x = nx;
          pacman.current.y = ny;
        }
      }

      // Pellet collision
      pellets.current.forEach((pellet) => {
        if (!pellet.eaten && pellet.x === pacman.current.x && pellet.y === pacman.current.y) {
          pellet.eaten = true;
          setScore((s) => s + 10);
        }
      });

      // Ghost movement (chase Pacman, slow down)
      ghostFrame.current = (ghostFrame.current + 1) % GHOST_SPEED_FRAMES; // Move every 18 frames
      if (ghostFrame.current === 0) {
        ghosts.current.forEach((ghost) => {
          let directions = [
            { dx: 1, dy: 0 },
            { dx: -1, dy: 0 },
            { dx: 0, dy: 1 },
            { dx: 0, dy: -1 }
          ];
          // Sort directions by distance to Pacman
          directions.sort((a, b) => {
            const da = Math.hypot((ghost.x + a.dx) - pacman.current.x, (ghost.y + a.dy) - pacman.current.y);
            const db = Math.hypot((ghost.x + b.dx) - pacman.current.x, (ghost.y + b.dy) - pacman.current.y);
            return da - db;
          });
          let valid = directions.filter(d => canMove(ghost.x + d.dx, ghost.y + d.dy));
          if (valid.length) {
            // Try to move closer to Pacman
            let move = valid[0];
            ghost.x += move.dx;
            ghost.y += move.dy;
          }
        });
      }

      // Ghost collision
      ghosts.current.forEach((ghost) => {
        if (ghost.x === pacman.current.x && ghost.y === pacman.current.y) {
          setGameOver(true);
        }
      });

      // Win condition
      if (pellets.current.every(p => p.eaten)) {
        setGameOver(true);
      }

      animationId = requestAnimationFrame(update);
    }

    update();
    return () => cancelAnimationFrame(animationId);
  }, [gameOver]);

  // Keyboard controls
  useEffect(() => {
    function handleKey(e) {
      if (gameOver) return;
      let dx = pacman.current.dx;
      let dy = pacman.current.dy;
      if (e.key === "ArrowUp" && canMove(pacman.current.x, pacman.current.y - 1)) {
        dx = 0; dy = -1;
      } else if (e.key === "ArrowDown" && canMove(pacman.current.x, pacman.current.y + 1)) {
        dx = 0; dy = 1;
      } else if (e.key === "ArrowLeft" && canMove(pacman.current.x - 1, pacman.current.y)) {
        dx = -1; dy = 0;
      } else if (e.key === "ArrowRight" && canMove(pacman.current.x + 1, pacman.current.y)) {
        dx = 1; dy = 0;
      }
      pacman.current.dx = dx;
      pacman.current.dy = dy;
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [gameOver]);

  function handleRestart() {
  pacman.current.x = 1;
  pacman.current.y = 1;
  pacman.current.dx = 1;
  pacman.current.dy = 0;
  setScore(0);
  setGameOver(false);
  pellets.current.forEach(p => p.eaten = false);
  }

  return (
    <div style={{ textAlign: "center", marginTop: 24, width: "100vw", maxWidth: "100vw", overflowX: "hidden" }}>
      <canvas
        ref={canvasRef}
        width={cols * tileSize}
        height={rows * tileSize}
        style={{ background: "#111", borderRadius: 16, boxShadow: "0 2px 12px #000", display: "block", margin: "0 auto", width: "100%", maxWidth: "100vw" }}
      />
      <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.2em", marginTop: 12 }}>
        Score: {score}
        {gameOver && (
          <div style={{ color: "#f43f5e", fontWeight: 700, fontSize: "1.1em", marginTop: 8 }}>
            {pellets.current.every(p => p.eaten) ? "You Win!" : "Game Over!"}
          </div>
        )}
      </div>
      <button
        onClick={handleRestart}
        style={{
          marginTop: 12,
          padding: "8px 24px",
          borderRadius: 8,
          border: "none",
          background: "#ffe600",
          color: "#222",
          fontWeight: 700,
          cursor: "pointer"
        }}
      >Restart</button>
    </div>
  );
}

export default Pacman;
