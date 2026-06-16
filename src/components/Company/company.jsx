import { useCallback } from 'react';
import './Company.css';

const Company = ({
  id,
  image,
  name,
  role,
  startDate,
  endDate,
  location,
  logoSize = 120,
  isSelected = false,
  isOtherSelected = false,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(id);
    }
  }, [onClick, id]);

  return (
    <div
      className={`company-card ${isSelected ? 'is-selected' : ''} ${
        isOtherSelected ? 'is-other-selected' : ''
      }`}
      onClick={handleClick}
    >
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
        <h2 className="company-name">{name}</h2>
        <h3 className="company-role">{role}</h3>
        <p className="company-dates">
          {startDate} - {endDate}
        </p>
        <p className="company-location">{location}</p>
      </div>
    </div>
  );
};

export default Company;
