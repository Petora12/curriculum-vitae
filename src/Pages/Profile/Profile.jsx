import './Profile.css';
import profileAvatar from '../../assets/profile_pic.png';
import { ChevronDown } from 'lucide-react';

const Profile = ({ scrollProgress }) => {
  // Phase 1: Profile to About (0-1) - Move to left
  // Phase 2: About to Companies (1-2) - Move to navbar top-left

  let currentY,
    currentX,
    avatarScale,
    nameScale,
    nameTranslateX,
    nameTranslateY;

  if (scrollProgress < 1) {
    // Phase 1: Center to left of screen (0 to 1)
    const phase1Progress = Math.min(scrollProgress, 1);

    const centerY = 50;
    const centerX = 50;
    const leftY = 50;
    const leftX = 20;

    currentY = centerY - (centerY - leftY) * phase1Progress;
    currentX = centerX - (centerX - leftX) * phase1Progress;

    avatarScale = 1;
    nameScale = 1;
    nameTranslateX = 0;
    nameTranslateY = 0;
  } else if (scrollProgress >= 1 && scrollProgress < 2) {
    // Phase 2: Left to navbar top-left (1 to 2)
    const phase2Progress = scrollProgress - 1; // 0 to 1

    const leftY = 50;
    const leftX = 20;
    const navbarY = 6.5;
    const navbarX = 6;

    currentY = leftY - (leftY - navbarY) * phase2Progress;
    currentX = leftX - (leftX - navbarX) * phase2Progress;

    avatarScale = 1 - phase2Progress * 0.75;
    nameScale = 1 - phase2Progress * 0.5;
    nameTranslateX = phase2Progress * 125;
    nameTranslateY = phase2Progress * -67;
  } else {
    // Phase 3: Locked in navbar (2+)
    currentY = 6.5;
    currentX = 6;
    avatarScale = 0.25;
    nameScale = 0.5;
    nameTranslateX = 125;
    nameTranslateY = -67;
  }

  return (
    <div className="profile-page">
      <div
        className="profile-content"
        style={{
          position: scrollProgress > 0 ? 'fixed' : 'relative',
          top: scrollProgress > 0 ? `${currentY}vh` : 'auto',
          left: scrollProgress > 0 ? `${currentX}vw` : 'auto',
          transform: scrollProgress > 0 ? 'translate(-50%, -50%)' : 'none',
          zIndex: 1001,
        }}
      >
        <img
          className="profile-avatar-circle"
          src={profileAvatar}
          alt="avatar"
          style={{
            width: `${200 * avatarScale}px`,
            height: `${200 * avatarScale}px`,
          }}
        />
        <h1
          className="profile-name"
          style={{
            fontSize: `${48 * nameScale}px`,
            transform: `translate(${nameTranslateX}px, ${nameTranslateY}px)`,
          }}
        >
          Pedro Silvestre
        </h1>
      </div>
      <div
        className="chevron-container"
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: Math.max(0, 1 - scrollProgress * 4),
          pointerEvents: 'none',
        }}
      >
        <ChevronDown className="chevron-icon" size={36} />
        <ChevronDown className="chevron-icon" size={36} />
        <ChevronDown className="chevron-icon" size={36} />
      </div>
    </div>
  );
};

export default Profile;
