import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:text-left">
            <h1>
              <span className="block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                <span className="gradient-heading">Connect and Chat</span>
                <br />
                <span className="mt-1 block">in Real-Time</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Experience seamless communication with your team, friends, and
              family. Send messages, share files, and collaborate effectively -
              all in one platform.
            </p>
            <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
              <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
                <Link to="/signup">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-chat-purple hover:bg-chat-indigo transition-colors"
                  >
                    Get Started for Free
                  </Button>
                </Link>
                <Link to="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative mt-12 sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0 lg:mt-0 lg:flex lg:max-w-none lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full overflow-hidden rounded-lg">
                <div className="aspect-[16/9] w-full bg-gray-100 p-8 flex items-center justify-center">
                  <div className="glass-card p-6 w-full max-w-sm mx-auto">
                    <div className="flex items-center mb-4">
                      <div className="h-10 w-10 rounded-full bg-chat-purple text-white flex items-center justify-center">
                        <Users size={20} />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          Team Chat
                        </p>
                        <p className="text-xs text-gray-500">
                          3 members online
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-xs">
                          JD
                        </div>
                        <div className="ml-2 bg-gray-100 rounded-2xl px-3 py-2 max-w-[80%]">
                          <p className="text-sm text-gray-800">
                            Hi team, I've just pushed the new update.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start justify-end">
                        <div className="mr-2 bg-chat-purple text-white rounded-2xl px-3 py-2 max-w-[80%]">
                          <p className="text-sm">
                            Great job! Let's review it together.
                          </p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-xs">
                          ME
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full rounded-full border-gray-300 bg-gray-100 py-2 pl-4 pr-10 focus:border-chat-purple focus:ring-chat-purple text-sm"
                          placeholder="Type your message..."
                          disabled
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <MessageCircle
                            size={18}
                            className="text-chat-purple"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
