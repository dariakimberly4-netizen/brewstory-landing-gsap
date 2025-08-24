import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

const menuItems = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#" },
  { name: "Product", href: "#" },
  { name: "Contact", href: "#" },
];

const Navbar = () => {
  const navRef = useRef(null);

  useGSAP(() => {
    if (navRef.current) {
      console.log(navRef.current.offsetHeight);
    }
    const onLoadT1 = gsap.timeline({ defaults: { ease: "power2.out" } });

    onLoadT1
      .to(
        "nav",
        {
          "--border-width": "100%",
          duration: 3,
        },
        0
      )
      .from(
        ".desktop-nav a",
        {
          y: -100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        0
      );
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      ref={navRef}
      className="bg-[var(--papaya-whip)] shadow-md sticky top-0 w-full z-999"
      style={{ "--border-width": "0%" }}
    >
      <span className="absolute bottom-0 left-0 h-[2px] bg-[var(--sienna)] w-[var(--border-width)]"></span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-4xl font-extralight text-[color:var(--sienna)] font-veneer tracking-wide">
              BREWSTORY
            </span>
          </div>
          {/* Desktop Menu */}
          <div className="desktop-nav hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-[var(--sienna)] hover:text-gray-700 px-3 py-2 rounded-md text-md font-bold transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[color:var(--sienna)] focus:outline-none"
              aria-label="Main menu"
              aria-expanded={menuOpen}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[var(--sienna)] shadow-md">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-[var(--papaya-whip)] hover:text-amber-900 px-3 py-2 rounded-md text-base font-bold transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
