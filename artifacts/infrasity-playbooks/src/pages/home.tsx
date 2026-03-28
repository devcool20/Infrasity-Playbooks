import { useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import logoPath from "@assets/logo.png";

/* ─── CardSpotlight ───────────────────────────────────────────── */
function CardSpotlight({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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
          ? `radial-gradient(350px circle at ${pos.x}px ${pos.y}px, rgba(124,58,237,0.18) 0%, transparent 70%)`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}

/* ─── 3D Book Covers ──────────────────────────────────────────── */

/* GTM 2026 — terracotta/orange with concentric circles + bar chart */
function BookGTM({ size = 1 }: { size?: number }) {
  const w = 130 * size;
  const h = 170 * size;
  return (
    <svg width={w} height={h} viewBox="0 0 130 170" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(-8px 12px 24px rgba(0,0,0,0.7))", display: "block" }}>
      {/* Spine (left side) */}
      <path d="M0 12 L14 4 L14 166 L0 158 Z" fill="#7A2B0E"/>
      {/* Book thickness top */}
      <path d="M14 4 L130 4 L130 10 L14 10 Z" fill="#4a1a07"/>
      {/* Cover face */}
      <rect x="14" y="10" width="116" height="156" rx="2" fill="url(#gtmGrad)"/>
      {/* Concentric circles pattern */}
      <defs>
        <radialGradient id="gtmGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C2460A"/>
          <stop offset="100%" stopColor="#7A2B0E"/>
        </radialGradient>
      </defs>
      {/* White circle rings */}
      {[18, 32, 46, 60, 74, 88].map((r, i) => (
        <circle key={i} cx="72" cy="72" r={r} stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" fill="none"/>
      ))}
      {/* Bar chart at bottom */}
      <rect x="44" y="125" width="8" height="18" rx="1" fill="rgba(255,255,255,0.6)"/>
      <rect x="55" y="115" width="8" height="28" rx="1" fill="rgba(255,255,255,0.8)"/>
      <rect x="66" y="108" width="8" height="35" rx="1" fill="rgba(255,255,255,0.9)"/>
      <rect x="77" y="120" width="8" height="23" rx="1" fill="rgba(255,255,255,0.7)"/>
      <rect x="88" y="112" width="8" height="31" rx="1" fill="rgba(255,255,255,0.75)"/>
      {/* Infrasity text */}
      <text x="72" y="28" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="1">INFRASITY</text>
      {/* Title */}
      <text x="72" y="52" textAnchor="middle" fill="white" fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="700">State of GTM</text>
      <text x="72" y="65" textAnchor="middle" fill="white" fontSize="9.5" fontFamily="Inter,sans-serif" fontWeight="700">2026</text>
      {/* Spine label */}
      <text x="7" y="100" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="5" fontFamily="Inter,sans-serif" fontWeight="500"
        style={{ writingMode: "vertical-rl" } as React.CSSProperties}>State of GTM 2026</text>
    </svg>
  );
}

/* 7-Figure GTM Engine — dark green with geometric blueprint */
function Book7Figure({ size = 1 }: { size?: number }) {
  const w = 130 * size;
  const h = 170 * size;
  return (
    <svg width={w} height={h} viewBox="0 0 130 170" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(-8px 12px 24px rgba(0,0,0,0.7))", display: "block" }}>
      <defs>
        <linearGradient id="gfGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a4a2e"/>
          <stop offset="100%" stopColor="#0d2b1a"/>
        </linearGradient>
      </defs>
      {/* Spine */}
      <path d="M0 12 L14 4 L14 166 L0 158 Z" fill="#0d2b1a"/>
      {/* Top */}
      <path d="M14 4 L130 4 L130 10 L14 10 Z" fill="#0a1f14"/>
      {/* Cover */}
      <rect x="14" y="10" width="116" height="156" rx="2" fill="url(#gfGrad)"/>
      {/* Grid lines blueprint */}
      {[30, 50, 70, 90, 110, 130].map((x, i) => (
        <line key={`v${i}`} x1={14+x/116*116} y1="10" x2={14+x/116*116} y2="166" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      ))}
      {[20, 40, 60, 80, 100, 120, 140].map((y, i) => (
        <line key={`h${i}`} x1="14" y1={10+y} x2="130" y2={10+y} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
      ))}
      {/* Geometric triangle */}
      <polygon points="72,40 42,105 102,105" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
      {/* Small detail crosses */}
      <line x1="55" y1="78" x2="55" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      <line x1="51" y1="74" x2="59" y2="74" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      <line x1="89" y1="78" x2="89" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      <line x1="85" y1="74" x2="93" y2="74" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
      {/* Horizontal rule */}
      <line x1="30" y1="118" x2="114" y2="118" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      {/* Infrasity */}
      <text x="72" y="28" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="1">INFRASITY</text>
      {/* Title */}
      <text x="72" y="132" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="700">THE 7-FIGURE</text>
      <text x="72" y="145" textAnchor="middle" fill="white" fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="700">GTM ENGINE</text>
      {/* Spine text */}
      <text x="7" y="90" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="Inter,sans-serif">7-Figure GTM</text>
    </svg>
  );
}

/* State of LinkedIn 2026 — dark navy with network dots */
function BookLinkedIn({ size = 1 }: { size?: number }) {
  const w = 130 * size;
  const h = 170 * size;
  // Network node positions
  const nodes = [
    [72, 68], [50, 50], [95, 45], [42, 90], [100, 85], [60, 110], [88, 115], [72, 40],
  ];
  const edges: [number, number][] = [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[2,4],[3,5],[4,6],[5,6],[0,7],[2,7]];
  return (
    <svg width={w} height={h} viewBox="0 0 130 170" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(-8px 12px 24px rgba(0,0,0,0.7))", display: "block" }}>
      <defs>
        <linearGradient id="liGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f1f3d"/>
          <stop offset="100%" stopColor="#080f22"/>
        </linearGradient>
      </defs>
      {/* Spine */}
      <path d="M0 12 L14 4 L14 166 L0 158 Z" fill="#060c1a"/>
      {/* Top */}
      <path d="M14 4 L130 4 L130 10 L14 10 Z" fill="#050a16"/>
      {/* Cover */}
      <rect x="14" y="10" width="116" height="156" rx="2" fill="url(#liGrad)"/>
      {/* Edge lines (network) */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={(nodes[a][0])} y1={(nodes[a][1])}
          x2={(nodes[b][0])} y2={(nodes[b][1])}
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1"
        />
      ))}
      {/* Nodes */}
      {nodes.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={i === 0 ? 5 : 3} fill="rgba(255,255,255,0.7)" />
      ))}
      {/* Glow around center node */}
      <circle cx="72" cy="68" r="12" fill="rgba(100,120,255,0.12)"/>
      {/* Infrasity */}
      <text x="72" y="28" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="1">INFRASITY</text>
      {/* Title */}
      <text x="72" y="135" textAnchor="middle" fill="white" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">State of</text>
      <text x="72" y="148" textAnchor="middle" fill="white" fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">LinkedIn 2026</text>
      {/* Spine text */}
      <text x="7" y="95" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="5" fontFamily="Inter,sans-serif">LinkedIn 2026</text>
    </svg>
  );
}

/* Technical Content Strategy 2025 — slate/graphite */
function BookTechContent({ size = 1 }: { size?: number }) {
  const w = 130 * size;
  const h = 170 * size;
  return (
    <svg width={w} height={h} viewBox="0 0 130 170" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(-8px 12px 24px rgba(0,0,0,0.7))", display: "block" }}>
      <defs>
        <linearGradient id="tcGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a2a3a"/>
          <stop offset="100%" stopColor="#15151f"/>
        </linearGradient>
      </defs>
      <path d="M0 12 L14 4 L14 166 L0 158 Z" fill="#111118"/>
      <path d="M14 4 L130 4 L130 10 L14 10 Z" fill="#0d0d14"/>
      <rect x="14" y="10" width="116" height="156" rx="2" fill="url(#tcGrad)"/>
      {/* Code lines pattern */}
      {[40, 55, 65, 75, 85, 95, 105].map((y, i) => (
        <rect key={i} x={28 + (i % 3) * 5} y={y} width={60 + (i % 4) * 12} height="4" rx="2" fill="rgba(255,255,255,0.15)"/>
      ))}
      {/* Arrow/cursor icon */}
      <polygon points="72,45 60,60 67,60 67,80 77,80 77,60 84,60" fill="rgba(255,255,255,0.5)"/>
      <text x="72" y="28" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="Inter,sans-serif" fontWeight="600" letterSpacing="1">INFRASITY</text>
      <text x="72" y="125" textAnchor="middle" fill="white" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">TECHNICAL CONTENT</text>
      <text x="72" y="137" textAnchor="middle" fill="white" fontSize="8" fontFamily="Inter,sans-serif" fontWeight="700">STRATEGY 2025</text>
    </svg>
  );
}

/* ─── Type Badge ──────────────────────────────────────────────── */
function TypeBadge({ type }: { type: string }) {
  return (
    <span className="inline-block text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded bg-white/8 text-white/60 border border-white/10 uppercase">
      {type}
    </span>
  );
}

/* ─── Data ────────────────────────────────────────────────────── */
const FILTER_TABS = ["All", "Strategy", "Content", "Case Studies"];

/* ─── Footer Social Icons ─────────────────────────────────────── */
function IconFacebook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5"/>
      <path d="M13.5 8.5H15V6.5H13.5C12.1 6.5 11 7.6 11 9V10H9.5V12H11V17.5H13V12H14.5L15 10H13V9C13 8.7 13.2 8.5 13.5 8.5Z"/>
    </svg>
  );
}
function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25H8.08l4.213 5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0D0D14"/>
    </svg>
  );
}

/* ─── Main Page ───────────────────────────────────────────────── */
export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white overflow-x-hidden" style={{ fontFamily: "Inter,-apple-system,BlinkMacSystemFont,sans-serif" }}>

      {/* ── Purple background glow ── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(120,60,255,0.13) 0%, transparent 70%)",
        }}
      />

      {/* ── Announcement Banner ── */}
      {bannerVisible && (
        <div className="relative z-20 bg-[#5B3FD8] text-white text-sm flex items-center justify-center px-10 py-2.5 text-center">
          <p>
            State of GTM 2026 is dropping soon — be the first to get it.{" "}
            <a href="#waitlist" className="underline underline-offset-2 font-semibold hover:text-purple-200 transition-colors" data-testid="link-banner-waitlist">
              Join the waitlist
            </a>
          </p>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white transition-colors"
            aria-label="Close"
            data-testid="button-close-banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-40 bg-[#0D0D14]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="https://infrasity.com" data-testid="link-nav-logo">
            <img src={logoPath} alt="Infrasity" className="h-7 w-auto" />
          </a>

          {/* Hamburger — both mobile + desktop */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px] p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Toggle menu"
            data-testid="button-nav-menu"
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <>
                <span className="block w-5 h-[1.5px] bg-current rounded"/>
                <span className="block w-5 h-[1.5px] bg-current rounded"/>
                <span className="block w-5 h-[1.5px] bg-current rounded"/>
              </>
            )}
          </button>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#0F0F1A] border-b border-white/8 z-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 space-y-1">
              {["Home", "Services", "Tools", "Resources", "Pricing", "FAQ", "About Us"].map((item) => (
                <a key={item} href="#" onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                  data-testid={`link-nav-${item.toLowerCase().replace(" ", "-")}`}
                >
                  {item}
                </a>
              ))}
              <div className="pt-2">
                <a href="#" onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-sm font-semibold text-white text-center transition-colors"
                  data-testid="button-nav-cta"
                >
                  Book a Free Consultation
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-10 text-center sm:text-left">
        <p className="text-xs text-white/35 uppercase tracking-widest mb-4">Resources</p>
        <h1 className="text-[clamp(2.5rem,8vw,4rem)] font-bold tracking-tight text-white leading-tight">
          Reports &amp; Playbooks
        </h1>
        <p className="mt-3 text-white/50 text-sm sm:text-base max-w-lg mx-auto sm:mx-0 leading-relaxed">
          Deep research and battle-tested frameworks for B2B founders and revenue teams navigating the AI era.
        </p>
      </section>

      {/* ── Featured Cards: 2-col grid ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">

          {/* Card 1 — State of GTM 2026 */}
          <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
            <a href="#" className="group block" data-testid="card-gtm-2026">
              <div className="flex items-center justify-center pt-5 pb-3 px-3 sm:pt-8 sm:pb-4 sm:px-6" style={{ minHeight: 160 }}>
                <div className="transform group-hover:scale-[1.03] transition-transform duration-300 w-full flex justify-center">
                  <BookGTM size={0.85} />
                </div>
              </div>
              <div className="px-3 sm:px-5 pb-4 sm:pb-6">
                <TypeBadge type="REPORT" />
                <h3 className="mt-2 sm:mt-3 text-sm sm:text-lg font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  State of GTM 2026
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/50 leading-relaxed">
                  Original research on how B2B go-to-market is evolving in the AI era. Based on data from 200+ GTM leaders.
                </p>
              </div>
            </a>
          </CardSpotlight>

          {/* Card 2 — 7-Figure GTM Engine */}
          <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
            <a href="#" className="group block" data-testid="card-7figure">
              <div className="flex items-center justify-center pt-5 pb-3 px-3 sm:pt-8 sm:pb-4 sm:px-6" style={{ minHeight: 160 }}>
                <div className="transform group-hover:scale-[1.03] transition-transform duration-300 w-full flex justify-center">
                  <Book7Figure size={0.85} />
                </div>
              </div>
              <div className="px-3 sm:px-5 pb-4 sm:pb-6">
                <TypeBadge type="PLAYBOOK" />
                <h3 className="mt-2 sm:mt-3 text-sm sm:text-lg font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  The 7-Figure GTM Engine
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/50 leading-relaxed">
                  The complete framework for building a founder-led content program that generates measurable pipeline.
                </p>
              </div>
            </a>
          </CardSpotlight>

        </div>
      </section>

      {/* ── Featured Card 3 — LinkedIn (horizontal) ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
          <a href="#" className="group flex items-center gap-6 p-5 sm:p-6" data-testid="card-linkedin">
            <div className="shrink-0 transform group-hover:scale-[1.03] transition-transform duration-300">
              <BookLinkedIn size={0.82} />
            </div>
            <div className="min-w-0">
              <TypeBadge type="REPORT" />
              <h3 className="mt-3 text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                State of LinkedIn 2026
              </h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                How the algorithm rewards original insight — and what that means for B2B content strategy.
              </p>
            </div>
          </a>
        </CardSpotlight>
      </section>

      {/* ── Subscribe Section ── */}
      <section id="waitlist" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <div
          className="rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #5B3FD8 0%, #4A2FC4 40%, #3B22B0 100%)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(160,100,255,0.2) 0%, transparent 70%)"
          }}/>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Subscribe to get new playbooks
            </h2>
            <p className="mt-3 text-purple-200/80 text-sm max-w-sm mx-auto">
              Join 5,000+ developer marketers who get actionable insights delivered to their inbox.
            </p>
            <a
              href="#"
              className="mt-6 inline-block px-8 py-3 rounded-full bg-white text-purple-800 font-bold text-sm hover:bg-purple-50 transition-colors"
              data-testid="button-subscribe"
            >
              Join the newsletter
            </a>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-6">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                activeFilter === tab
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-transparent border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
              }`}
              data-testid={`button-filter-${tab.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ── More Resources ── */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <h2 className="text-xl font-bold text-white text-center mb-6">More Resources</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Resource Card — State of LinkedIn 2026 */}
          <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
            <a href="#" className="group flex items-center gap-4 p-4 sm:p-5" data-testid="card-resource-linkedin">
              <div className="shrink-0 transform group-hover:scale-[1.03] transition-transform duration-300">
                <BookLinkedIn size={0.68} />
              </div>
              <div className="min-w-0">
                <TypeBadge type="REPORT" />
                <h3 className="mt-2 text-sm font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  State of LinkedIn 2026
                </h3>
                <p className="mt-1.5 text-xs text-white/45 leading-relaxed">
                  How the algorithm rewards original insight — and what that means for B2B content strategy.
                </p>
              </div>
            </a>
          </CardSpotlight>

          {/* Resource Card — Technical Content Strategy 2025 */}
          <CardSpotlight className="rounded-2xl border border-white/10 bg-[#111118]">
            <a href="#" className="group flex items-center gap-4 p-4 sm:p-5" data-testid="card-resource-techcontent">
              <div className="shrink-0 transform group-hover:scale-[1.03] transition-transform duration-300">
                <BookTechContent size={0.68} />
              </div>
              <div className="min-w-0">
                <TypeBadge type="REPORT" />
                <h3 className="mt-2 text-sm font-bold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  Technical Content Strategy 2025
                </h3>
                <p className="mt-1.5 text-xs text-white/45 leading-relaxed">
                  The new blueprint in creating strategy for technical content strategy 2025.
                </p>
              </div>
            </a>
          </CardSpotlight>

        </div>
      </section>

      {/* ── Trusted By ── */}
      <section className="relative z-10 border-t border-white/6 py-10 overflow-hidden">
        <p className="text-center text-lg font-bold text-white mb-8">Trusted by 50+ SaaS startups</p>
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-16 animate-ticker w-max px-8">
            {[
              "Cloudflare", "Postman", "Stripe", "Twilio", "GitLab",
              "Cloudflare", "Postman", "Stripe", "Twilio", "GitLab",
            ].map((name, i) => (
              <span
                key={i}
                className="shrink-0 text-white/30 font-bold text-sm sm:text-base tracking-wide uppercase"
                data-testid={`logo-${name.toLowerCase()}-${i}`}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.07] bg-[#0A0A12] pt-12 pb-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          {/* Footer grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-8 pb-10">

            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 md:col-span-1">
              <img src={logoPath} alt="Infrasity" className="h-6 w-auto mb-4" />
              {/* Badges */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" fill="rgba(255,255,255,0.4)"/>
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                  <svg width="16" height="18" viewBox="0 0 20 24" fill="none">
                    <path d="M10 1L2 5v7c0 5 3.6 9.3 8 10.3C14.4 21.3 18 17 18 12V5L10 1z" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"/>
                    <path d="M7 12l2 2 4-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              {/* Product Hunt */}
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/10 rounded-lg px-3 py-2 transition-colors"
                data-testid="link-footer-producthunt"
              >
                <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">P</div>
                <div className="leading-none">
                  <div className="text-[9px] text-white/40 mb-0.5">Featured on</div>
                  <div className="text-xs font-semibold text-white/80">Product Hunt</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/30 ml-1">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>

            {/* Tools */}
            <div>
              <h4 className="text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-3">Tools</h4>
              <ul className="space-y-2">
                {["Begin Visibility", "Kackenimany", "Pechilist Konversation"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[12px] text-white/38 hover:text-white/65 transition-colors leading-none">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div>
              <h4 className="text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-3">Use Cases</h4>
              <ul className="space-y-2">
                {["AP GTM Nominees", "SaaS Proman", "Infrastructure SaaS", "B6DevOps", "T&S Obersive SaaS", "Videoinfoos", "My Max Infinity"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[12px] text-white/38 hover:text-white/65 transition-colors leading-none">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-3">Services</h4>
              <ul className="space-y-2">
                {["Services Marketing", "ASC Decs", "Testing Services", "Technical Vatiogy"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[12px] text-white/38 hover:text-white/65 transition-colors leading-none">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-3">Resources</h4>
              <ul className="space-y-2">
                {["Home", "Blog", "Case Studio", "Contact", "Resources", "Workflows", "Terms on Contacts"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[12px] text-white/38 hover:text-white/65 transition-colors leading-none">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-3">Company</h4>
              <div className="flex items-center gap-3 mb-6">
                {[<IconFacebook key="fb"/>, <IconX key="x"/>, <IconLinkedIn key="li"/>, <IconYouTube key="yt"/>].map((Icon, i) => (
                  <a key={i} href="#" className="text-white/30 hover:text-white/70 transition-colors" data-testid={`link-footer-social-${i}`}>
                    {Icon}
                  </a>
                ))}
              </div>
              {/* Awards */}
              <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-2">Awards</p>
              <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-lg px-3 py-2">
                <img src={logoPath} alt="" className="h-4 w-auto opacity-50" />
                <div className="leading-none">
                  <div className="text-[11px] font-semibold text-white/65">Infrasity Now</div>
                  <div className="text-[10px] text-white/30 mt-0.5">Recognized Registry</div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.07] pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-white/22">
              © 2023 Infrasity m.<br className="sm:hidden"/> Tedict onli-site
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[11px] text-white/22 hover:text-white/45 transition-colors">Maintenonized</a>
              <span className="text-white/15">|</span>
              <a href="#" className="text-[11px] text-white/22 hover:text-white/45 transition-colors">Recived Registry</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
