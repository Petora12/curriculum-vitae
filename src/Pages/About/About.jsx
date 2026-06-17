import { useTranslation } from '../../hooks/useTranslation';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-content-placeholder">
          {/* This is just a placeholder to maintain spacing */}
        </div>
        <div className="about-content-right">
          <h1 className="about-title">{t('pages.about.title')}.</h1>
          <p className="about-text">{t('pages.about.text')}</p>
        </div>
      </div>
    </div>
  );
};

export default About;
