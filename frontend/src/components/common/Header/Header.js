import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Menu, X, Youtube, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Episodios', href: '/episodes' },
    { name: 'Reels', href: '/reels' },
    { name: 'Noticias', href: '/news' },
    { name: 'Tienda', href: '/shop' },
    { name: 'Acerca de', href: '/about' },
  ];

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-cer-primary-800 to-cer-primary-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Tv className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">CER</h1>
              <p className="text-xs text-cer-secondary-200">Cuidando el Rancho</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="hover:text-green-200 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Auth + YouTube link + Mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Authentication Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-white hover:text-green-200 transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:block text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                  {user?.role === 'admin' && (
                    <Shield className="h-4 w-4 text-yellow-400" />
                  )}
                </button>
                
                {/* User dropdown menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user?.role}
                      </p>
                    </div>
                    
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Shield className="h-4 w-4 mr-2" />
                        Panel de Admin
                      </Link>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-white hover:text-green-200 transition-colors duration-200 text-sm font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* YouTube Channel Link */}
            <a
              href="https://www.youtube.com/@LaRoroNetworkOficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors duration-200"
              title="Ver en YouTube"
            >
              <Youtube className="h-4 w-4" />
              <span className="text-sm font-medium">YouTube</span>
            </a>

          {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-green-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-green-700">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-base font-medium hover:text-green-200 hover:bg-green-700 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* YouTube link in mobile menu */}
              <a
                href="https://www.youtube.com/@LaRoroNetworkOficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 py-2 text-base font-medium hover:text-green-200 hover:bg-green-700 rounded-md transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <Youtube className="h-5 w-5" />
                <span>Ver en YouTube</span>
              </a>
              
              {/* Mobile Auth Links */}
              {!isAuthenticated && (
                <div className="border-t border-green-700 pt-3">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium hover:text-green-200 hover:bg-green-700 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 text-base font-medium hover:text-green-200 hover:bg-green-700 rounded-md transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Registrarse
                  </Link>
                </div>
              )}
              
              {/* Mobile User Menu */}
              {isAuthenticated && (
                <div className="border-t border-green-700 pt-3">
                  <div className="px-3 py-2">
                    <p className="text-base font-medium text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-green-200">{user?.email}</p>
                  </div>
                  
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 px-3 py-2 text-base font-medium hover:text-green-200 hover:bg-green-700 rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="h-5 w-5" />
                      <span>Panel de Admin</span>
                    </Link>
                  )}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left px-3 py-2 text-base font-medium hover:text-green-200 hover:bg-green-700 rounded-md transition-colors duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
