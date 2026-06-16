import './Navbar.css';
import { useTranslation } from '../../hooks/useTranslation';

const Navbar = ({ scrollProgress }) => {
  const { language, setLanguage } = useTranslation();
  console.log('LANG ', language);

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
            className={language === 'en-US' ? 'navbar-language-active' : ''}
            onClick={() => setLanguage('en-US')}
          >
            EN
          </span>
          <span className="navbar-separator">/</span>
          <span
            className={language === 'pt-PT' ? 'navbar-language-active' : ''}
            onClick={() => setLanguage('pt-PT')}
          >
            PT
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
