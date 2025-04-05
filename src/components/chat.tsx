import { useState } from 'react';
import { User, SingleMessage } from '@/lib/types';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Porps = {
  user: User;
  handleMessageClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    message: string
  ) => void;
};
const Chat = ({ user, handleMessageClick }: Porps) => {
  const [message, setMessage] = useState('');

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="w-3xl h-2/3 flex flex-col gap-0 py-0 ">
        <CardHeader className="h-24 bg-gray-200 py-2">
          <div className="flex items-center">
            <Avatar className="p-5 bg-black">
              <AvatarFallback className="text-white font-medium">
                {user.name.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="px-4">
              <h2>{user.name}</h2>
              <p>Always Online</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 bg-blue-200 overflow-auto py-2">
          {user?.conversition &&
            user.conversition[user.id] &&
            user.conversition[user.id].map(
              (item: SingleMessage, index: number) => (
                <div
                  key={`${item.message}${index}`}
                  className="flex items-center"
                >
                  <div>
                    <Avatar className="p-5 bg-black">
                      <AvatarFallback className="text-white font-medium">
                        {item.name.slice(0, 1).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="px-4">
                    <div>{item.name}</div>
                    <div>{item.message}</div>
                  </div>
                </div>
              )
            )}
        </CardContent>
        <CardFooter className="h-24 py-2">
          <Input
            value={message}
            type="text"
            placeholder="Write Message And Press Enter"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            variant="outline"
            size="icon"
            className="ml-2"
            onClick={(e) => {
              setMessage('');
              handleMessageClick(e, message);
            }}
          >
            <ChevronRight />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Chat;
