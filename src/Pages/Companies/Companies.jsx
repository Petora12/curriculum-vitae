import { useState, useEffect, useCallback, useRef } from 'react';
import { Building2, X } from 'lucide-react';
import Company from '../../components/Company/Company';
import CompanyDrawer from '../../components/Company/CompanyDrawer';
import softinsaLogo from '../../assets/softinsa_logo.png';
import capgeminiLogo from '../../assets/capgemini_logo.png';
import './Companies.css';
import { useTranslation } from '../../hooks/useTranslation';
import { useIsCentered } from '../../hooks/useIsCentered';

const Companies = ({ scrollContainerRef }) => {
  const { t, tArray } = useTranslation();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pageRef = useRef(null);
  const isIconVisible = useIsCentered(pageRef, scrollContainerRef);

  const COMPANIES_DATA = [
    {
      id: 'capgemini',
      image: capgeminiLogo,
      name: 'Capgemini Engineering',
      startDate: 'May 2019',
      endDate: 'Apr 2022',
    },
    {
      id: 'softinsa',
      image: softinsaLogo,
      name: 'Softinsa - IBM',
      startDate: 'May 2022',
      endDate: 'Jun 2026',
    },
  ];

  // Resolve text for the current language
  const companies = COMPANIES_DATA.map((company) => ({
    ...company,
    role: t(`pages.companies.items.${company.id}.role`),
    location: t(`pages.companies.items.${company.id}.location`),
    details: tArray(`pages.companies.items.${company.id}.details`),
  }));

  const selectedCompanyData = companies.find((c) => c.id === selectedCompany);

  const handleCompanyClick = useCallback((companyId) => {
    setSelectedCompany(companyId);
    // Slight delay so the card selection animates before drawer slides in
    setTimeout(() => setIsDrawerOpen(true), 80);
  }, []);

  const handleClose = useCallback(() => {
    setIsDrawerOpen(false);
    // Deselect card after drawer finishes closing
    setTimeout(() => setSelectedCompany(null), 400);
  }, []);

  // Lock scroll while drawer is open
  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current;
    if (!scrollContainer) return;

    scrollContainer.style.overflow = isDrawerOpen ? 'hidden' : 'scroll';

    return () => {
      scrollContainer.style.overflow = 'scroll';
    };
  }, [isDrawerOpen, scrollContainerRef]);

  return (
    <div ref={pageRef} className="companies-page">
      <div className="companies-content">
        {/* Left side — Building Icon, always visible */}
        <div
          className={`companies-icon-section ${isIconVisible ? 'is-visible' : ''}`}
        >
          <Building2 className="companies-building-icon" />
        </div>

        {/* Right side — Title and Company Cards */}
        <div className="companies-right-section">
          <div className="companies-content-wrapper">
            <h1 className="companies-title">{t('pages.companies.title')}.</h1>
            <div className="companies-cards-section">
              <div className="companies-grid">
                {/* the grid */}
                {companies.map((company) => (
                  <Company
                    key={company.id}
                    {...company}
                    isSelected={selectedCompany === company.id}
                    isOtherSelected={
                      selectedCompany !== null && selectedCompany !== company.id
                    }
                    onClick={handleCompanyClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`companies-drawer-backdrop ${isDrawerOpen ? 'is-open' : ''}`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <CompanyDrawer
        company={selectedCompanyData}
        isOpen={isDrawerOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default Companies;
