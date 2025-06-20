// store/customerStore.ts
import { create } from 'zustand';
import { User } from '@/types';


type UserStore = {
  userList: User[];
  selectedUser: User | null;
  addUser: (customer: User) => void;
  updateUser: (id: string, updated: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setUsers: (customers: User[]) => void;
  setSelectedUser: (user: User) => void
};

export const useUsersStore = create<UserStore>((set) => ({
  userList: [],
  selectedUser: null,
  setUsers: (customers) => set({ userList: customers }),

  addUser: (customer) =>
    set((state) => ({
      userList: [...state.userList, customer],
    })),

  updateUser: (id, updated) =>
    set((state) => ({
      userList: state.userList.map((customer) =>
        customer.id === id ? { ...customer, ...updated } : customer
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      userList: state.userList.filter((customer) => customer.id !== id),
    })),
    
    setSelectedUser: (user: User) => set(() => ({
      selectedUser: user,
    })),
}));
