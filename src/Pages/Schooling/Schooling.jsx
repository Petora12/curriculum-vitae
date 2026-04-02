import { GraduationCap } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './Schooling.css';

const Schooling = ({ scrollContainerRef }) => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const pageRef = useRef(null);

  // Intersection Observer for snap detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Trigger animation when fully visible (snapped)
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            setIsIconVisible(true);
          } else {
            // Reset animation when leaving the section
            setIsIconVisible(false);
          }
        });
      },
      {
        threshold: [0.75], // Trigger when 75% visible (mostly snapped)
        root: scrollContainerRef?.current || null,
      }
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
          <h1 className="schooling-title">education.</h1>
          <div className="schooling-details-section">
            <div className="education-card">
              <div className="education-card-content">
                {/* University Logo */}
                <div className="education-logo-container">
                  <img
                    src="https://via.placeholder.com/120"
                    alt="Stanford University"
                    className="education-logo"
                  />
                </div>

                {/* University Details */}
                <div className="education-info">
                  <h2 className="education-university">Stanford University</h2>
                  <p className="education-period-location">
                    2016 - 2020
                    <span className="education-location-separator">•</span>
                    Stanford, USA
                  </p>
                  <p className="education-course">
                    Bachelor of Science in Computer Science
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
