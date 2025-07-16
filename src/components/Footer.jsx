import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <LineChart className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
              <span className="text-lg sm:text-xl font-semibold">InvestmentHub</span>
            </Link>
            <p className="text-gray-400 text-sm sm:text-base">
              Your trusted partner in investment and financial growth.
            </p>
          </div>

          <div className="mt-8 sm:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white text-sm sm:text-base">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white text-sm sm:text-base">About</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-white text-sm sm:text-base">Portfolio</Link></li>
              <li><Link to="/market" className="text-gray-400 hover:text-white text-sm sm:text-base">Market</Link></li>
            </ul>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm sm:text-base">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm sm:text-base">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white text-sm sm:text-base">FAQ</Link></li>
            </ul>
          </div>

          <div className="mt-8 lg:mt-0">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800 text-center text-gray-400">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} InvestmentHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;