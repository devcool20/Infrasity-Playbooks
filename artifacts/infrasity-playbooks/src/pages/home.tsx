import { useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import logoPath from "@assets/logo.png";

/* ─── CardSpotlight (Aceternity-style) ───────────────────────── */
function CardSpotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: visible
          ? `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(120,58,237,0.16) 0%, transparent 70%)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}

/* ─── 3D Book SVGs with perspective + glow ───────────────────── */

function BookGTM({ scale = 1 }: { scale?: number }) {
  const w = 190 * scale, h = 230 * scale;
  return (
    <svg width={w} height={h} viewBox="0 0 190 230" fill="none" style={{ overflow: "visible", display: "block" }}>
      <defs>
        <radialGradient id="gtm-glow" cx="50%" cy="90%" r="60%">
          <stop offset="0%" stopColor="#C2450A" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#C2450A" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="gtm-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C04A12"/>
          <stop offset="50%" stopColor="#963A0D"/>
          <stop offset="100%" stopColor="#6B2208"/>
        </linearGradient>
        <linearGradient id="gtm-spine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4A1206"/>
          <stop offset="100%" stopColor="#6B2208"/>
        </linearGradient>
        <linearGradient id="gtm-pages" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0EDE8"/>
          <stop offset="100%" stopColor="#D8D4CE"/>
        </linearGradient>
        <filter id="gtm-blur">
          <feGaussianBlur stdDeviation="14"/>
        </filter>
      </defs>
      {/* Glow */}
      <ellipse cx="95" cy="218" rx="72" ry="22" fill="url(#gtm-glow)" filter="url(#gtm-blur)"/>
      {/* Spine */}
      <polygon points="0,32 22,16 22,208 0,224" fill="url(#gtm-spine)"/>
      {/* Pages top */}
      <polygon points="6,12 164,5 170,10 22,16" fill="url(#gtm-pages)"/>
      {/* Cover */}
      <polygon points="22,16 170,10 170,202 22,208" fill="url(#gtm-cover)"/>
      {/* Concentric circles on cover */}
      {[14,26,38,50,62,74,86].map((r,i) => (
        <ellipse key={i} cx="96" cy="115" rx={r} ry={r*0.92} stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" fill="none"/>
      ))}
      {/* Bar chart at bottom */}
      <rect x="62" y="148" width="7" height="18" rx="1.5" fill="rgba(255,255,255,0.55)"/>
      <rect x="72" y="138" width="7" height="28" rx="1.5" fill="rgba(255,255,255,0.7)"/>
      <rect x="82" y="130" width="7" height="36" rx="1.5" fill="rgba(255,255,255,0.85)"/>
      <rect x="92" y="142" width="7" height="24" rx="1.5" fill="rgba(255,255,255,0.65)"/>
      <rect x="102" y="134" width="7" height="32" rx="1.5" fill="rgba(255,255,255,0.75)"/>
      {/* Infrasity label */}
      <text x="96" y="35" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="6.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" letterSpacing="1.2">infrasity</text>
      {/* Title */}
      <text x="96" y="72" textAnchor="middle" fill="white" fontSize="10" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity="0.95">State of GTM</text>
      <text x="96" y="86" textAnchor="middle" fill="white" fontSize="10" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity="0.95">2026</text>
      {/* Edge shadow */}
      <polygon points="158,10 170,10 170,202 158,208" fill="rgba(0,0,0,0.22)"/>
      {/* Spine shadow on cover */}
      <polygon points="22,16 36,14 36,209 22,208" fill="rgba(0,0,0,0.18)"/>
    </svg>
  );
}

function Book7Figure({ scale = 1 }: { scale?: number }) {
  const w = 190 * scale, h = 230 * scale;
  return (
    <svg width={w} height={h} viewBox="0 0 190 230" fill="none" style={{ overflow: "visible", display: "block" }}>
      <defs>
        <radialGradient id="gf-glow" cx="50%" cy="90%" r="60%">
          <stop offset="0%" stopColor="#1A5C32" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#1A5C32" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="gf-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E5E34"/>
          <stop offset="50%" stopColor="#164827"/>
          <stop offset="100%" stopColor="#0C2E18"/>
        </linearGradient>
        <linearGradient id="gf-spine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#081A0E"/>
          <stop offset="100%" stopColor="#0C2E18"/>
        </linearGradient>
        <linearGradient id="gf-pages" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EDEAE5"/>
          <stop offset="100%" stopColor="#D4D0CA"/>
        </linearGradient>
        <filter id="gf-blur"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>
      <ellipse cx="95" cy="218" rx="72" ry="22" fill="url(#gf-glow)" filter="url(#gf-blur)"/>
      <polygon points="0,32 22,16 22,208 0,224" fill="url(#gf-spine)"/>
      <polygon points="6,12 164,5 170,10 22,16" fill="url(#gf-pages)"/>
      <polygon points="22,16 170,10 170,202 22,208" fill="url(#gf-cover)"/>
      {/* Blueprint grid */}
      {[35,60,85,110,135,160,185].map((y,i) => (
        <line key={`h${i}`} x1="22" y1={y} x2="170" y2={y-3} stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      ))}
      {[50,75,100,125,150].map((x,i) => (
        <line key={`v${i}`} x1={x} y1="16" x2={x} y2="202" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      ))}
      {/* Triangle blueprint */}
      <polygon points="96,52 52,148 140,148" stroke="rgba(255,255,255,0.6)" strokeWidth="1.8" fill="none"/>
      {/* Small cross marks */}
      <line x1="58" y1="108" x2="58" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
      <line x1="54" y1="104" x2="62" y2="104" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
      <line x1="134" y1="108" x2="134" y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
      <line x1="130" y1="104" x2="138" y2="104" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
      <line x1="96" y1="46" x2="96" y2="38" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
      <line x1="92" y1="42" x2="100" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
      {/* Horizontal rule */}
      <line x1="38" y1="160" x2="158" y2="156" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
      {/* Infrasity + Title */}
      <text x="96" y="35" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" letterSpacing="1.2">infrasity</text>
      <text x="96" y="178" textAnchor="middle" fill="white" fontSize="9" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity="0.95">THE 7-FIGURE</text>
      <text x="96" y="192" textAnchor="middle" fill="white" fontSize="9" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity="0.95">GTM ENGINE</text>
      <polygon points="158,10 170,10 170,202 158,208" fill="rgba(0,0,0,0.2)"/>
      <polygon points="22,16 36,14 36,209 22,208" fill="rgba(0,0,0,0.15)"/>
    </svg>
  );
}

function BookLinkedIn({ scale = 1 }: { scale?: number }) {
  const w = 190 * scale, h = 230 * scale;
  const nodes = [[96,105],[70,80],[124,76],[58,120],[136,118],[78,142],[116,144],[96,62]];
  const edges: [number,number][] = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[2,4],[3,5],[4,6],[5,6],[0,7],[2,7],[1,7]];
  return (
    <svg width={w} height={h} viewBox="0 0 190 230" fill="none" style={{ overflow: "visible", display: "block" }}>
      <defs>
        <radialGradient id="li-glow" cx="50%" cy="90%" r="60%">
          <stop offset="0%" stopColor="#1A3A7C" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#1A3A7C" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="li-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#112252"/>
          <stop offset="60%" stopColor="#0B1738"/>
          <stop offset="100%" stopColor="#070F22"/>
        </linearGradient>
        <linearGradient id="li-spine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#04080E"/>
          <stop offset="100%" stopColor="#070F22"/>
        </linearGradient>
        <linearGradient id="li-pages" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAE8E5"/>
          <stop offset="100%" stopColor="#D2CFC9"/>
        </linearGradient>
        <filter id="li-blur"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>
      <ellipse cx="95" cy="218" rx="72" ry="22" fill="url(#li-glow)" filter="url(#li-blur)"/>
      <polygon points="0,32 22,16 22,208 0,224" fill="url(#li-spine)"/>
      <polygon points="6,12 164,5 170,10 22,16" fill="url(#li-pages)"/>
      <polygon points="22,16 170,10 170,202 22,208" fill="url(#li-cover)"/>
      {/* Network edges */}
      {edges.map(([a,b],i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="rgba(100,140,255,0.3)" strokeWidth="1.2"/>
      ))}
      {/* Network nodes */}
      {nodes.map(([cx,cy],i) => (
        <circle key={i} cx={cx} cy={cy} r={i===0 ? 5.5 : 3} fill={i===0 ? "rgba(140,180,255,0.9)" : "rgba(120,160,255,0.65)"}/>
      ))}
      <circle cx="96" cy="105" r="14" fill="rgba(80,120,255,0.1)"/>
      <text x="96" y="35" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" letterSpacing="1.2">infrasity</text>
      <text x="96" y="170" textAnchor="middle" fill="white" fontSize="9.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity="0.95">State of</text>
      <text x="96" y="185" textAnchor="middle" fill="white" fontSize="9.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity="0.95">LinkedIn 2026</text>
      <polygon points="158,10 170,10 170,202 158,208" fill="rgba(0,0,0,0.2)"/>
      <polygon points="22,16 36,14 36,209 22,208" fill="rgba(0,0,0,0.15)"/>
    </svg>
  );
}

function BookTechContent({ scale = 1 }: { scale?: number }) {
  const w = 190 * scale, h = 230 * scale;
  return (
    <svg width={w} height={h} viewBox="0 0 190 230" fill="none" style={{ overflow: "visible", display: "block" }}>
      <defs>
        <radialGradient id="tc-glow" cx="50%" cy="90%" r="60%">
          <stop offset="0%" stopColor="#3A3A5C" stopOpacity="0.45"/>
          <stop offset="100%" stopColor="#3A3A5C" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="tc-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2C2C40"/>
          <stop offset="60%" stopColor="#1E1E2E"/>
          <stop offset="100%" stopColor="#12121C"/>
        </linearGradient>
        <linearGradient id="tc-spine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#08080F"/>
          <stop offset="100%" stopColor="#12121C"/>
        </linearGradient>
        <linearGradient id="tc-pages" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ECEAE8"/>
          <stop offset="100%" stopColor="#D4D2D0"/>
        </linearGradient>
        <filter id="tc-blur"><feGaussianBlur stdDeviation="14"/></filter>
      </defs>
      <ellipse cx="95" cy="218" rx="72" ry="22" fill="url(#tc-glow)" filter="url(#tc-blur)"/>
      <polygon points="0,32 22,16 22,208 0,224" fill="url(#tc-spine)"/>
      <polygon points="6,12 164,5 170,10 22,16" fill="url(#tc-pages)"/>
      <polygon points="22,16 170,10 170,202 22,208" fill="url(#tc-cover)"/>
      {/* Code lines */}
      {[[36,75,90],[36,85,70],[48,95,110],[48,105,75],[48,115,95],[48,125,60],[48,135,85]].map(([x,y,w2],i) => (
        <rect key={i} x={x} y={y} width={w2} height="5" rx="2.5" fill={`rgba(255,255,255,${0.1 + (i%3)*0.04})`}/>
      ))}
      {/* Arrow/cursor icon */}
      <polygon points="96,46 82,62 90,62 90,80 102,80 102,62 110,62" fill="rgba(255,255,255,0.45)"/>
      <text x="96" y="35" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="6.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" letterSpacing="1.2">infrasity</text>
      <text x="96" y="156" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity="0.9">TECHNICAL CONTENT</text>
      <text x="96" y="170" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="700" opacity="0.9">STRATEGY 2025</text>
      <polygon points="158,10 170,10 170,202 158,208" fill="rgba(0,0,0,0.18)"/>
      <polygon points="22,16 36,14 36,209 22,208" fill="rgba(0,0,0,0.14)"/>
    </svg>
  );
}

/* ─── Type Badge ──────────────────────────────────────────────── */
function TypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-block text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded bg-white/8 text-white/55 border border-white/10 uppercase">
      {type}
    </span>
  );
}

/* ─── SVG Logo Ticker (restored) ─────────────────────────────── */
function CloudflareLogo() {
  return (
    <svg viewBox="0 0 120 40" fill="none" className="h-7 w-auto opacity-40">
      <path d="M82.5 23.5c-.3-1-1.1-1.7-2.1-1.9l-16.2-.2c-.2 0-.4-.1-.5-.2-.1-.1-.2-.3-.1-.5.1-.4.5-.7 1-.7l16.3.2c2 .1 4.2-1.5 4.9-3.5l.6-1.7c0-.1 0-.3-.1-.4-1.6-7-7.9-12.1-15.3-12.1-6.9 0-12.7 4.5-14.8 10.7-1.4-.9-3-1.4-4.8-1.3-3.2.1-5.9 2.4-6.4 5.5-.1.6-.1 1.2 0 1.8-3.8.3-6.8 3.5-6.8 7.4 0 .3 0 .6.1.9h43.8c.4-.1.8-.4.9-.8l1-3.2z" fill="#F6821F"/>
      <path d="M90.5 16.6c-.2 0-.4 0-.6.1-.1 0-.2.1-.3.2l-1 3.5c-.3 1-1.1 1.7-2.1 1.9l-16.2.2c-.2 0-.4.1-.5.2-.1.1-.2.3-.1.5.1.4.5.7 1 .7l16.3-.2c2-.1 4.2 1.5 4.9 3.5l.6 1.7c0 .1 0 .3-.1.4 0 0-.1.1-.1.1-.5 0-.9.4-.9.9.1.5.5.9 1 .9 2.4 0 4.3-2 4.3-4.4v-.3c-.2-5.2-2.8-9.3-6.2-9.7z" fill="#FBAD41"/>
      <text x="18" y="34" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="600">Cloudflare</text>
    </svg>
  );
}
function PostmanLogo() {
  return (
    <svg viewBox="0 0 110 40" fill="none" className="h-7 w-auto opacity-40">
      <circle cx="20" cy="20" r="12" fill="#FF6C37"/>
      <path d="M14 20 L20 14 L26 20 L20 26 Z" fill="white" opacity="0.9"/>
      <text x="36" y="25" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="600">Postman</text>
    </svg>
  );
}
function StripeLogo() {
  return (
    <svg viewBox="0 0 70 32" className="h-7 w-auto opacity-40">
      <text x="0" y="22" fill="#A5A5FF" fontSize="20" fontFamily="sans-serif" fontWeight="700">stripe</text>
    </svg>
  );
}
function TwilioLogo() {
  return (
    <svg viewBox="0 0 110 40" fill="none" className="h-7 w-auto opacity-40">
      <circle cx="20" cy="20" r="13" fill="#F22F46"/>
      <circle cx="15" cy="15" r="2.5" fill="white"/>
      <circle cx="25" cy="15" r="2.5" fill="white"/>
      <circle cx="15" cy="25" r="2.5" fill="white"/>
      <circle cx="25" cy="25" r="2.5" fill="white"/>
      <text x="38" y="25" fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="600">Twilio</text>
    </svg>
  );
}
function GitLabLogo() {
  return (
    <svg viewBox="0 0 110 40" fill="none" className="h-7 w-auto opacity-40">
      <path d="M20 30 L8 18 L12 8 L20 22 L28 8 L32 18 Z" fill="#FC6D26"/>
      <path d="M20 30 L12 18 L20 22 Z" fill="#E24329"/>
      <path d="M20 30 L28 18 L20 22 Z" fill="#E24329"/>
      <path d="M8 18 L5 22 L20 30 Z" fill="#FCA326"/>
      <path d="M32 18 L35 22 L20 30 Z" fill="#FCA326"/>
      <text x="42" y="25" fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="600">GitLab</text>
    </svg>
  );
}

const TICKER_ITEMS = [CloudflareLogo, PostmanLogo, StripeLogo, TwilioLogo, GitLabLogo];

/* ─── Footer Icons ────────────────────────────────────────────── */
function IconFacebook() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
      <path d="M13.5 8.5H15V6.5H13.5C12.1 6.5 11 7.6 11 9V10H9.5V12H11V17.5H13V12H14.5L15 10H13V9C13 8.7 13.2 8.5 13.5 8.5Z" opacity="0.9"/>
    </svg>
  );
}
function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" opacity="0.9"/>
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" opacity="0.9"/>
      <circle cx="4" cy="4" r="2" opacity="0.9"/>
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" opacity="0.9"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0D0D14"/>
    </svg>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
const FILTER_TABS = ["All", "Strategy", "Content", "Case Studies"];

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── Purple radial page glow ── */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        background: "radial-gradient(ellipse 90% 65% at 50% 25%, rgba(110,50,240,0.12) 0%, transparent 70%)",
      }}/>

      {/* ── Announcement Banner ── */}
      {bannerVisible && (
        <div className="relative z-20 bg-[#5040D0] text-white text-sm flex items-center justify-center px-10 py-2.5 text-center">
          State of GTM 2026 is dropping soon — be the first to get it.{" "}
          <a href="#waitlist" className="ml-1 underline underline-offset-2 font-semibold hover:text-purple-200 transition-colors">Join the waitlist</a>
          <button onClick={() => setBannerVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white" aria-label="Close">
            <X size={14}/>
          </button>
        </div>
      )}

      {/* ── Navbar — transparent, blends with hero ── */}
      <nav className="relative z-40 bg-transparent">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <a href="https://infrasity.com">
            <img src={logoPath} alt="Infrasity" className="h-7 w-auto"/>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-2 text-white/65 hover:text-white transition-colors"
            aria-label="Menu"
          >
            {menuOpen ? <X size={20}/> : (
              <>
                <span className="block w-5 h-[1.5px] bg-current rounded"/>
                <span className="block w-5 h-[1.5px] bg-current rounded"/>
                <span className="block w-5 h-[1.5px] bg-current rounded"/>
              </>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0F0F1A]/98 backdrop-blur-sm border-b border-white/8 z-50">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 space-y-1">
              {["Home","Services","Tools","Resources","Pricing","FAQ","About Us"].map(item => (
                <a key={item} href="#" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
                  {item}
                </a>
              ))}
              <div className="pt-2">
                <a href="#" onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold text-white text-center transition-colors">
                  Book a Free Consultation
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero — centered title only ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-10 pb-10 text-center">
        <h1 className="text-[clamp(2.6rem,7vw,4.2rem)] font-extrabold tracking-tight text-white leading-tight">
          Reports &amp; Playbooks
        </h1>
      </section>

      {/* ── Featured Cards Grid (2-col) ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">

          <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
            <a href="#" className="group block">
              <div className="flex items-center justify-center pt-6 pb-3 px-4 sm:pt-10 sm:pb-4 sm:px-8">
                <div className="transform group-hover:translateY(-2px) transition-transform duration-300">
                  <BookGTM scale={0.78}/>
                </div>
              </div>
              <div className="px-4 sm:px-5 pb-5 sm:pb-6">
                <TypeBadge type="REPORT"/>
                <h3 className="mt-2.5 text-sm sm:text-base font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  State of GTM 2026
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-white/45 leading-relaxed">
                  Original research on how B2B go-to-market is evolving in the AI era. Based on data from 200+ GTM leaders.
                </p>
              </div>
            </a>
          </CardSpotlight>

          <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
            <a href="#" className="group block">
              <div className="flex items-center justify-center pt-6 pb-3 px-4 sm:pt-10 sm:pb-4 sm:px-8">
                <div className="transform group-hover:translateY(-2px) transition-transform duration-300">
                  <Book7Figure scale={0.78}/>
                </div>
              </div>
              <div className="px-4 sm:px-5 pb-5 sm:pb-6">
                <TypeBadge type="PLAYBOOK"/>
                <h3 className="mt-2.5 text-sm sm:text-base font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  The 7-Figure GTM Engine
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-white/45 leading-relaxed">
                  The complete framework for building a founder-led content program that generates measurable pipeline.
                </p>
              </div>
            </a>
          </CardSpotlight>

        </div>
      </section>

      {/* ── LinkedIn 2026 (horizontal featured card) ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-10">
        <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
          <a href="#" className="group flex items-center gap-5 p-4 sm:p-6">
            <div className="shrink-0">
              <BookLinkedIn scale={0.72}/>
            </div>
            <div className="min-w-0">
              <TypeBadge type="REPORT"/>
              <h3 className="mt-3 text-base sm:text-xl font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                State of LinkedIn 2026
              </h3>
              <p className="mt-2 text-sm text-white/45 leading-relaxed">
                How the algorithm rewards original insight — and what that means for B2B content strategy.
              </p>
            </div>
          </a>
        </CardSpotlight>
      </section>

      {/* ── Subscribe ── */}
      <section id="waitlist" className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <div className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden" style={{
          background: "linear-gradient(135deg, #4535C0 0%, #3B2DAE 45%, #2E23A0 100%)",
        }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(180,160,255,0.12) 0%, transparent 70%)",
          }}/>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Subscribe to get new playbooks
            </h2>
            <p className="mt-3 text-purple-200/70 text-sm max-w-sm mx-auto">
              Join 5,000+ developer marketers who get actionable insights delivered to their inbox.
            </p>
            <a href="#" className="mt-6 inline-block px-8 py-3 rounded-full bg-[#5B4AE0] hover:bg-[#6B58EE] text-white font-bold text-sm transition-colors border border-purple-400/20">
              Join the newsletter
            </a>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {FILTER_TABS.map(tab => (
            <button key={tab} onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeFilter === tab
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-transparent border-white/15 text-white/50 hover:border-white/30 hover:text-white/75"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ── More Resources (slightly smaller cards) ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-14">
        <h2 className="text-lg font-bold text-white text-center mb-5">More Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <CardSpotlight className="rounded-xl border border-white/10 bg-[#111118]">
            <a href="#" className="group flex items-center gap-3.5 p-3.5 sm:p-4">
              <div className="shrink-0">
                <BookLinkedIn scale={0.56}/>
              </div>
              <div className="min-w-0">
                <TypeBadge type="REPORT"/>
                <h3 className="mt-2 text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  State of LinkedIn 2026
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-white/40 leading-relaxed">
                  How the algorithm rewards original insight — and what that means for B2B content strategy.
                </p>
              </div>
            </a>
          </CardSpotlight>

          <CardSpotlight className="rounded-xl border border-white/10 bg-[#111118]">
            <a href="#" className="group flex items-center gap-3.5 p-3.5 sm:p-4">
              <div className="shrink-0">
                <BookTechContent scale={0.56}/>
              </div>
              <div className="min-w-0">
                <TypeBadge type="REPORT"/>
                <h3 className="mt-2 text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  Technical Content Strategy 2025
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-white/40 leading-relaxed">
                  The new blueprint in creating strategy for technical content strategy 2025.
                </p>
              </div>
            </a>
          </CardSpotlight>

        </div>
      </section>

      {/* ── Trusted By — SVG Logo Ticker ── */}
      <section className="relative z-10 border-t border-white/6 py-10 overflow-hidden">
        <p className="text-center text-lg font-bold text-white mb-8">Trusted by 50+ SaaS startups</p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-14 animate-ticker w-max px-8">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((Logo, i) => (
              <div key={i} className="shrink-0">
                <Logo/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.07] bg-[#09090F] pt-12 pb-6">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-8 pb-10">

            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <img src={logoPath} alt="Infrasity" className="h-6 w-auto mb-5"/>
              {/* Badge icons */}
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-full border border-white/12 bg-white/4 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="rgba(255,255,255,0.35)"/>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/12 bg-white/4 flex items-center justify-center">
                  <svg width="14" height="16" viewBox="0 0 20 22" fill="none">
                    <path d="M10 1L2 5v7c0 5 3.6 9 8 10 4.4-1 8-5 8-10V5L10 1z" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
                    <path d="M7 11l2 2 4-4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              {/* Product Hunt */}
              <a href="#" className="inline-flex items-center gap-2 bg-[#111118] hover:bg-white/8 border border-white/10 rounded-xl px-3 py-2.5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div className="leading-none">
                  <div className="text-[9px] text-white/38 mb-0.5">Featured on</div>
                  <div className="text-[13px] font-bold text-white/85">Product Hunt</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white/30 ml-0.5">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>

            {/* TOOLS */}
            <div>
              <h4 className="text-[11px] font-bold text-white/75 uppercase tracking-wider mb-4">Tools</h4>
              <ul className="space-y-2.5">
                {["Begin Visibility","Kackenimany","Pechilist\nKonversation"].map(link => (
                  <li key={link}><a href="#" className="text-[12.5px] text-white/38 hover:text-white/65 transition-colors leading-tight block">{link.replace("\\n"," ")}</a></li>
                ))}
              </ul>
            </div>

            {/* USE CASES */}
            <div>
              <h4 className="text-[11px] font-bold text-white/75 uppercase tracking-wider mb-4">Use Cases</h4>
              <ul className="space-y-2.5">
                {["AP GTM Nominees","SaaS Proman","Infrastructure SaaS","B6DevOps","T&S Obersive SaaS","Videoinfoos","My Max Infinity"].map(link => (
                  <li key={link}><a href="#" className="text-[12.5px] text-white/38 hover:text-white/65 transition-colors leading-tight block">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-[11px] font-bold text-white/75 uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2.5">
                {["Services Marketing","ASC Decs","Testing Services","Technical Vatiogy"].map(link => (
                  <li key={link}><a href="#" className="text-[12.5px] text-white/38 hover:text-white/65 transition-colors leading-tight block">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 className="text-[11px] font-bold text-white/75 uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2.5">
                {["Home","Blog","Case Studio","Contact","Resources","Workflows","Terms on Contacts"].map(link => (
                  <li key={link}><a href="#" className="text-[12.5px] text-white/38 hover:text-white/65 transition-colors leading-tight block">{link}</a></li>
                ))}
              </ul>
            </div>

            {/* COMPANY + AWARDS */}
            <div>
              <h4 className="text-[11px] font-bold text-white/75 uppercase tracking-wider mb-4">Company</h4>
              <div className="flex items-center gap-3 mb-7">
                {[<IconFacebook key="fb"/>, <IconX key="x"/>, <IconLinkedIn key="li"/>, <IconYouTube key="yt"/>].map((Icon, i) => (
                  <a key={i} href="#" className="text-white/28 hover:text-white/60 transition-colors">{Icon}</a>
                ))}
              </div>
              {/* Awards */}
              <h4 className="text-[11px] font-bold text-white/75 uppercase tracking-wider mb-3">Awards</h4>
              <div className="flex items-center gap-2.5 bg-white/[0.04] border border-white/8 rounded-xl px-3 py-2.5">
                <img src={logoPath} alt="" className="h-5 w-auto opacity-55"/>
                <div className="leading-tight">
                  <div className="text-[12px] font-bold text-white/70">Infrasity Now</div>
                  <div className="text-[10px] text-white/30 mt-0.5">Recognized Registry</div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.07] pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-white/22">© 2023 Infrasity m. Tedict onli-site</p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-[11px] text-white/22 hover:text-white/45 transition-colors">Maintenonized</a>
              <span className="text-white/12 text-xs">|</span>
              <a href="#" className="text-[11px] text-white/22 hover:text-white/45 transition-colors">Recived Registry</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
