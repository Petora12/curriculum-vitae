import { Mail, Linkedin, FileText, Github } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './Contacts.css';

const CONTACTS_DATA = [
  {
    id: 1,
    type: 'Email',
    value: 'your.email@example.com',
    icon: Mail,
    link: 'mailto:your.email@example.com',
  },
  {
    id: 2,
    type: 'LinkedIn',
    value: 'linkedin.com/in/yourprofile',
    icon: Linkedin,
    link: 'https://linkedin.com/in/yourprofile',
  },
  {
    id: 3,
    type: 'CV / Resume',
    value: 'Download my CV',
    icon: FileText,
    link: '/path-to-your-cv.pdf', // Update with actual CV path
  },
  // {
  //   id: 4,
  //   type: 'GitHub',
  //   value: 'github.com/yourusername',
  //   icon: Github,
  //   link: 'https://github.com/yourusername',
  // },
];

const Contacts = ({ scrollContainerRef }) => {
  const [isIconVisible, setIsIconVisible] = useState(false);
  const pageRef = useRef(null);

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
    <div ref={pageRef} className="contacts-page">
      <div className="contacts-content">
        {/* Left side - Mail Icon */}
        <div
          className={`contacts-icon-section ${
            isIconVisible ? 'is-visible' : ''
          }`}
        >
          <Mail className="contacts-mail-icon" />
        </div>

        {/* Right side - Title and Contact Cards */}
        <div className="contacts-right-section">
          <div className="contacts-content-wrapper">
            <h1 className="contacts-title">contacts.</h1>
            <div className="contacts-cards-section">
              <div className="contacts-list">
                {CONTACTS_DATA.map((contact, index) => {
                  const IconComponent = contact.icon;
                  const isExternal =
                    contact.type === 'LinkedIn' || contact.type === 'GitHub';
                  const isDownload = contact.type === 'CV / Resume';

                  return (
                    <a
                      key={contact.id}
                      href={contact.link}
                      className="contact-card"
                      style={{ animationDelay: `${index * 0.15}s` }}
                      target={isExternal ? '_blank' : '_self'}
                      rel={isExternal ? 'noopener noreferrer' : ''}
                      download={isDownload ? true : undefined}
                    >
                      <div className="contact-icon-circle">
                        <IconComponent className="contact-icon" />
                      </div>
                      <div className="contact-info">
                        <h3 className="contact-type">{contact.type}</h3>
                        <p className="contact-value">{contact.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
