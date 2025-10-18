import React, { useState } from 'react';
import './HamburgerMenu.css';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { name: 'Yearigy', url: '#' },
    { name: 'Blog', url: '#' },
    { name: 'Articlay', url: '#' }
  ];

  return (
    <>
      <button className="hamburger-btn" onClick={toggleMenu}>
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <h2>My Applications</h2>
          <ul className="menu-links">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <button className="close-menu" onClick={toggleMenu}>Close</button>
        </div>
      </div>
    </>
  );
}

export default HamburgerMenu;
