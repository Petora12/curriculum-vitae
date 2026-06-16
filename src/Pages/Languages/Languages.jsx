import { Languages } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './Languages.css';
import { useTranslation } from '../../hooks/useTranslation';

const LanguagesPage = ({ scrollContainerRef }) => {
  const { t } = useTranslation();
  const [isIconVisible, setIsIconVisible] = useState(false);
  const pageRef = useRef(null);

  const LANGUAGES_DATA = [
    {
      id: 1,
      name: t('pages.languages.portuguese'),
      country: 'Portugal',
      proficiency: t('pages.languages.proeficency.native'),
      flag: '🇵🇹', // Portugal flag emoji
    },
    {
      id: 2,
      name: t('pages.languages.english'),
      country: 'US/UK',
      proficiency: t('pages.languages.proeficency.fluent'),
      flag: '🇬🇧', // UK flag emoji (or use 🇺🇸 for US)
    },
  ];

  // Intersection Observer for snap detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            setIsIconVisible(true);
          } else {
            setIsIconVisible(false);
          }
        });
      },
      {
        threshold: [0.75],
        root: scrollContainerRef?.current || null,
      },
    );

    if (pageRef.current) {
      observer.observe(pageRef.current);
    }

    return () => {
      if (pageRef.current) {
        observer.unobserve(pageRef.current);
      }
    };
  }, [scrollContainerRef]);

  return (
    <div ref={pageRef} className="languages-page">
      <div className="languages-content">
        {/* Left side - Languages Icon */}
        <div
          className={`languages-icon-section ${
            isIconVisible ? 'is-visible' : ''
          }`}
        >
          <Languages className="languages-globe-icon" />
        </div>

        {/* Right side - Title and Language Cards */}
        <div className="languages-right-section">
          <div className="languages-content-wrapper">
            <h1 className="languages-title">{t('pages.languages.title')}.</h1>
            <div className="languages-cards-section">
              <div className="languages-cards-container">
                {LANGUAGES_DATA.map((language, index) => (
                  <div
                    key={language.id}
                    className="language-card"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="language-flag-circle">
                      <span className="flag-emoji">{language.flag}</span>
                    </div>
                    <h3 className="language-name">{language.name}</h3>
                    <p className="language-proficiency">
                      {language.proficiency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesPage;
