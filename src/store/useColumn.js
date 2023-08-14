import { create } from "zustand";

const useColumn = create((set) => ({
  column: {},
  setColumn: (content) => set(() => ({ column: content })),
  removeColumn: () => set({ column: {} }),
}));

export default useColumn;
