import { create } from "zustand";

type TSidebarMobile = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useMobileSidebar = create<TSidebarMobile>((set) => {
  return {
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  };
});
