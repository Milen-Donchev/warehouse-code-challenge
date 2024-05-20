import { create } from "zustand";

type NewProductSheetState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useNewProductSheet = create<NewProductSheetState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
