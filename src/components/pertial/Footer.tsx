import { Link } from '@tanstack/react-router';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <MessageCircle className="h-8 w-8 text-chat-purple" />
              <span className="font-bold text-xl">Chatter</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Connect, collaborate, chat - all in one place.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    to="/#features"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#pricing"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Support
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    to="/#help"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#contact"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Legal
              </h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <Link
                    to="/#privacy"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#terms"
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-base text-gray-400">
            &copy; 2025 Chatter, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
