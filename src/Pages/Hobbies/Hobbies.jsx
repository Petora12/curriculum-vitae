import { Gamepad2, Film, Music, Radio, Plane, Cpu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import './Hobbies.css';

const HOBBIES_DATA = [
  {
    id: 1,
    name: 'Videogames',
    icon: Gamepad2,
  },
  {
    id: 2,
    name: 'Movies & Series',
    icon: Film,
  },
  {
    id: 3,
    name: 'Music',
    icon: Music,
  },
  {
    id: 4,
    name: 'Livestreams',
    icon: Radio,
  },
  {
    id: 5,
    name: 'Travel',
    icon: Plane,
  },
  {
    id: 6,
    name: 'Technology',
    icon: Cpu,
  },
];

const Hobbies = ({ scrollContainerRef }) => {
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
            <h1 className="hobbies-title">hobbies.</h1>
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
