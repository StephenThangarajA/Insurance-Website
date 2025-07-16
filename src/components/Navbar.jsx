import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';
import { LineChart } from 'lucide-react';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { LogOut, User as UserIcon, Menu, X } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <LineChart className="h-8 w-8 md:h-10 md:w-12 text-white" />
              <span className="text-xl md:text-3xl font-semibold text-white ml-2">InvestmentHub</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-400 hover:text-white focus:outline-none focus:text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10 ml-auto">
            <Link to="/" className="text-base font-medium text-gray-400 hover:text-white transition">Home</Link>
            <Link to="/about" className="text-base font-medium text-gray-400 hover:text-white transition">About</Link>
            <Link to="/market" className="text-base font-medium text-gray-400 hover:text-white transition">Market</Link>
            <Link to="/blog" className="text-base font-medium text-gray-400 hover:text-white transition">Blog</Link>
            <Link to="/contact" className="text-base font-medium text-gray-400 hover:text-white transition">Contact</Link>
          </div>

          {/* Desktop user menu */}
          <div className="hidden md:block">
            {user ? (
              <div className="ml-6 lg:ml-10 relative group">
                <Avatar>
                  <AvatarFallback className="uppercase bg-white text-gray-900 font-bold">
                    {user.name ? user.name.charAt(0) : '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Button
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-gray-700 hover:bg-gray-100 bg-transparent shadow-none"
                    variant="ghost"
                    onClick={() => navigate('/portfolio')}
                  >
                    <LineChart className="w-4 h-4 text-gray-500" />
                    Portfolio
                  </Button>
                  <Button
                    className="w-full flex items-center gap-2 text-left px-4 py-2 text-red-600 hover:bg-red-100 bg-transparent shadow-none"
                    variant="ghost"
                    onClick={onLogout}
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-6 lg:ml-10 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 transition"
                role="button"
              >
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile menu, show/hide based on menu state */}
        {
          isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4 pb-4">
                <Link
                  to="/"
                  className="text-base font-medium text-gray-400 hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-base font-medium text-gray-400 hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/market"
                  className="text-base font-medium text-gray-400 hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Market
                </Link>
                <Link
                  to="/portfolio"
                  className="text-base font-medium text-gray-400 hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Portfolio
                </Link>
                <Link
                  to="/blog"
                  className="text-base font-medium text-gray-400 hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  to="/contact"
                  className="text-base font-medium text-gray-400 hover:text-white transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact & Support
                </Link>
              </div>

              {/* Mobile user menu */}
              {user ? (
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarFallback className="uppercase bg-white text-gray-900 font-bold">
                        {user.name ? user.name.charAt(0) : '?'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-3 text-base font-medium text-white">
                      {user.name}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col space-y-2">
                    <Button
                      className="w-full flex items-center gap-2 text-left px-4 py-2 text-gray-400 hover:text-white bg-transparent shadow-none"
                      variant="ghost"
                      onClick={() => {
                        navigate('/profile');
                        setIsMenuOpen(false);
                      }}
                    >
                      <UserIcon className="w-4 h-4" />
                      Profile
                    </Button>
                    <Button
                      className="w-full flex items-center gap-2 text-left px-4 py-2 text-red-400 hover:text-red-300 bg-transparent shadow-none"
                      variant="ghost"
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-700">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 transition"
                    role="button"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          )
        }
      </div >
    </header >
  );
}

export default Navbar;