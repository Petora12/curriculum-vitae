import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ scrollProgress }) => {
  const [activeLanguage, setActiveLanguage] = useState('PT');

  return (
    <nav
      className={`navbar ${
        scrollProgress > 0.1 ? 'navbar-with-background' : ''
      }`}
    >
      <div className="navbar-content">
        <div className="navbar-profile-placeholder">
          {/* This is just a placeholder to maintain spacing */}
        </div>

        <div className="navbar-language-button">
          <span
            className={activeLanguage === 'EN' ? 'navbar-language-active' : ''}
            onClick={() => setActiveLanguage('EN')}
          >
            EN
          </span>
          <span className="navbar-separator">/</span>
          <span
            className={activeLanguage === 'PT' ? 'navbar-language-active' : ''}
            onClick={() => setActiveLanguage('PT')}
          >
            PT
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
