import React from 'react';

interface Link {
  name: string;
  href: string;
}

/**
 * Footer Component:
 * A functional component that renders the footer section of the website.
 * It includes sections for 'About Us', 'Quick Links', 'Legal', 'Contact',
 * social media links, and copyright information.
 * Uses Tailwind CSS for styling.
 */
const Footer: React.FC = () => {
  // Define quick links for the footer navigation
  const quickLinks: Link[] = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Define legal links for the footer navigation
  const legalLinks: Link[] = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ];

  return (
    <footer className="bg-gray-100 py-12 border-t border-gray-200">
      {/* Container for the footer content, using max-w and mx-auto to center and limit width on larger screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid layout for the footer sections, responsive to screen size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">About Us</h3>
            <p className="text-gray-500 text-sm">
              Empowering creators with modern tools and resources to build amazing digital experiences.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-gray-900">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-500 hover:text-gray-900">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact</h3>
            <address className="text-gray-500 text-sm not-italic"> {/* not-italic to reset address tag styling */}
              <p className="mb-1">123 Creative Street</p>
              <p className="mb-1">Tech City, TC 12345</p>
              <p className="mb-1">Phone: (555) 123-4567</p>
              <p className="mb-1">Email: <a href="mailto:contact@example.com" className="hover:text-gray-900">contact@example.com</a></p>
            </address>
          </div>
        </div>

        {/* Social Media & Copyright Section - Separated by a border for visual clarity */}
        <div className="mt-12 border-t border-gray-200 pt-8 sm:flex sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            {/* Social Media Links */}
            <div className="flex space-x-4">
              {/* Twitter Link */}
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Twitter</span> {/* Screen reader only text for accessibility */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              {/* GitHub Link */}
              <a href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">GitHub</span> {/* Screen reader only text for accessibility */}
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright Text */}
          <div>
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;