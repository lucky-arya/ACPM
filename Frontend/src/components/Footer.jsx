import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import acpmLogo from '../assets/ACPM_LOGO.webp';

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                  <img src={acpmLogo} alt="ACPM Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">ACPM</h2>
                  <p className="text-xs text-gray-400">Association of Clinical Perfusionist</p>
                </div>
              </Link>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Advancing cardiovascular care through professional excellence, education, and research in clinical perfusion.
              </p>
              <div className="flex gap-3">
                {[
                  {
                    Icon: FacebookIcon,
                    label: 'Facebook',
                    className: 'hover:bg-[#1877F2]',
                    href: 'https://facebook.com/macp2015'
                  },
                  {
                    Icon: TwitterIcon,
                    label: 'X',
                    className: 'hover:bg-black',
                    href: '#'
                  },
                  {
                    Icon: LinkedinIcon,
                    label: 'LinkedIn',
                    className: 'hover:bg-[#0A66C2]',
                    href: '#'
                  },
                  {
                    Icon: InstagramIcon,
                    label: 'Instagram',
                    className: 'hover:bg-[linear-gradient(135deg,#F58529_0%,#DD2A7B_45%,#8134AF_75%,#515BD4_100%)]',
                    href: 'https://www.instagram.com/_acp_maharashtra/'
                  },
                  {
                    Icon: YouTubeIcon,
                    label: 'YouTube',
                    className: 'hover:bg-[#FF0000]',
                    href: '#'
                  }
                ].map(({ Icon, label, className, href }) => (
                  <a 
                    key={label}
                    href={href || "#"} 
                    target={href !== '#' ? "_blank" : undefined}
                    rel={href !== '#' ? "noopener noreferrer" : undefined}
                    className={`w-10 h-10 rounded-xl bg-gray-800 text-gray-300 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white ${className}`}
                    aria-label={label}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About & Team', path: '/about' },
                  { label: 'Events', path: '/events' },
                  { label: 'Articles', path: '/articles' },
                  { label: 'Membership', path: '/membership' },
                  { label: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-px bg-primary-500 transition-all duration-300"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                Resources
              </h3>
              <ul className="space-y-3">
                {['CME Programs', 'Conferences', 'Workshops', 'Guidelines', 'Career Guidance'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                      <span className="w-0 group-hover:w-2 h-px bg-primary-500 transition-all duration-300"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></span>
                Contact Info
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary-400" size={18} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Maharashtra, India</p>
                    <p className="text-gray-500 text-xs">Serving all 39+ districts</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary-400" size={18} />
                  </div>
                  <a href="tel:+919890610595" className="text-gray-400 hover:text-white transition-colors text-sm">
                    +91 9890610595<br/>+91 9137848181<br/>+91 9821759233
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary-400" size={18} />
                  </div>
                  <a href="mailto:acpmaha01@gmail.com" className="text-gray-400 hover:text-white transition-colors text-sm break-all">
                    acpmaha01@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary-400" size={18} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Mon - Fri: 9AM - 6PM</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-500 text-center md:text-left">
                © {currentYear} ACPM Maharashtra • 
                After The Dot -
              <a href="https://mkitos.codeberg.page" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 transition-colors"> .MKITOS</a>
              </p>
              
              <div className="flex items-center gap-4">
                <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors">Privacy</Link>
                <Link to="/terms" className="text-gray-500 hover:text-white transition-colors">Terms</Link>
                <a href="#" className="text-gray-500 hover:text-white transition-colors">Sitemap</a>
                <Link to="/admin" className="text-gray-600 hover:text-gray-400 transition-colors text-xs" title="Reveal Admin">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
