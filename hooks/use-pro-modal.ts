import { create } from "zustand";

type TCardModal = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProModal = create<TCardModal>((set) => {
  return {
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  };
});
