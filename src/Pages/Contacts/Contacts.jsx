import { Mail, Linkedin, FileText, Github } from 'lucide-react';
import { useRef } from 'react';
import './Contacts.css';
import { useTranslation } from '../../hooks/useTranslation';
import { useIsCentered } from '../../hooks/useIsCentered';
import cvUrl from '../../assets/files/resume.pdf';

const CONTACTS_DATA = [
  {
    id: 1,
    type: 'Email',
    value: 'pedrommsilvestre@gmail.com',
    icon: Mail,
    link: 'mailto:pedrommsilvestre@gmail.com',
  },
  {
    id: 2,
    type: 'LinkedIn',
    value: 'linkedin.com/in/pedrommsilvestre',
    icon: Linkedin,
    link: 'https://linkedin.com/in/pedrommsilvestre',
  },
  {
    id: 3,
    type: 'CV / Resume',
    value: 'Download my CV',
    icon: FileText,
    link: cvUrl,
  },
  {
    id: 4,
    type: 'GitHub',
    value: 'github.com/Petora12',
    icon: Github,
    link: 'https://github.com/Petora12',
  },
];

const Contacts = ({ scrollContainerRef }) => {
  const { t } = useTranslation();
  const pageRef = useRef(null);
  const isIconVisible = useIsCentered(pageRef, scrollContainerRef);

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
            <h1 className="contacts-title">{t('pages.contacts.title')}.</h1>
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
                      download={isDownload ? 'PedroSilvestre_CV' : undefined}
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
