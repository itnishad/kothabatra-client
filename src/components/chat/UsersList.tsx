import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';

type User = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
};

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
    lastMessage: 'Hey, how are you doing?',
    time: '10:30 AM',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
    lastMessage: 'Can we meet tomorrow?',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson&background=random',
    lastMessage: 'The project is due next week.',
    time: 'Yesterday',
    unread: 3,
    online: true,
  },
  {
    id: '4',
    name: 'Sarah Williams',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=random',
    lastMessage: 'Thanks for your help!',
    time: 'Monday',
    unread: 0,
    online: false,
  },
  {
    id: '5',
    name: 'David Brown',
    avatar: 'https://ui-avatars.com/api/?name=David+Brown&background=random',
    lastMessage: 'Let me check and get back to you.',
    time: 'Monday',
    unread: 0,
    online: true,
  },
];

export const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-100">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              className={`w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors ${
                selectedUserId === user.id ? 'bg-gray-100' : ''
              }`}
              onClick={() => setSelectedUserId(user.id)}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {user.online && (
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.time}</p>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {user.lastMessage}
                </p>
              </div>
              {user.unread > 0 && (
                <div className="bg-purple-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {user.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
