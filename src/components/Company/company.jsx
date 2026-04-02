import { useRef, useEffect, useState, useCallback } from 'react';
import './Company.css';
import { X } from 'lucide-react';

const Company = ({
  id,
  image,
  role,
  startDate,
  endDate,
  location,
  details = [],
  logoSize = 120,
  isSelected = false,
  isExpanded = false,
  isOtherSelected = false,
  onClick,
  onClose,
}) => {
  const cardRef = useRef(null);
  const [initialRect, setInitialRect] = useState(null);

  // Capture initial position when card mounts
  useEffect(() => {
    if (cardRef.current && !initialRect) {
      const rect = cardRef.current.getBoundingClientRect();
      setInitialRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [initialRect]);

  const handleClick = useCallback(() => {
    if (!isSelected && onClick) {
      onClick(id);
    }
  }, [isSelected, onClick, id]);

  const handleCloseClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (onClose) {
        onClose();
      }
    },
    [onClose]
  );

  // Calculate styles for expanded state
  const cardStyles =
    isExpanded && initialRect
      ? {
          position: 'fixed',
          left: '60px',
          right: '60px',
          top: '180px',
          bottom: '60px',
          width: 'auto',
          height: 'auto',
          minWidth: 'auto',
          maxWidth: 'none',
          margin: 0,
          zIndex: 100,
        }
      : {};

  return (
    <>
      {/* Placeholder to maintain layout when card is expanded */}
      {isExpanded && initialRect && (
        <div
          className="company-card-placeholder"
          style={{
            width: `${initialRect.width}px`,
            height: `${initialRect.height}px`,
            minWidth: `${initialRect.width}px`,
            visibility: 'hidden',
          }}
        />
      )}

      <div
        ref={cardRef}
        className={`company-card ${isExpanded ? 'is-expanded' : ''} ${
          isOtherSelected ? 'is-hidden' : ''
        }`}
        onClick={handleClick}
        style={{
          cursor: isExpanded ? 'default' : 'pointer',
          ...cardStyles,
        }}
      >
        {/* Close button - only show when expanded */}
        {isExpanded && (
          <button className="company-close-btn" onClick={handleCloseClick}>
            <X size={20} strokeWidth={2.5} />
          </button>
        )}

        {/* Expanded content - horizontal layout */}
        {isExpanded ? (
          <div className="company-expanded-layout">
            <div className="company-expanded-left">
              <div className="company-logo-container company-logo-large">
                <img src={image} alt={role} className="company-logo" />
              </div>
              <div className="company-details">
                <h3 className="company-role-expanded">{role}</h3>
                <p className="company-dates-expanded">
                  {startDate} - {endDate}
                </p>
                <p className="company-location-expanded">{location}</p>
              </div>
            </div>

            <div className="company-expanded-right">
              {details.map((detail, index) => (
                <p key={index} className="company-detail-paragraph">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="company-original-content">
            <div
              className="company-logo-container"
              style={{
                width: `${logoSize}px`,
                height: `${logoSize}px`,
              }}
            >
              <img src={image} alt={role} className="company-logo" />
            </div>
            <div className="company-details">
              <h3 className="company-role">{role}</h3>
              <p className="company-dates">
                {startDate} - {endDate}
              </p>
              <p className="company-location">{location}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Company;
