import React, { useState, useEffect } from 'react';
import './YearProgress.css';

function YearProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear() + 1, 0, 1);
      const total = end - start;
      const elapsed = now - start;
      const percentage = (elapsed / total) * 100;
      setProgress(percentage);
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 3600000); // Update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="year-progress">
      <h3>Year Progress</h3>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">
        {progress.toFixed(2)}% of {new Date().getFullYear()} completed
      </div>
    </div>
  );
}

export default YearProgress;
