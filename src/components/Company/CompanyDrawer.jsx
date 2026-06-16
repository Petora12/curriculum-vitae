// CompanyDrawer.jsx
import { X } from 'lucide-react';
import './CompanyDrawer.css';

const CompanyDrawer = ({ company, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`companies-drawer-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
      />
      <div className={`companies-drawer ${isOpen ? 'is-open' : ''}`}>
        {company && (
          <>
            <button className="companies-drawer-close" onClick={onClose}>
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="companies-drawer-header">
              <div className="companies-drawer-logo">
                <img src={company.image} alt={company.role} />
              </div>
              <div className="companies-drawer-meta">
                <h2 className="companies-drawer-name">{company.name}</h2>
                <p className="companies-drawer-role">{company.role}</p>
                <p className="companies-drawer-dates">
                  {company.startDate} – {company.endDate}
                </p>
                <p className="companies-drawer-location">{company.location}</p>
              </div>
            </div>

            <div className="companies-drawer-divider" />

            <ul className="companies-drawer-content">
              {company.details.map((detail, index) => (
                <li key={index} className="companies-drawer-paragraph">
                  {detail}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default CompanyDrawer;
