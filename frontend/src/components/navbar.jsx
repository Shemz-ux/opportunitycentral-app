import { User, Menu, X, Compass } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Blog", href: "/blog" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-[#F9FAFB] sticky top-0 z-40">
      <div className="max-w-[1400px] mx-auto px-8 py-5 flex items-center justify-between">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#0A0A0A] rounded-lg flex items-center justify-center">
            <Compass className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-normal text-[#0A0A0A] tracking-tight">
            Opportunity Central
          </span>
        </Link>

        {/* Nav Links - Center */}
        <nav className="hidden md:flex items-center gap-15 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`nav-link text-sm transition-opacity ${
                location.pathname === link.href ||
                (link.href !== "/" && location.pathname.startsWith(link.href))
                  ? "text-[#0A0A0A] opacity-100"
                  : "text-[#0A0A0A] hover:opacity-60"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Button - Right */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:flex items-center gap-2 px-5 py-2 border border-[#0A0A0A] rounded-full text-sm text-[#0A0A0A] hover:text-white transition-colors relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-[#0A0A0A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full"></span>
            <User className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Get In Touch</span>
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F9FAFB] border-t border-gray-100 px-8 py-6">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-[#0A0A0A] py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;