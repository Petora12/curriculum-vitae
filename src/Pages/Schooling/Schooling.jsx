import { GraduationCap } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import uniLogo from '../../assets/ubi_logo.jpg';
import './Schooling.css';
import { useIsCentered } from '../../hooks/useIsCentered';

const Schooling = ({ scrollContainerRef }) => {
  const pageRef = useRef(null);
  const { t } = useTranslation();
  const isIconVisible = useIsCentered(pageRef, scrollContainerRef);

  return (
    <div ref={pageRef} className="schooling-page">
      <div className="schooling-content">
        {/* Left side - Graduation Cap Icon */}
        <div
          className={`schooling-icon-section ${
            isIconVisible ? 'is-visible' : ''
          }`}
        >
          <GraduationCap className="schooling-graduation-icon" />
        </div>

        {/* Right side - Title and Education Details */}
        <div className="schooling-right-section">
          <h1 className="schooling-title">{t('pages.schooling.title')}.</h1>
          <div className="schooling-details-section">
            <div className="education-card">
              <div className="education-card-content">
                {/* University Logo */}
                <div className="education-logo-container">
                  <img
                    src={uniLogo}
                    alt="Universidade da Beira Interior"
                    className="education-logo"
                  />
                </div>

                {/* University Details */}
                <div className="education-info">
                  <h2 className="education-university">
                    Universidade da Beira Interior
                  </h2>
                  <p className="education-period-location">
                    2012 - 2018
                    <span className="education-location-separator">•</span>
                    Covilhã, Portugal
                  </p>
                  <p className="education-course">
                    {t('pages.schooling.degree')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schooling;
