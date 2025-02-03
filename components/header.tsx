import Link from 'next/link';
import { useState } from 'react';

/**
 * Header Component:
 * A functional component that renders the header section of the website.
 * Includes logo, desktop navigation, and mobile menu toggle.
 * Uses Tailwind CSS for styling and responsiveness.
 */
const Header: React.FC = () => {
  // State to manage the mobile menu open/close state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * toggleMobileMenu:
   * Function to toggle the mobile menu state (open/close).
   * It's called when the mobile menu button is clicked.
   */
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-50 border-b border-gray-200">
      {/* Container for header content, using max-w and mx-auto to center and limit width on larger screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container to align logo and navigation items */}
        <div className="flex justify-between h-16">
          {/* Logo/Title Section */}
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-800">
              <Link href="/" className="hover:text-gray-900">
                NextQL Blog
              </Link>
            </h1>
          </div>

          {/* Navigation Section */}
          <nav className="hidden md:flex items-center space-x-4">
            {/* Desktop Navigation Links */}
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link href="/create-post" className="text-gray-600 hover:text-gray-800">
              Create Post
            </Link>
          </nav>

          {/* Mobile Menu Button Section (visible on small screens) */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span> {/* Screen reader text for accessibility */}
              {/* Heroicon: outline/menu */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Heroicon: outline/x, show when menu is open (not implemented in this basic example, consider for enhanced UX) */}
              {/* <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg> */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (hidden by default, shown when isMobileMenuOpen is true) */}
      <div className="md:hidden" id="mobile-menu" style={{ display: isMobileMenuOpen ? 'block' : 'none' }}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" onClick={toggleMobileMenu} className="bg-gray-100 text-gray-800 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200">
            Home
          </Link>
          <Link href="/create-post" onClick={toggleMobileMenu} className="text-gray-600 hover:bg-gray-200 hover:text-gray-800 block px-3 py-2 rounded-md text-base font-medium">
            Create Post
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;