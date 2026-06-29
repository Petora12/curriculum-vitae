import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './Profile.css';
import profileAvatar from '../../assets/profile_pic.png';
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

// Base sizes (px). Avatar shrinks to whatever the navbar slot actually is.
const BASE_AVATAR = 200;
const BASE_NAME_FONT = 48; // the name's "100%" size on a wide screen
const NAVBAR_NAME_SCALE = 0.5;
const STACK_GAP = 30; // matches the column gap when expanded
const NAME_GAP = 16; // horizontal gap between avatar and name when docked
const NAME_MAX_WIDTH_RATIO = 0.9; // expanded name may use up to 90% of the viewport width

const Profile = ({ scrollProgress }) => {
  const isMobile = useIsMobile();
  const nameRef = useRef(null);
  const nameFontRef = useRef(BASE_NAME_FONT); // the font size currently applied to the name

  // Everything we need is MEASURED, never hardcoded in vw/vh.
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));
  // Fallback matches the navbar's default padding (40px / 20px) + 50px slot.
  const [slot, setSlot] = useState({ cx: 65, cy: 45, size: 50 });
  // nameBase = the name's intrinsic size measured at BASE_NAME_FONT (48px).
  const [nameBase, setNameBase] = useState({ w: 260, h: 56 });

  // Measure the real navbar slot + viewport on mount and whenever the layout can change.
  useLayoutEffect(() => {
    const measure = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });

      const el = document.querySelector('.navbar-profile-placeholder');
      if (el) {
        const r = el.getBoundingClientRect();
        setSlot({
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          size: r.height, // avatar will dock to exactly this size
        });
      }

      if (nameRef.current) {
        // Normalise the measured width back to the 48px reference, dividing by
        // whatever font is actually applied (responsive font x dock scale).
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

  // --- Drive the avatar center (ax, ay), its size, and a single "dock" amount ---
  let ax, ay, avatarSize, dock;

  if (isMobile) {
    // Center -> navbar directly.
    const p = clamp(scrollProgress, 0, 1);
    ax = lerp(W / 2, slot.cx, p);
    ay = lerp(H / 2, slot.cy, p);
    avatarSize = lerp(BASE_AVATAR, slot.size, p);
    dock = p;
  } else if (scrollProgress < 1) {
    // Phase 1: center -> left (vertical center holds).
    const p = clamp(scrollProgress, 0, 1);
    ax = lerp(W / 2, 0.2 * W, p);
    ay = H / 2;
    avatarSize = BASE_AVATAR;
    dock = 0;
  } else {
    // Phase 2: left -> measured navbar slot.
    const q = clamp(scrollProgress - 1, 0, 1);
    ax = lerp(0.2 * W, slot.cx, q);
    ay = lerp(H / 2, slot.cy, q);
    avatarSize = lerp(BASE_AVATAR, slot.size, q);
    dock = q;
  }

  // Responsive base font: largest size (up to 48px) that fits the viewport width.
  // width at font F = nameBase.w * (F / 48), so the F that fills maxWidth is:
  const maxNameWidth = W * NAME_MAX_WIDTH_RATIO;
  const fitFont =
    nameBase.w > 0
      ? BASE_NAME_FONT * (maxNameWidth / nameBase.w)
      : BASE_NAME_FONT;
  const baseNameFont = Math.min(BASE_NAME_FONT, fitFont);

  // Name: responsive size when expanded -> docked size beside the avatar.
  const nameScale = lerp(1, NAVBAR_NAME_SCALE, dock);
  const appliedFont = baseNameFont * nameScale;
  nameFontRef.current = appliedFont;

  const fontFactor = appliedFont / BASE_NAME_FONT;
  const nameW = nameBase.w * fontFactor;
  const nameH = nameBase.h * fontFactor;

  const belowX = ax;
  const belowY = ay + avatarSize / 2 + STACK_GAP + nameH / 2;
  const besideX = ax + avatarSize / 2 + NAME_GAP + nameW / 2;
  const besideY = ay;

  const nameX = lerp(belowX, besideX, dock);
  const nameY = lerp(belowY, besideY, dock);

  // On mobile the name fades out as it docks; on desktop it stays.
  const nameOpacity = isMobile ? clamp(1 - dock * 2, 0, 1) : 1;

  // Role sits under the name while expanded, fades out as we dock.
  const roleX = ax;
  const roleY = belowY + nameH / 2 + STACK_GAP + 14;
  const roleOpacity = clamp(1 - dock * 2.5, 0, 1);

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
