import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cer-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Tv className="h-8 w-8" />
              <div>
                <h2 className="text-xl font-bold">CER</h2>
                <p className="text-sm text-cer-green-200">Cuidando el Rancho</p>
              </div>
            </Link>
            <p className="text-cer-green-200 mb-4 max-w-md">
              El programa de televisión favorito de la familia, transmitido por la red RORO. 
              Únete a nuestra comunidad y disfruta de contenido exclusivo.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cer-green-200 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-cer-green-200 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-cer-green-200 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/episodes" className="text-cer-green-200 hover:text-white transition-colors">
                  Episodios
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-cer-green-200 hover:text-white transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-cer-green-200 hover:text-white transition-colors">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-cer-green-200 hover:text-white transition-colors">
                  Acerca de
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-cer-green-200">
                <Mail className="h-4 w-4" />
                <span>info@cer-show.com</span>
              </li>
              <li className="flex items-center space-x-2 text-cer-green-200">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-cer-green-200">
                <MapPin className="h-4 w-4" />
                <span>Red RORO, Studio A</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cer-green-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cer-green-200 text-sm">
            © 2025 CER - Cuidando el Rancho. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-cer-green-200 hover:text-white text-sm transition-colors">
              Privacidad
            </Link>
            <Link to="/terms" className="text-cer-green-200 hover:text-white text-sm transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
