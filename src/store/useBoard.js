import { create } from "zustand";

const useBoard = create((set) => ({
  board: {},
  setBoard: (content) => set(() => ({ board: content })),
  removeBoard: () => set({ board: {} }),
}));

export default useBoard;
