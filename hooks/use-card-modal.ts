import { create } from "zustand";

type TCardModal = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

export const useCardModal = create<TCardModal>((set) => {
  return {
    isOpen: false,
    id: undefined,
    onClose: () => set({ isOpen: false, id: undefined }),
    onOpen: (id) => set({ isOpen: true, id }),
  };
});
