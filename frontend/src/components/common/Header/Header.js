import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Menu, X, Youtube } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Episodios', href: '/episodes' },
    { name: 'Reels', href: '/reels' },
    { name: 'Noticias', href: '/news' },
    { name: 'Tienda', href: '/shop' },
    { name: 'Acerca de', href: '/about' },
  ];

  return (
    <header className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Tv className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">CER</h1>
              <p className="text-xs text-green-200">Cuidando el Rancho</p>
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

          {/* Right side - YouTube link + Mobile menu */}
          <div className="flex items-center space-x-4">
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
