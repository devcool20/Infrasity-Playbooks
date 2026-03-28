import { useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import logoPath from "@assets/logo.png";

/* ─── CardSpotlight ───────────────────────────────────────────── */
function CardSpotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [on, setOn] = useState(false);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);
  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      className={`relative overflow-hidden ${className}`}
      style={{ background: on ? `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(120,58,237,0.14) 0%, transparent 70%)` : undefined }}>
      {children}
    </div>
  );
}

/* ─── CSS 3D Book Component ───────────────────────────────────── */
interface BookProps {
  coverContent: React.ReactNode;
  spineGradient: string;
  glowColor: string;
  scale?: number;
}

function Book3D({ coverContent, spineGradient, glowColor, scale = 1 }: BookProps) {
  const W = 128 * scale, H = 168 * scale, D = 18 * scale;
  return (
    <div style={{ position: "relative", width: W + D + 14, height: H + D + 20 }}>
      {/* Glow beneath book */}
      <div style={{
        position: "absolute",
        bottom: -4,
        left: D * 0.5,
        width: W * 0.85,
        height: D * 2.2,
        background: glowColor,
        filter: `blur(${18 * scale}px)`,
        borderRadius: "50%",
        opacity: 0.55,
        zIndex: 0,
      }}/>
      {/* 3D book wrapper */}
      <div style={{
        position: "absolute",
        top: D * 0.4,
        left: D * 1.1,
        width: W,
        height: H,
        transformStyle: "preserve-3d",
        transform: "perspective(700px) rotateY(-24deg) rotateX(6deg)",
        zIndex: 1,
      }}>
        {/* Front cover face */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "2px 5px 5px 2px",
          overflow: "hidden",
          boxShadow: "6px 8px 24px rgba(0,0,0,0.55)",
        }}>
          {coverContent}
          {/* Right-edge shadow overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, transparent 18%, transparent 72%, rgba(0,0,0,0.32) 100%)",
          }}/>
        </div>
        {/* Left spine */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: D, height: H,
          background: spineGradient,
          transformOrigin: "left center",
          transform: "rotateY(90deg)",
        }}/>
        {/* Top pages */}
        <div style={{
          position: "absolute", left: 0, top: 0, width: W, height: D,
          background: "linear-gradient(180deg, #f3f0ea 0%, #dbd6ce 100%)",
          transformOrigin: "center top",
          transform: "rotateX(-90deg)",
        }}/>
      </div>
    </div>
  );
}

/* ─── Cover designs ───────────────────────────────────────────── */

function GTMCover({ scale = 1 }: { scale?: number }) {
  const W = 128 * scale, H = 168 * scale;
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(155deg, #D55A1A 0%, #A83A0C 48%, #6B1E06 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 32% 26%, rgba(255,200,130,0.22) 0%, transparent 55%)" }}/>
      <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} fill="none">
        {[14,26,38,50,62,74,86,96].map((r, i) => (
          <ellipse key={i} cx={W*0.5} cy={H*0.53} rx={r * scale} ry={r * 0.9 * scale}
            stroke={`rgba(255,255,255,${0.07 + i * 0.013})`} strokeWidth={1.4 * scale} fill="none"/>
        ))}
        <rect x={W*0.26} y={H*0.775} width={8*scale} height={22*scale} rx={2*scale} fill="rgba(255,255,255,0.48)"/>
        <rect x={W*0.35} y={H*0.71} width={8*scale} height={34*scale} rx={2*scale} fill="rgba(255,255,255,0.62)"/>
        <rect x={W*0.44} y={H*0.66} width={8*scale} height={42*scale} rx={2*scale} fill="rgba(255,255,255,0.8)"/>
        <rect x={W*0.53} y={H*0.73} width={8*scale} height={29*scale} rx={2*scale} fill="rgba(255,255,255,0.57)"/>
        <rect x={W*0.62} y={H*0.685} width={8*scale} height={37*scale} rx={2*scale} fill="rgba(255,255,255,0.7)"/>
        <text x={W*0.5} y={H*0.138} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize={7*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="600" letterSpacing={1.3}>INFRASITY</text>
        <text x={W*0.5} y={H*0.3} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize={9.5*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">State of GTM</text>
        <text x={W*0.5} y={H*0.365} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize={9.5*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">2026</text>
      </svg>
    </div>
  );
}

function GTM7FigureCover({ scale = 1 }: { scale?: number }) {
  const W = 128 * scale, H = 168 * scale;
  const cx = W * 0.5, cy = H * 0.48;
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(155deg, #1F6038 0%, #134028 50%, #081C12 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 35% 28%, rgba(60,200,120,0.14) 0%, transparent 55%)" }}/>
      <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} fill="none">
        {/* Grid lines */}
        {[0.2,0.35,0.5,0.65,0.8].map((p, i) => (
          <line key={`v${i}`} x1={W*p} y1={H*0.13} x2={W*p} y2={H*0.9} stroke="rgba(255,255,255,0.055)" strokeWidth={scale}/>
        ))}
        {[0.2,0.33,0.46,0.59,0.72,0.85].map((p, i) => (
          <line key={`h${i}`} x1={W*0.1} y1={H*p} x2={W*0.9} y2={H*p} stroke="rgba(255,255,255,0.055)" strokeWidth={scale}/>
        ))}
        {/* Triangle */}
        <polygon points={`${cx},${H*0.26} ${cx-42*scale},${H*0.73} ${cx+42*scale},${H*0.73}`}
          stroke="rgba(255,255,255,0.62)" strokeWidth={1.7*scale} fill="none" strokeLinejoin="round"/>
        {/* Corner crosses */}
        {[[cx, H*0.26],[cx-42*scale, H*0.73],[cx+42*scale, H*0.73]].map(([x,y], i) => (
          <g key={i}>
            <line x1={x-5*scale} y1={y} x2={x+5*scale} y2={y} stroke="rgba(255,255,255,0.45)" strokeWidth={1.2*scale}/>
            <line x1={x} y1={y-5*scale} x2={x} y2={y+5*scale} stroke="rgba(255,255,255,0.45)" strokeWidth={1.2*scale}/>
          </g>
        ))}
        {/* Bottom rule */}
        <line x1={W*0.15} y1={H*0.79} x2={W*0.85} y2={H*0.79} stroke="rgba(255,255,255,0.22)" strokeWidth={scale}/>
        <text x={W*0.5} y={H*0.138} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={7*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="600" letterSpacing={1.3}>INFRASITY</text>
        <text x={W*0.5} y={H*0.855} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize={8.5*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">THE 7-FIGURE</text>
        <text x={W*0.5} y={H*0.91} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize={8.5*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">GTM ENGINE</text>
      </svg>
    </div>
  );
}

function LinkedInCover({ scale = 1 }: { scale?: number }) {
  const W = 128 * scale, H = 168 * scale;
  const nodes = [[0.5,0.46],[0.34,0.35],[0.64,0.32],[0.25,0.56],[0.72,0.54],[0.38,0.67],[0.62,0.68],[0.5,0.24]];
  const edges: [number,number][] = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[2,4],[3,5],[4,6],[5,6],[0,7],[2,7]];
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(155deg, #112252 0%, #0B163C 50%, #060D22 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 38% 30%, rgba(80,130,255,0.14) 0%, transparent 55%)" }}/>
      <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} fill="none">
        {edges.map(([a,b], i) => (
          <line key={i} x1={nodes[a][0]*W} y1={nodes[a][1]*H} x2={nodes[b][0]*W} y2={nodes[b][1]*H}
            stroke="rgba(100,160,255,0.28)" strokeWidth={1.2*scale}/>
        ))}
        {nodes.map(([px,py], i) => (
          <circle key={i} cx={px*W} cy={py*H} r={(i===0 ? 5.5 : 3.5)*scale}
            fill={i===0 ? "rgba(130,185,255,0.88)" : "rgba(100,155,255,0.65)"}/>
        ))}
        <circle cx={W*0.5} cy={H*0.46} r={14*scale} fill="rgba(60,110,255,0.1)"/>
        <text x={W*0.5} y={H*0.138} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={7*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="600" letterSpacing={1.3}>INFRASITY</text>
        <text x={W*0.5} y={H*0.82} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize={9*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">State of</text>
        <text x={W*0.5} y={H*0.875} textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize={9*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">LinkedIn 2026</text>
      </svg>
    </div>
  );
}

function TechContentCover({ scale = 1 }: { scale?: number }) {
  const W = 128 * scale, H = 168 * scale;
  const lines = [[0.18,0.38,0.52],[0.18,0.45,0.38],[0.25,0.51,0.58],[0.25,0.57,0.42],[0.25,0.63,0.52],[0.25,0.69,0.35],[0.25,0.75,0.48]];
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(155deg, #2A2840 0%, #1C1C2E 50%, #0E0E1C 100%)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 35% 28%, rgba(120,100,220,0.12) 0%, transparent 55%)" }}/>
      <svg style={{ position: "absolute", inset: 0 }} width="100%" height="100%" viewBox={`0 0 ${W} ${H}`} fill="none">
        {lines.map(([x,y,w2], i) => (
          <rect key={i} x={x*W} y={y*H} width={w2*W} height={5*scale} rx={2.5*scale} fill={`rgba(255,255,255,${0.1+i*0.03})`}/>
        ))}
        {/* Cursor/pointer icon */}
        <polygon points={`${W*0.5},${H*0.26} ${W*0.38},${H*0.38} ${W*0.45},${H*0.38} ${W*0.45},${H*0.48} ${W*0.55},${H*0.48} ${W*0.55},${H*0.38} ${W*0.62},${H*0.38}`}
          fill="rgba(255,255,255,0.42)"/>
        <text x={W*0.5} y={H*0.138} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize={7*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="600" letterSpacing={1.3}>INFRASITY</text>
        <text x={W*0.5} y={H*0.862} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize={7.8*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">TECHNICAL CONTENT</text>
        <text x={W*0.5} y={H*0.918} textAnchor="middle" fill="rgba(255,255,255,0.92)" fontSize={7.8*scale}
          fontFamily="'Plus Jakarta Sans',sans-serif" fontWeight="800">STRATEGY 2025</text>
      </svg>
    </div>
  );
}

/* ─── Type Badge ──────────────────────────────────────────────── */
function TypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-block text-[10px] font-semibold tracking-widest px-2.5 py-0.5 rounded bg-white/8 text-white/55 border border-white/10 uppercase">
      {type}
    </span>
  );
}

/* ─── SVG Logo Ticker ─────────────────────────────────────────── */
function CloudflareSVG() {
  return (
    <svg viewBox="0 0 120 38" fill="none" className="h-7 w-auto">
      <path d="M82 22c-.3-1-1-1.6-2-1.8l-15.8-.2c-.2 0-.4-.1-.5-.2-.1-.1-.2-.3-.1-.5.1-.4.5-.6.9-.6l15.9.2c2 .1 4-1.4 4.7-3.4l.6-1.7c0-.1 0-.2-.1-.3-1.6-6.7-7.6-11.6-14.8-11.6-6.7 0-12.3 4.3-14.4 10.3-1.3-.9-2.9-1.3-4.6-1.2-3.1.1-5.7 2.3-6.2 5.3-.1.6-.1 1.1 0 1.7-3.7.3-6.6 3.4-6.6 7.1 0 .3 0 .5.1.8h42.5c.4-.1.8-.4.9-.8l.9-3.1z" fill="#F6821F"/>
      <path d="M90 15.8h-.5l-.3.2-.9 3.4c-.3 1-1 1.6-2 1.8l-15.8.2c-.2 0-.4.1-.5.2-.1.1-.2.3-.1.5.1.4.5.7.9.7l15.9-.2c1.9-.1 4.1 1.4 4.7 3.4l.6 1.7c0 .1 0 .2-.1.3 0 0-.1 0-.1.1-.5 0-.9.4-.9.8.1.5.5.8.9.8 2.3 0 4.2-1.9 4.2-4.2v-.3c-.1-5-2.7-9-6-9.5z" fill="#FBAD41"/>
      <text x="12" y="32" fill="white" fontSize="10" fontFamily="sans-serif" fontWeight="600">Cloudflare</text>
    </svg>
  );
}
function PostmanSVG() {
  return (
    <svg viewBox="0 0 108 38" fill="none" className="h-7 w-auto">
      <circle cx="19" cy="19" r="11" fill="#FF6C37"/>
      <path d="M13.5 19 L19 13.5 L24.5 19 L19 24.5 Z" fill="white" opacity="0.9"/>
      <text x="35" y="24" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="600">Postman</text>
    </svg>
  );
}
function StripeSVG() {
  return (
    <svg viewBox="0 0 68 30" className="h-7 w-auto">
      <text x="0" y="22" fill="#A5A5FF" fontSize="19" fontFamily="sans-serif" fontWeight="700">stripe</text>
    </svg>
  );
}
function TwilioSVG() {
  return (
    <svg viewBox="0 0 108 38" fill="none" className="h-7 w-auto">
      <circle cx="19" cy="19" r="12" fill="#F22F46"/>
      <circle cx="14" cy="14" r="2.4" fill="white"/>
      <circle cx="24" cy="14" r="2.4" fill="white"/>
      <circle cx="14" cy="24" r="2.4" fill="white"/>
      <circle cx="24" cy="24" r="2.4" fill="white"/>
      <text x="37" y="24" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="600">Twilio</text>
    </svg>
  );
}
function GitLabSVG() {
  return (
    <svg viewBox="0 0 108 38" fill="none" className="h-7 w-auto">
      <path d="M19 29 L7 17 L11 7 L19 21 L27 7 L31 17 Z" fill="#FC6D26"/>
      <path d="M19 29 L11 17 L19 21 Z" fill="#E24329"/>
      <path d="M19 29 L27 17 L19 21 Z" fill="#E24329"/>
      <path d="M7 17 L4 21 L19 29 Z" fill="#FCA326"/>
      <path d="M31 17 L34 21 L19 29 Z" fill="#FCA326"/>
      <text x="40" y="24" fill="white" fontSize="12" fontFamily="sans-serif" fontWeight="600">GitLab</text>
    </svg>
  );
}

/* ─── Footer Social Icons ─────────────────────────────────────── */
function IconFacebook() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.35"/>
      <path d="M13.5 8.5H15V6.5H13.5C12.1 6.5 11 7.6 11 9V10H9.5V12H11V17.5H13V12H14.5L15 10H13V9C13 8.7 13.2 8.5 13.5 8.5Z" opacity="0.85"/>
    </svg>
  );
}
function IconX() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" opacity="0.85"/>
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" opacity="0.85"/>
      <circle cx="4" cy="4" r="2" opacity="0.85"/>
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" opacity="0.85"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#09090F"/>
    </svg>
  );
}

const FILTER_TABS = ["All", "Strategy", "Content", "Case Studies"];

/* ─── Page ────────────────────────────────────────────────────── */
export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── Strong central purple glow ── */}
      <div className="pointer-events-none fixed inset-0 z-0" style={{
        background: [
          "radial-gradient(ellipse 75% 55% at 50% 18%, rgba(130,60,255,0.32) 0%, rgba(100,40,220,0.18) 35%, transparent 65%)",
          "radial-gradient(ellipse 50% 40% at 50% 10%, rgba(160,80,255,0.18) 0%, transparent 55%)",
        ].join(", "),
      }}/>

      {/* ── Banner ── */}
      {bannerVisible && (
        <div className="relative z-20 bg-[#5040D0] text-white text-sm flex items-center justify-center px-10 py-2.5 text-center">
          State of GTM 2026 is dropping soon — be the first to get it.{" "}
          <a href="#waitlist" className="ml-1 underline underline-offset-2 font-semibold hover:text-purple-200 transition-colors">Join the waitlist</a>
          <button onClick={() => setBannerVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white" aria-label="Close">
            <X size={14}/>
          </button>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav className="relative z-40 bg-transparent">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <a href="https://infrasity.com"><img src={logoPath} alt="Infrasity" className="h-7 w-auto"/></a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-[5px] p-2 text-white/65 hover:text-white transition-colors" aria-label="Menu">
            {menuOpen ? <X size={20}/> : (
              <><span className="block w-5 h-[1.5px] bg-current rounded"/><span className="block w-5 h-[1.5px] bg-current rounded"/><span className="block w-5 h-[1.5px] bg-current rounded"/></>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0F0F1A]/98 backdrop-blur-sm border-b border-white/8 z-50">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-3 space-y-0.5">
              {["Home","Services","Tools","Resources","Pricing","FAQ","About Us"].map(item => (
                <a key={item} href="#" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">{item}</a>
              ))}
              <div className="pt-2">
                <a href="#" onClick={() => setMenuOpen(false)} className="block px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold text-white text-center transition-colors">Book a Free Consultation</a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero — centered title only ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-10 pb-10 text-center">
        <h1 style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
          className="text-[clamp(2.5rem,7vw,4rem)] text-white leading-tight tracking-tight">
          Reports &amp; Playbooks
        </h1>
      </section>

      {/* ── 2-col Featured Cards ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">

          <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
            <a href="#" className="group block">
              <div className="flex items-center justify-center pt-6 pb-2 px-3 sm:pt-8 sm:px-6" style={{ minHeight: 200 }}>
                <Book3D
                  coverContent={<GTMCover scale={0.82}/>}
                  spineGradient="linear-gradient(180deg, #3D1204 0%, #6B2208 100%)"
                  glowColor="rgba(200,80,20,0.7)"
                  scale={0.82}
                />
              </div>
              <div className="px-4 pb-5">
                <TypeBadge type="REPORT"/>
                <h3 className="mt-2.5 text-sm sm:text-base font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">State of GTM 2026</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-white/44 leading-relaxed">Original research on how B2B go-to-market is evolving in the AI era. Based on data from 200+ GTM leaders.</p>
              </div>
            </a>
          </CardSpotlight>

          <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
            <a href="#" className="group block">
              <div className="flex items-center justify-center pt-6 pb-2 px-3 sm:pt-8 sm:px-6" style={{ minHeight: 200 }}>
                <Book3D
                  coverContent={<GTM7FigureCover scale={0.82}/>}
                  spineGradient="linear-gradient(180deg, #061408 0%, #0C2E18 100%)"
                  glowColor="rgba(30,100,55,0.7)"
                  scale={0.82}
                />
              </div>
              <div className="px-4 pb-5">
                <TypeBadge type="PLAYBOOK"/>
                <h3 className="mt-2.5 text-sm sm:text-base font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">The 7-Figure GTM Engine</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-white/44 leading-relaxed">The complete framework for building a founder-led content program that generates measurable pipeline.</p>
              </div>
            </a>
          </CardSpotlight>

        </div>
      </section>

      {/* ── LinkedIn horizontal card ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-10">
        <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
          <a href="#" className="group flex items-center gap-5 p-4 sm:p-6">
            <div className="shrink-0">
              <Book3D
                coverContent={<LinkedInCover scale={0.68}/>}
                spineGradient="linear-gradient(180deg, #030612 0%, #070F22 100%)"
                glowColor="rgba(20,60,180,0.6)"
                scale={0.68}
              />
            </div>
            <div className="min-w-0">
              <TypeBadge type="REPORT"/>
              <h3 className="mt-3 text-base sm:text-xl font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">State of LinkedIn 2026</h3>
              <p className="mt-2 text-sm text-white/44 leading-relaxed">How the algorithm rewards original insight — and what that means for B2B content strategy.</p>
            </div>
          </a>
        </CardSpotlight>
      </section>

      {/* ── Subscribe ── */}
      <section id="waitlist" className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <div className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden" style={{
          background: "linear-gradient(135deg, #5848DC 0%, #4A3CCE 40%, #3828B8 100%)",
        }}>
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 65% 60% at 50% 35%, rgba(200,180,255,0.12) 0%, transparent 65%)",
          }}/>
          <div className="relative z-10">
            <h2 style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
              className="text-2xl sm:text-3xl text-white">
              Subscribe to get new playbooks
            </h2>
            <p className="mt-3 text-purple-200/70 text-sm max-w-sm mx-auto">
              Join 5,000+ developer marketers who get actionable insights delivered to their inbox.
            </p>
            <a href="#" className="mt-6 inline-block px-8 py-3 rounded-full font-bold text-sm text-white transition-all border border-white/20 hover:bg-white/10"
              style={{ background: "rgba(255,255,255,0.12)" }}>
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
                activeFilter === tab ? "bg-purple-600 border-purple-600 text-white" : "bg-transparent border-white/15 text-white/50 hover:border-white/30 hover:text-white/75"
              }`}>
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ── More Resources ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pb-12">
        <h2 style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
          className="text-lg text-white text-center mb-5">
          More Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <CardSpotlight className="rounded-xl border border-white/10 bg-[#111118]">
            <a href="#" className="group flex items-center gap-3.5 p-3.5 sm:p-4">
              <div className="shrink-0">
                <Book3D coverContent={<LinkedInCover scale={0.52}/>} spineGradient="linear-gradient(180deg,#030612,#070F22)" glowColor="rgba(20,60,180,0.55)" scale={0.52}/>
              </div>
              <div className="min-w-0">
                <TypeBadge type="REPORT"/>
                <h3 className="mt-2 text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">State of LinkedIn 2026</h3>
                <p className="mt-1 text-[11px] text-white/38 leading-relaxed">How the algorithm rewards original insight — and what that means for B2B content strategy.</p>
              </div>
            </a>
          </CardSpotlight>

          <CardSpotlight className="rounded-xl border border-white/10 bg-[#111118]">
            <a href="#" className="group flex items-center gap-3.5 p-3.5 sm:p-4">
              <div className="shrink-0">
                <Book3D coverContent={<TechContentCover scale={0.52}/>} spineGradient="linear-gradient(180deg,#08080F,#12121C)" glowColor="rgba(80,70,140,0.5)" scale={0.52}/>
              </div>
              <div className="min-w-0">
                <TypeBadge type="REPORT"/>
                <h3 className="mt-2 text-xs sm:text-sm font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">Technical Content Strategy 2025</h3>
                <p className="mt-1 text-[11px] text-white/38 leading-relaxed">The new blueprint in creating strategy for technical content strategy 2025.</p>
              </div>
            </a>
          </CardSpotlight>

        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="relative z-10 border-t border-white/6 py-10 overflow-hidden">
        <p style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontWeight: 700 }}
          className="text-center text-lg text-white mb-8">
          Trusted by 50+ SaaS startups
        </p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-16 animate-ticker w-max px-8">
            {[CloudflareSVG, PostmanSVG, StripeSVG, TwilioSVG, GitLabSVG,
              CloudflareSVG, PostmanSVG, StripeSVG, TwilioSVG, GitLabSVG].map((Logo, i) => (
              <div key={i} className="shrink-0 opacity-40 hover:opacity-65 transition-opacity grayscale hover:grayscale-0">
                <Logo/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.07] bg-[#09090F] pt-9 pb-5">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-6 pb-7">

            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <img src={logoPath} alt="Infrasity" className="h-6 w-auto mb-4"/>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-full border border-white/10 bg-white/4 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="rgba(255,255,255,0.32)"/></svg>
                </div>
                <div className="w-9 h-9 rounded-full border border-white/10 bg-white/4 flex items-center justify-center">
                  <svg width="13" height="15" viewBox="0 0 20 22" fill="none"><path d="M10 1L2 5v7c0 5 3.6 9 8 10 4.4-1 8-5 8-10V5L10 1z" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5"/><path d="M7 11l2 2 4-4" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
              </div>
              <a href="#" className="inline-flex items-center gap-2 bg-[#111118] hover:bg-white/7 border border-white/10 rounded-xl px-3 py-2 transition-colors">
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">P</span>
                </div>
                <div className="leading-none">
                  <div className="text-[9px] text-white/35 mb-0.5">Featured on</div>
                  <div className="text-[12px] font-bold text-white/80">Product Hunt</div>
                </div>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white/25 ml-0.5"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </a>
            </div>

            {/* TOOLS */}
            <div>
              <h4 className="text-[10.5px] font-bold text-white/70 uppercase tracking-wider mb-3">Tools</h4>
              <ul className="space-y-2">
                {["Begin Visibility","Kackenimany","Pechilist Konversation"].map(l => (
                  <li key={l}><a href="#" className="text-[12px] text-white/36 hover:text-white/60 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* USE CASES */}
            <div>
              <h4 className="text-[10.5px] font-bold text-white/70 uppercase tracking-wider mb-3">Use Cases</h4>
              <ul className="space-y-2">
                {["AP GTM Nominees","SaaS Proman","Infrastructure SaaS","B6DevOps","T&S Obersive SaaS","Videoinfoos","My Max Infinity"].map(l => (
                  <li key={l}><a href="#" className="text-[12px] text-white/36 hover:text-white/60 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-[10.5px] font-bold text-white/70 uppercase tracking-wider mb-3">Services</h4>
              <ul className="space-y-2">
                {["Services Marketing","ASC Decs","Testing Services","Technical Vatiogy"].map(l => (
                  <li key={l}><a href="#" className="text-[12px] text-white/36 hover:text-white/60 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 className="text-[10.5px] font-bold text-white/70 uppercase tracking-wider mb-3">Resources</h4>
              <ul className="space-y-2">
                {["Home","Blog","Case Studio","Contact","Resources","Workflows","Terms on Contacts"].map(l => (
                  <li key={l}><a href="#" className="text-[12px] text-white/36 hover:text-white/60 transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            {/* COMPANY + AWARDS */}
            <div>
              <h4 className="text-[10.5px] font-bold text-white/70 uppercase tracking-wider mb-3">Company</h4>
              <div className="flex items-center gap-2.5 mb-5">
                {[<IconFacebook key="fb"/>,<IconX key="x"/>,<IconLinkedIn key="li"/>,<IconYouTube key="yt"/>].map((Icon,i) => (
                  <a key={i} href="#" className="text-white/26 hover:text-white/58 transition-colors">{Icon}</a>
                ))}
              </div>
              <h4 className="text-[10.5px] font-bold text-white/70 uppercase tracking-wider mb-2.5">Awards</h4>
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/8 rounded-lg px-2.5 py-2">
                <img src={logoPath} alt="" className="h-4 w-auto opacity-50"/>
                <div className="leading-tight">
                  <div className="text-[11.5px] font-semibold text-white/65">Infrasity Now</div>
                  <div className="text-[9.5px] text-white/28 mt-0.5">Recognized Registry</div>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-white/[0.07] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-white/22">© 2023 Infrasity m. Tedict onli-site</p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-[11px] text-white/22 hover:text-white/44 transition-colors">Maintenonized</a>
              <span className="text-white/12 text-xs">|</span>
              <a href="#" className="text-[11px] text-white/22 hover:text-white/44 transition-colors">Recived Registry</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
