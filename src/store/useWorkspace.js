import { create } from "zustand";

const useWorkspace = create((set) => ({
  workspace: {},
  setWorkspace: (content) => set(() => ({ workspace: content })),
  removeWorkspace: () => set({ workspace: {} }),
}));

export default useWorkspace;
