import { create } from "zustand";

const useWorkspaces = create((set) => ({
    workspaces: [],
    setWorkspaces: (content) => set({ workspaces: content }),

}));

export default useWorkspaces;
