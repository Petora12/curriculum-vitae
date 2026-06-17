import { Gamepad2, Film, Music, Radio, Plane, Cpu } from 'lucide-react';
import { useRef } from 'react';
import './Hobbies.css';
import { useTranslation } from '../../hooks/useTranslation';
import { useIsCentered } from '../../hooks/useIsCentered';

const Hobbies = ({ scrollContainerRef }) => {
  const { t } = useTranslation();
  const pageRef = useRef(null);
  const isIconVisible = useIsCentered(pageRef, scrollContainerRef);

  const HOBBIES_DATA = [
    {
      id: 1,
      name: t('pages.hobbies.videogames'),
      icon: Gamepad2,
    },
    {
      id: 2,
      name: t('pages.hobbies.movies'),
      icon: Film,
    },
    {
      id: 3,
      name: t('pages.hobbies.music'),
      icon: Music,
    },
    {
      id: 4,
      name: t('pages.hobbies.livestreams'),
      icon: Radio,
    },
    {
      id: 5,
      name: t('pages.hobbies.travel'),
      icon: Plane,
    },
    {
      id: 6,
      name: t('pages.hobbies.technology'),
      icon: Cpu,
    },
  ];

  return (
    <div ref={pageRef} className="hobbies-page">
      <div className="hobbies-content">
        {/* Left side - Gamepad Icon */}
        <div
          className={`hobbies-icon-section ${
            isIconVisible ? 'is-visible' : ''
          }`}
        >
          <Gamepad2 className="hobbies-gamepad-icon" />
        </div>

        {/* Right side - Title and Hobby Cards */}
        <div className="hobbies-right-section">
          <div className="hobbies-content-wrapper">
            <h1 className="hobbies-title">{t('pages.hobbies.title')}.</h1>
            <div className="hobbies-cards-section">
              <div className="hobbies-grid">
                {HOBBIES_DATA.map((hobby, index) => {
                  const IconComponent = hobby.icon;
                  return (
                    <div
                      key={hobby.id}
                      className="hobby-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="hobby-icon-circle">
                        <IconComponent className="hobby-icon" />
                      </div>
                      <h3 className="hobby-name">{hobby.name}</h3>
                    </div>
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

export default Hobbies;
