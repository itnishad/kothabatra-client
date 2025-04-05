import { create } from 'zustand';
import { User } from '@/lib/types';

type UserStore = {
  users: User[];
  addUser: (user: User[]) => void;
  addMessage: (message: string, sender: Sender, user: Sender) => void;
  removeUser: (id: string) => void;
  clearUsers: () => void;
};

type Sender = {
  id: string;
  name: string;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],

  addUser: (users) =>
    set(() => ({
      users: users,
    })),

  addMessage: (message: string, sender: Sender, userr: Sender) =>
    set((state) => {
      const currentUsers = [...state.users];
      for (const user of currentUsers) {
        if (user.id === userr.id) {
          if (user.conversition[userr.id]) {
            user.conversition[userr.id].push({
              id: sender.id,
              name: sender.name,
              message: message,
            });
          } else {
            user.conversition[userr.id] = [
              {
                id: sender.id,
                name: sender.name,
                message: message,
              },
            ];
          }
        }
      }
      return { users: currentUsers };
    }),

  removeUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),

  clearUsers: () => set({ users: [] }),
}));
