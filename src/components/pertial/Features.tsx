import { MessageCircle, Users, Mail, Home } from 'lucide-react';

const features = [
  {
    name: 'Real-time Messaging',
    description:
      'Send and receive messages instantly. See when others are typing and when messages are delivered.',
    icon: MessageCircle,
  },
  {
    name: 'Group Chats',
    description:
      'Create channels for teams, projects, or topics. Add relevant members and collaborate together.',
    icon: Users,
  },
  {
    name: 'Direct Messages',
    description:
      'Have private conversations with any team member through secure direct messaging.',
    icon: Mail,
  },
  {
    name: 'File Sharing',
    description:
      'Share documents, images, and files effortlessly with drag-and-drop functionality.',
    icon: Home, // Using Home as a placeholder for file sharing
  },
];

const Features = () => {
  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-chat-purple">
            Communicate better
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for seamless team collaboration
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Designed for teams of all sizes, Chatter provides all the tools you
            need for effective communication and collaboration.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-chat-purple text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
