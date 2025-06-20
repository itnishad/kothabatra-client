import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { useUsersStore } from '@/store/usersStore';
import { User } from '@/types';

export const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {userList,selectedUser, setSelectedUser} = useUsersStore()

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelecteUser = (user: User) =>{
    setSelectedUser(user)
  }

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
              className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                selectedUser?.id === user.id ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleSelecteUser(user)}
            >
              <div className="relative">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
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
                  {/* <p className="text-xs text-gray-500">{user.time}</p> */}
                  <p className="text-xs text-gray-500">{"10:30 AM"}</p>
                </div>
                {/* <p className="text-sm text-gray-500 truncate">
                  {user.lastMessage}
                </p> */}
              </div>
              {/* {user.unread > 0 && (
                <div className="bg-purple-600 text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {user.unread}
                </div>
              )} */}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
