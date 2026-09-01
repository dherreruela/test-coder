import { useState } from 'react';

const navLinks = [
  { label: 'Inicio', href: '#home' },
  { label: 'Line Up', href: '#lineup' },
  { label: 'Ubicación', href: '#location' },
  { label: 'Entradas', href: '#tickets' },
  { label: 'RSVP', href: '#rsvp' }
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-night-900/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 font-display font-bold text-xl">
            <span className="text-neon-cian glow-text">NEON</span>
            <span className="text-neon-magenta glow-text-magenta">NIGHTS</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-neon-cian transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#tickets"
              className="bg-neon-cian/10 border border-neon-cian text-neon-cian px-4 py-2 rounded-lg font-semibold hover:bg-neon-cian/20 transition-all"
            >
              Entradas
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-night-900/95 border-b border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-300 hover:text-neon-cian transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
