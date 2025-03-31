import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Twitter, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Github, 
  Phone,
  ArrowRight 
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Truck className="h-6 w-6" />
              <h5 className="text-xl font-bold">ShopEase</h5>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Designed and built with all the love in the world by our team with the
              help of our contributors.
            </p>
            <p className="text-white/80 text-sm mt-4">
              Code licensed MIT, docs CC BY 3.0.
              <br />
              Currently v5.3.3.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xl font-bold mb-6">Quick Links</h5>
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-white/80 hover:text-white transition">
                Landing Page
              </Link>
              <Link to="/" className="text-white/80 hover:text-white transition">
                Home
              </Link>
              <Link to="/history" className="text-white/80 hover:text-white transition">
                Order History
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-xl font-bold mb-6">Resources</h5>
            <div className="flex flex-col space-y-3">
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition"
              >
                React
              </a>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition"
              >
                Tailwind CSS
              </a>
              <a
                href="https://reactrouter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition"
              >
                React Router
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-xl font-bold mb-6">Stay Updated</h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-4 py-2 bg-white text-blue-800 rounded-r-lg hover:bg-white/90 transition">
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6">
              <div className="flex space-x-4">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition">
                  <Github className="h-5 w-5" />
                </a>
                <a href="tel:+1234567890" className="text-white/80 hover:text-white transition">
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/80 text-sm">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;