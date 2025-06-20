// store/customerStore.ts
import { create } from 'zustand';
import { User } from '@/types';


type UserStore = {
  customers: User[];
  addUser: (customer: User) => void;
  updateUser: (id: string, updated: Partial<User>) => void;
  deleteUser: (id: string) => void;
  setUsers: (customers: User[]) => void;
};

export const useCustomerStore = create<UserStore>((set) => ({
  customers: [],

  setUsers: (customers) => set({ customers }),

  addUser: (customer) =>
    set((state) => ({
      customers: [...state.customers, customer],
    })),

  updateUser: (id, updated) =>
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id ? { ...customer, ...updated } : customer
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    })),
}));
