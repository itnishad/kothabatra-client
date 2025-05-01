import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { MessageCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <MessageCircle className="h-8 w-8 text-chat-purple" />
              <span className="font-bold text-xl">Kotha-Barta</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-chat-purple px-3 py-2 rounded-md font-medium"
            >
              Home
            </Link>
            <Link
              to="/#features"
              className="text-gray-600 hover:text-chat-purple px-3 py-2 rounded-md font-medium"
            >
              Features
            </Link>
            <Link
              to="/#pricing"
              className="text-gray-600 hover:text-chat-purple px-3 py-2 rounded-md font-medium"
            >
              Pricing
            </Link>
            <Link to="/login">
              <Button variant="outline" className="ml-4">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-chat-purple hover:bg-chat-indigo transition-colors">
                Sign Up
              </Button>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            {/* Mobile menu button would go here */}
            <Button variant="outline" className="mr-2">
              Login
            </Button>
            <Button className="bg-chat-purple hover:bg-chat-indigo transition-colors">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
