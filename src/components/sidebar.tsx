import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { User } from '@/lib/types';

type Props = {
  users: User[];
  handleClick: (item: User) => void;
};

const Sidebar = ({ users, handleClick }: Props) => {
  return (
    <div className="p-2">
      {users.map((item) => (
        <Card
          key={item.id}
          className="p-2 my-2"
          onClick={() => handleClick(item)}
        >
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>
                {item.name.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p>{item.name.toUpperCase()}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Sidebar;
