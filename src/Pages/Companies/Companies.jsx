import { useState, useEffect, useCallback, useRef } from 'react';
import { Building2 } from 'lucide-react';
import Company from '../../components/Company/company';
import './Companies.css';

const COMPANIES_DATA = [
  {
    id: 1,
    image: 'https://via.placeholder.com/150',
    role: 'Software Engineer',
    startDate: '01/2020',
    endDate: '12/2022',
    location: 'San Francisco, CA',
    details: [
      'Developed and maintained web applications using React and Node.js, improving user experience and system performance.',
      'Collaborated with cross-functional teams including designers, product managers, and other engineers to deliver high-quality software solutions.',
      'Implemented responsive designs and ensured cross-browser compatibility for all web applications.',
      'Participated in code reviews and mentored junior developers on best practices and coding standards.',
    ],
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/150',
    role: 'Frontend Developer',
    startDate: '06/2018',
    endDate: '12/2019',
    location: 'New York, NY',
    details: [
      'Built modern and responsive user interfaces using Vue.js and modern CSS frameworks.',
      'Worked closely with UX designers to implement pixel-perfect designs and smooth animations.',
      'Optimized application performance and reduced load times by 40% through code splitting and lazy loading.',
      'Integrated RESTful APIs and managed state using Vuex for complex application flows.',
    ],
  },
];

// Delay in milliseconds before expansion starts
const EXPANSION_DELAY = 400;

const Companies = ({ scrollContainerRef }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const pageRef = useRef(null);

  const handleCompanyClick = useCallback((companyId) => {
    setSelectedCompany(companyId);

    // Delay the expansion
    setTimeout(() => {
      setExpandedCompany(companyId);
    }, EXPANSION_DELAY);
  }, []);

  const handleClose = useCallback(() => {
    // First collapse the card
    setExpandedCompany(null);

    // Then deselect after animation completes
    setTimeout(() => {
      setSelectedCompany(null);
    }, EXPANSION_DELAY);
  }, []);

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

  // Handle scroll locking
  useEffect(() => {
    const scrollContainer = scrollContainerRef?.current;
    if (!scrollContainer) return;

    scrollContainer.style.overflow = expandedCompany ? 'hidden' : 'scroll';

    return () => {
      scrollContainer.style.overflow = 'scroll';
    };
  }, [expandedCompany, scrollContainerRef]);

  return (
    <div ref={pageRef} className="companies-page">
      <div className="companies-content">
        {/* Left side - Building Icon */}
        <div
          className={`companies-icon-section ${
            isIconVisible ? 'is-visible' : ''
          } ${expandedCompany ? 'is-hidden' : ''}`}
        >
          <Building2 className="companies-building-icon" />
        </div>

        {/* Right side - Title and Company Cards */}
        <div className="companies-right-section">
          <div className="companies-content-wrapper">
            <h1
              className={`companies-title ${expandedCompany ? 'is-hidden' : ''}`}
            >
              companies.
            </h1>
            <div className="companies-cards-section">
              <div className="companies-grid">
                {COMPANIES_DATA.map((company) => (
                  <Company
                    key={company.id}
                    {...company}
                    isSelected={selectedCompany === company.id}
                    isExpanded={expandedCompany === company.id}
                    isOtherSelected={
                      selectedCompany !== null && selectedCompany !== company.id
                    }
                    onClick={handleCompanyClick}
                    onClose={handleClose}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
