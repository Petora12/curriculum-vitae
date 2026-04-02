import './Profile.css';

const Profile = ({ scrollProgress }) => {
  // Phase 1: Profile to About (0-1) - Move to left
  // Phase 2: About to Companies (1-2) - Move to navbar top-left

  let currentY,
    currentX,
    avatarScale,
    nameScale,
    nameTranslateX,
    nameTranslateY,
    isFixed;

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
    isFixed = phase1Progress > 0;
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
    nameTranslateX = phase2Progress * 90;
    nameTranslateY = phase2Progress * -67;
    isFixed = true;
  } else {
    // Phase 3: Locked in navbar (2+)
    currentY = 6.5;
    currentX = 6;
    avatarScale = 0.25;
    nameScale = 0.5;
    nameTranslateX = 90;
    nameTranslateY = -67;
    isFixed = true;
  }

  return (
    <div className="profile-page">
      <div
        className="profile-content"
        style={{
          position: isFixed ? 'fixed' : 'relative',
          top: isFixed ? `${currentY}vh` : 'auto',
          left: isFixed ? `${currentX}vw` : 'auto',
          transform: isFixed ? 'translate(-50%, -50%)' : 'none',
          zIndex: 1001,
        }}
      >
        <div
          className="profile-avatar-circle"
          style={{
            width: `${200 * avatarScale}px`,
            height: `${200 * avatarScale}px`,
          }}
        >
          <span
            className="profile-avatar-initials"
            style={{
              fontSize: `${72 * avatarScale}px`,
            }}
          >
            JD
          </span>
        </div>
        <h1
          className="profile-name"
          style={{
            fontSize: `${48 * nameScale}px`,
            transform: `translate(${nameTranslateX}px, ${nameTranslateY}px)`,
          }}
        >
          John Doe
        </h1>
      </div>
    </div>
  );
};

export default Profile;
