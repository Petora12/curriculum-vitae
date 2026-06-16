import { useTranslation } from '../../hooks/useTranslation';
import './About.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      <div className="about-content">
        <h1 className="about-title">{t('pages.about.title')}.</h1>
        <p className="about-text">{t('pages.about.text')}</p>
      </div>
    </div>
  );
};

export default About;
