import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './Profile.css';
import profileAvatar from '../../assets/profile_pic.jpg';
import { ChevronDown } from 'lucide-react';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const useIsMobile = (query = '(max-width: 768px)') => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);
  return isMobile;
};

// Maximums (px). Real sizes scale DOWN from these to fit small screens.
const MAX_AVATAR = 200;
const BASE_NAME_FONT = 48;
const NAVBAR_NAME_SCALE = 0.5;
const MAX_STACK_GAP = 30;
const NAME_GAP = 16;
const NAME_MAX_WIDTH_RATIO = 0.9;

const Profile = ({ scrollProgress }) => {
  const isMobile = useIsMobile();
  const nameRef = useRef(null);
  const nameFontRef = useRef(BASE_NAME_FONT);

  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));
  const [slot, setSlot] = useState({ cx: 65, cy: 45, size: 50 });
  const [nameBase, setNameBase] = useState({ w: 260, h: 56 });

  useLayoutEffect(() => {
    const measure = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });

      const el = document.querySelector('.navbar-profile-placeholder');
      if (el) {
        const r = el.getBoundingClientRect();
        setSlot({
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          size: r.height,
        });
      }

      if (nameRef.current) {
        const r = nameRef.current.getBoundingClientRect();
        const factor = (nameFontRef.current || BASE_NAME_FONT) / BASE_NAME_FONT;
        setNameBase({ w: r.width / factor, h: r.height / factor });
      }
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const W = viewport.w;
  const H = viewport.h;

  // Scale the avatar + gaps to the actual viewport so the stack always fits,
  // leaving room for the chevron on short phones.
  const baseAvatar = Math.min(MAX_AVATAR, W * 0.5, H * 0.24);
  const stackGap = H < 700 ? 16 : MAX_STACK_GAP;

  // --- avatar center (ax, ay), size, and the "dock" amount ---
  let ax, ay, avatarSize, dock;

  if (isMobile) {
    const p = clamp(scrollProgress, 0, 1);
    ax = lerp(W / 2, slot.cx, p);
    ay = lerp(H / 2, slot.cy, p);
    avatarSize = lerp(baseAvatar, slot.size, p);
    dock = p;
  } else if (scrollProgress < 1) {
    const p = clamp(scrollProgress, 0, 1);
    ax = lerp(W / 2, 0.2 * W, p);
    ay = H / 2;
    avatarSize = baseAvatar;
    dock = 0;
  } else {
    const q = clamp(scrollProgress - 1, 0, 1);
    ax = lerp(0.2 * W, slot.cx, q);
    ay = lerp(H / 2, slot.cy, q);
    avatarSize = lerp(baseAvatar, slot.size, q);
    dock = q;
  }

  // Responsive base font: largest size (up to 48px) that fits the width.
  const maxNameWidth = W * NAME_MAX_WIDTH_RATIO;
  const fitFont =
    nameBase.w > 0
      ? BASE_NAME_FONT * (maxNameWidth / nameBase.w)
      : BASE_NAME_FONT;
  const baseNameFont = Math.min(BASE_NAME_FONT, fitFont);

  const nameScale = lerp(1, NAVBAR_NAME_SCALE, dock);
  const appliedFont = baseNameFont * nameScale;
  nameFontRef.current = appliedFont;

  const fontFactor = appliedFont / BASE_NAME_FONT;
  const nameW = nameBase.w * fontFactor;
  const nameH = nameBase.h * fontFactor;

  const belowX = ax;
  const belowY = ay + avatarSize / 2 + stackGap + nameH / 2;
  const besideX = ax + avatarSize / 2 + NAME_GAP + nameW / 2;
  const besideY = ay;

  const nameX = lerp(belowX, besideX, dock);
  const nameY = lerp(belowY, besideY, dock);

  const nameOpacity = isMobile ? clamp(1 - dock * 2, 0, 1) : 1;

  const roleX = ax;
  const roleY = belowY + nameH / 2 + stackGap + 14;
  const roleOpacity = clamp(1 - dock * 2.5, 0, 1);

  // Only show the scroll-down chevron when there's vertical room for it.
  const showChevron = H >= 560 && scrollProgress < 0.25;

  const fixed = (x, y) => ({
    position: 'fixed',
    left: `${x}px`,
    top: `${y}px`,
    transform: 'translate(-50%, -50%)',
    zIndex: 1001,
    pointerEvents: 'none',
  });

  return (
    <div className="profile-page">
      <img
        className="profile-avatar-circle"
        src={profileAvatar}
        alt="avatar"
        style={{
          ...fixed(ax, ay),
          width: `${avatarSize}px`,
          height: `${avatarSize}px`,
          zIndex: 1,
        }}
      />

      <h1
        ref={nameRef}
        className="profile-name"
        style={{
          ...fixed(nameX, nameY),
          fontSize: `${appliedFont}px`,
          opacity: nameOpacity,
          visibility: nameOpacity <= 0.01 ? 'hidden' : 'visible',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
      >
        Pedro Silvestre
      </h1>

      <p
        className="profile-role"
        style={{
          ...fixed(roleX, roleY),
          opacity: roleOpacity,
          visibility: roleOpacity <= 0.01 ? 'hidden' : 'visible',
          transition: 'opacity 0.2s ease, visibility 0.2s ease',
        }}
      >
        Frontend developer
      </p>

      {showChevron && (
        <div
          className="chevron-container"
          style={{
            position: 'absolute',
            bottom: 'calc(2rem + env(safe-area-inset-bottom))',
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
      )}
    </div>
  );
};

export default Profile;
