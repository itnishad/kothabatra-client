import { create } from 'zustand';
type CountStore = {
  count: number;
};
export const useCounterStore = create<CountStore>(() => ({
  count: 0,
}));
