"use client";
import { useState } from "react";
import { X, Menu, ChevronLeft, ChevronRight, BookOpen, BarChart2, Linkedin, FileText } from "lucide-react";
import logoPath from "@assets/logo.png";

const PLAYBOOKS = [
  {
    id: 1,
    type: "REPORT",
    title: "State of GTM 2026",
    desc: "Original research on how B2B go-to-market is evolving in the AI era. Based on data from 200+ GTM leaders.",
    color: "from-orange-900 via-orange-800 to-red-900",
    icon: BarChart2,
    accent: "#C2410C",
  },
  {
    id: 2,
    type: "PLAYBOOK",
    title: "The 7-Figure GTM Engine",
    desc: "The complete framework for building a founder-led content program that generates measurable pipeline.",
    color: "from-emerald-900 via-green-800 to-teal-900",
    icon: BookOpen,
    accent: "#065F46",
  },
  {
    id: 3,
    type: "REPORT",
    title: "State of LinkedIn 2026",
    desc: "How the algorithm rewards original insight — and what that means for B2B content strategy.",
    color: "from-blue-950 via-blue-900 to-indigo-950",
    icon: Linkedin,
    accent: "#1E3A5F",
  },
];

const MORE_RESOURCES = [
  {
    id: 4,
    type: "REPORT",
    title: "State of LinkedIn 2026",
    desc: "How the algorithm rewards original insight — and what that means for B2B content strategy.",
    color: "from-blue-950 via-blue-900 to-slate-900",
    icon: Linkedin,
  },
  {
    id: 5,
    type: "REPORT",
    title: "Technical Content Strategy 2025",
    desc: "The new blueprint in creating strategy for technical content strategy 2025.",
    color: "from-slate-800 via-slate-700 to-slate-900",
    icon: FileText,
  },
];

const FILTER_TABS = ["All", "Strategy", "Content", "Case Studies"] as const;

const TRUSTED_LOGOS = [
  { name: "Cloudflare", svg: CloudflareLogo },
  { name: "Postman", svg: PostmanLogo },
  { name: "Stripe", svg: StripeLogo },
  { name: "Twilio", svg: TwilioLogo },
  { name: "GitLab", svg: GitLabLogo },
  { name: "Brevo", svg: BrevoLogo },
  { name: "Travis CI", svg: TravisCILogo },
  { name: "Daytona", svg: DaytonaLogo },
];

function CloudflareLogo() {
  return (
    <svg viewBox="0 0 120 40" fill="none" className="h-8 w-auto">
      <path d="M82.5 23.5c-.3-1-1.1-1.7-2.1-1.9l-16.2-.2c-.2 0-.4-.1-.5-.2-.1-.1-.2-.3-.1-.5.1-.4.5-.7 1-.7l16.3.2c2 .1 4.2-1.5 4.9-3.5l.6-1.7c0-.1 0-.3-.1-.4-1.6-7-7.9-12.1-15.3-12.1-6.9 0-12.7 4.5-14.8 10.7-1.4-.9-3-1.4-4.8-1.3-3.2.1-5.9 2.4-6.4 5.5-.1.6-.1 1.2 0 1.8-3.8.3-6.8 3.5-6.8 7.4 0 .3 0 .6.1.9h43.8c.4-.1.8-.4.9-.8l1-3.2z" fill="#F6821F"/>
      <path d="M90.5 16.6c-.2 0-.4 0-.6.1-.1 0-.2.1-.3.2l-1 3.5c-.3 1-1.1 1.7-2.1 1.9l-16.2.2c-.2 0-.4.1-.5.2-.1.1-.2.3-.1.5.1.4.5.7 1 .7l16.3-.2c2-.1 4.2 1.5 4.9 3.5l.6 1.7c0 .1 0 .3-.1.4-.1 0-.1.1-.1.1-.5 0-.9.4-.9.9.1.5.5.9 1 .9 2.4 0 4.3-2 4.3-4.4v-.3c-.2-5.2-2.8-9.3-6.2-9.7z" fill="#FBAD41"/>
      <text x="10" y="30" fill="white" fontSize="11" fontFamily="sans-serif" fontWeight="600">Cloudflare</text>
    </svg>
  );
}

function PostmanLogo() {
  return (
    <svg viewBox="0 0 120 40" fill="none" className="h-7 w-auto">
      <circle cx="20" cy="20" r="12" fill="#FF6C37"/>
      <path d="M14 20 L20 14 L26 20 L20 26 Z" fill="white" opacity="0.9"/>
      <text x="36" y="25" fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="600">Postman</text>
    </svg>
  );
}

function StripeLogo() {
  return (
    <svg viewBox="0 0 80 32" className="h-7 w-auto">
      <path d="M35.6 11.4c0-1.3 1-1.8 2.7-1.8 2.4 0 5.5.7 7.9 2V5.2c-2.6-1-5.3-1.4-7.9-1.4C32.1 3.8 28 6.3 28 11.7c0 8.2 11.3 6.9 11.3 10.4 0 1.5-1.3 2-3.1 2-2.7 0-6.1-.9-8.8-2.5v6.5c3 1.3 6 1.8 8.8 1.8 6.7 0 11.3-2.4 11.3-7.9-.1-8.9-11.9-7.3-11.9-10.6z" fill="#635BFF"/>
      <text x="0" y="22" fill="#635BFF" fontSize="14" fontFamily="sans-serif" fontWeight="700">stripe</text>
    </svg>
  );
}

function TwilioLogo() {
  return (
    <svg viewBox="0 0 110 40" fill="none" className="h-7 w-auto">
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
    <svg viewBox="0 0 110 40" fill="none" className="h-7 w-auto">
      <path d="M20 30 L8 18 L12 8 L20 22 L28 8 L32 18 Z" fill="#FC6D26"/>
      <path d="M20 30 L12 18 L20 22 Z" fill="#E24329"/>
      <path d="M20 30 L28 18 L20 22 Z" fill="#E24329"/>
      <path d="M8 18 L5 22 L20 30 Z" fill="#FCA326"/>
      <path d="M32 18 L35 22 L20 30 Z" fill="#FCA326"/>
      <text x="42" y="25" fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="600">GitLab</text>
    </svg>
  );
}

function BrevoLogo() {
  return (
    <svg viewBox="0 0 90 40" fill="none" className="h-7 w-auto">
      <rect x="5" y="8" width="22" height="24" rx="4" fill="#0B996E"/>
      <path d="M12 20 Q16 15 20 20 Q16 25 12 20Z" fill="white"/>
      <text x="32" y="25" fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="600">Brevo</text>
    </svg>
  );
}

function TravisCILogo() {
  return (
    <svg viewBox="0 0 120 40" fill="none" className="h-7 w-auto">
      <circle cx="20" cy="20" r="13" fill="#3EAAAF"/>
      <path d="M13 20 L18 25 L27 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="38" y="25" fill="white" fontSize="11" fontFamily="sans-serif" fontWeight="600">Travis CI</text>
    </svg>
  );
}

function DaytonaLogo() {
  return (
    <svg viewBox="0 0 100 40" fill="none" className="h-7 w-auto">
      <rect x="5" y="10" width="20" height="20" rx="3" fill="#5F64FF"/>
      <path d="M10 20 L15 13 L20 20 L15 27 Z" fill="white"/>
      <text x="30" y="25" fill="white" fontSize="13" fontFamily="sans-serif" fontWeight="600">Daytona</text>
    </svg>
  );
}

function BookCover({
  color,
  icon: Icon,
  title,
}: {
  color: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div
      className={`w-full h-full bg-gradient-to-br ${color} relative rounded-sm overflow-hidden flex items-center justify-center`}
      style={{
        perspective: "600px",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-4 border border-white/30 rounded" />
        <div className="absolute inset-6 border border-white/20 rounded" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
        <Icon className="text-white/60 w-10 h-10 mb-3" strokeWidth={1} />
        <span className="text-white/90 text-xs font-semibold tracking-widest uppercase">Infrasity</span>
        <span className="text-white text-sm font-bold mt-1 leading-tight">{title}</span>
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/30" />
    </div>
  );
}

function BookCard3D({
  color,
  icon,
  title,
}: {
  color: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="relative" style={{ perspective: "700px", width: "140px", height: "185px" }}>
      <div
        className="w-full h-full rounded overflow-hidden shadow-2xl"
        style={{
          transform: "rotateY(-10deg) rotateX(4deg)",
          transformStyle: "preserve-3d",
          transition: "transform 0.3s ease",
        }}
      >
        <BookCover color={color} icon={icon} title={title} />
        <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-r from-black/40 to-black/10" />
      </div>
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  const isReport = type === "REPORT";
  return (
    <span
      className={`inline-block text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded ${
        isReport
          ? "bg-white/10 text-white/60 border border-white/10"
          : "bg-purple-500/20 text-purple-300 border border-purple-500/20"
      }`}
    >
      {type}
    </span>
  );
}

export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Announcement Banner */}
      {bannerVisible && (
        <div className="bg-purple-700 text-white text-sm py-2.5 px-4 flex items-center justify-center gap-2 relative">
          <span className="text-center">
            State of GTM 2026 is dropping soon — be the first to get it.{" "}
            <a
              href="#waitlist"
              className="underline underline-offset-2 font-semibold hover:text-purple-200 transition-colors"
              data-testid="link-banner-waitlist"
            >
              Join the waitlist
            </a>
          </span>
          <button
            onClick={() => setBannerVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
            data-testid="button-close-banner"
            aria-label="Close banner"
          >
            <X size={15} />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="border-b border-white/8 bg-[#0D0D14]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <a href="https://infrasity.com" className="flex items-center gap-2.5" data-testid="link-nav-logo">
            <img src={logoPath} alt="Infrasity" className="h-7 w-auto" />
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {["Home", "Services", "Tools", "Resources", "Pricing", "FAQ", "About Us"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-3 py-1.5 text-sm text-white/65 hover:text-white transition-colors rounded"
                data-testid={`link-nav-${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 transition-colors text-sm font-medium text-white"
              data-testid="button-nav-cta"
            >
              Book a Free Consultation
            </a>
            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/8 bg-[#0D0D14] px-4 py-3 space-y-1">
            {["Home", "Services", "Tools", "Resources", "Pricing", "FAQ", "About Us"].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 text-sm text-white/65 hover:text-white transition-colors rounded hover:bg-white/5"
                data-testid={`link-mobile-nav-${item.toLowerCase().replace(" ", "-")}`}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-2 px-4 py-2 rounded bg-purple-600 hover:bg-purple-500 transition-colors text-sm font-medium text-white text-center"
              data-testid="button-mobile-cta"
            >
              Book a Free Consultation
            </a>
          </div>
        )}
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-1">
        <span className="text-sm text-white/40">Resources</span>
      </div>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          Reports &amp; Playbooks
        </h1>
        <p className="mt-4 text-white/55 text-base sm:text-lg max-w-xl leading-relaxed">
          Deep research and frameworks built for B2B SaaS marketers and founders navigating the AI era.
        </p>
      </section>

      {/* Featured Playbooks Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLAYBOOKS.map((book) => (
            <a
              key={book.id}
              href="#"
              className="group flex flex-col rounded-xl border border-white/8 bg-[#13131E] hover:border-purple-500/30 transition-all duration-200 overflow-hidden hover:shadow-lg hover:shadow-purple-900/10"
              data-testid={`card-playbook-${book.id}`}
            >
              <div className="h-56 p-6 flex items-center justify-center">
                <BookCard3D color={book.color} icon={book.icon} title={book.title} />
              </div>
              <div className="p-5 flex-1">
                <TypeBadge type={book.type} />
                <h3 className="mt-2 text-base font-semibold text-white leading-snug group-hover:text-purple-300 transition-colors">
                  {book.title}
                </h3>
                <p className="mt-2 text-sm text-white/50 leading-relaxed">{book.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Subscribe Section */}
      <section
        id="waitlist"
        className="max-w-6xl mx-auto px-4 sm:px-6 pb-12"
      >
        <div className="rounded-2xl bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #a855f7 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 40%)"
          }} />
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Subscribe to get new playbooks
            </h2>
            <p className="mt-3 text-purple-200/80 text-sm sm:text-base max-w-md mx-auto">
              Join 5,000+ developer marketers who get actionable insights delivered to their inbox.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-72 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-all"
                data-testid="input-subscribe-email"
              />
              <a
                href="#"
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-white text-purple-800 font-semibold text-sm hover:bg-purple-50 transition-colors"
                data-testid="button-subscribe"
              >
                Join the newsletter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs + More Resources */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-8">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                activeFilter === tab
                  ? "bg-purple-600 border-purple-600 text-white"
                  : "bg-transparent border-white/15 text-white/55 hover:border-white/30 hover:text-white/80"
              }`}
              data-testid={`button-filter-${tab.toLowerCase().replace(" ", "-")}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-white mb-5">More Resources</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MORE_RESOURCES.map((resource) => {
            const Icon = resource.icon;
            return (
              <a
                key={resource.id}
                href="#"
                className="group flex gap-4 rounded-xl border border-white/8 bg-[#13131E] hover:border-purple-500/30 transition-all duration-200 p-4 overflow-hidden"
                data-testid={`card-resource-${resource.id}`}
              >
                <div
                  className={`w-24 h-24 shrink-0 rounded-lg bg-gradient-to-br ${resource.color} flex items-center justify-center relative overflow-hidden`}
                >
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-2 border border-white/30 rounded" />
                  </div>
                  <Icon className="text-white/70 w-7 h-7 relative z-10" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <TypeBadge type={resource.type} />
                  <h3 className="mt-1.5 text-sm font-semibold text-white leading-snug group-hover:text-purple-300 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/45 leading-relaxed">{resource.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-t border-white/8 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Trusted by 50+ SaaS startups</h2>
        </div>

        <div className="relative overflow-hidden" data-testid="logos-ticker">
          <div className="flex animate-ticker w-max gap-12 items-center">
            {[...TRUSTED_LOGOS, ...TRUSTED_LOGOS].map((logo, i) => {
              const LogoSvg = logo.svg;
              return (
                <div
                  key={`${logo.name}-${i}`}
                  className="opacity-40 hover:opacity-70 transition-opacity shrink-0 grayscale hover:grayscale-0 transition-all"
                >
                  <LogoSvg />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 bg-[#0A0A10] pt-12 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <img src={logoPath} alt="Infrasity" className="h-7 w-auto mb-4" />
              <div className="flex gap-2 mt-4 flex-wrap">
                <span className="text-[10px] text-white/30 bg-white/5 border border-white/8 px-2 py-1 rounded">G2 Badge</span>
                <span className="text-[10px] text-white/30 bg-white/5 border border-white/8 px-2 py-1 rounded">Clutch Top</span>
              </div>
              <a
                href="#"
                className="mt-4 flex items-center gap-2 bg-white/5 hover:bg-white/8 border border-white/8 rounded-lg px-3 py-2 transition-colors w-fit"
                data-testid="link-footer-producthunt"
              >
                <span className="text-orange-400 text-lg">P</span>
                <span className="text-xs text-white/60">Featured on<br /><strong className="text-white/80">Product Hunt</strong></span>
              </a>
            </div>

            {/* Link columns */}
            {[
              {
                heading: "Tools",
                links: ["Begin Visibility", "HackerNews", "Pathmaster Konversation"],
              },
              {
                heading: "Use Cases",
                links: ["AP GTM Nominees", "SaaS Proman", "Infrastructure SaaS", "B&DevOps", "T&S Obersive SaaS", "Videinfoos", "My Max Infinity"],
              },
              {
                heading: "Services",
                links: ["Services Marketing", "ASC Decs", "Testing Services", "Technical Vratiogy"],
              },
              {
                heading: "Resources",
                links: ["Home", "Blog", "Case Studio", "Contact", "Resources", "Workflows", "Terms on Contacts"],
              },
              {
                heading: "Company",
                links: [],
                social: true,
              },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-3">{col.heading}</h4>
                {col.social ? (
                  <div className="flex gap-3">
                    {["twitter", "x", "linkedin", "youtube"].map((s) => (
                      <a
                        key={s}
                        href="#"
                        className="text-white/30 hover:text-white/70 transition-colors text-sm"
                        data-testid={`link-footer-social-${s}`}
                      >
                        {s === "twitter" ? "𝕏" : s === "x" ? "◻" : s === "linkedin" ? "in" : "▶"}
                      </a>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-1.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-xs text-white/40 hover:text-white/70 transition-colors"
                          data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {col.heading === "Company" && (
                  <div className="mt-6">
                    <p className="text-xs text-white/40 font-semibold mb-2">Awards</p>
                    <div className="flex items-center gap-2 text-xs text-white/50 bg-white/5 border border-white/8 rounded px-2.5 py-1.5">
                      <img src={logoPath} alt="" className="h-4 w-auto opacity-60" />
                      <span>Infrasity Now<br /><span className="text-white/30 text-[10px]">Recognized Registry</span></span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer bottom */}
          <div className="pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/25">© 2023 Infrasity m. Redict onli-site</p>
            <div className="flex gap-4">
              <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors" data-testid="link-footer-maintained">Maintenonized</a>
              <a href="#" className="text-xs text-white/25 hover:text-white/50 transition-colors" data-testid="link-footer-registry">Recived Registry</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
