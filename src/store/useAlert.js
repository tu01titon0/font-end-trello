import { create } from "zustand";

const useAlert = create((set) => ({
  message: "",
  openAlert: false,
  setMessage: (content) => set(() => ({ message: content })),
  removeMessage: () => set({ message: "" }),
  setOpenAlert: (content) => set(() => ({ open: content })),
}));

export default useAlert;
