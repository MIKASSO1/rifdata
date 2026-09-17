import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // حيدت Headphones و Users
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QualityGatewayModal } from "@/components/landing/QualityGatewayModal";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Languages", to: "/languages" },
  { label: "Quality", to: "/quality", gated: true },
  { label: "Data Crowd", to: "/data-crow", badge: "Earn" },
  { label: "Insights", to: "/insights" },
];

// حيدت LinkedInIcon و InstagramIcon و FacebookIcon كاملين

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [gatewayOpen, setGatewayOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = () => {
      setGatewayOpen(true);
    };

    window.addEventListener("rifdata:open-quality-gateway", handler);
    return () => {
      window.removeEventListener("rifdata:open-quality-gateway", handler);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const elevated = scrolled ||!isHome;

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[number]) => {
    if (item.gated) {
      if (location.pathname === "/quality") return;
      e.preventDefault();
      setGatewayOpen(true);
      setOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          elevated
           ? "glass-dark border-b border-white/10 shadow-elegant"
            : "bg-[hsl(211_100%_6%/0.55)] backdrop-blur-md border-b border-white/5"
        }`}
      >
        {/* حذفت Top Bar كامل */}

        {/* Main Nav Row */}
        <div className="container flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0">
            <span
              className="font-display tracking-tight select-none"
              style={{
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1,
                fontSize: "1.15rem",
                letterSpacing: "-0.02em",
              }}
            >
              RifData
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative text-sm font-medium tracking-tight transition-colors ${
                    active? "text-white" : "text-white/65 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="absolute -top-2.5 -right-3 px-1 rounded-[3px] bg-emerald-500/20 border-emerald-500/30 text-emerald-300 text-[9px] font-bold leading-none tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Button variant="emerald" size="default" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu - حيدت منو Top Bar */}
        {open && (
          <div className="lg:hidden glass-dark border-t border-white/10 animate-fade-in">
            <nav className="container py-6 flex flex-col gap-4">
              {/* حذفت div ديال +500h و الأيقونات */}
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={(e) => { handleNavClick(e, item); if (!item.gated) setOpen(false); }}
                  className="text-lg font-medium text-white py-2 flex items-center gap-2"
                >
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-[3px] bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[9px] font-bold leading-none tracking-wider">
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
              <Button variant="emerald" asChild className="mt-2">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Get in Touch
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Quality Gateway Modal */}
      {gatewayOpen && (
        <QualityGatewayModal onClose={() => setGatewayOpen(false)} />
      )}
    </>
  );
};