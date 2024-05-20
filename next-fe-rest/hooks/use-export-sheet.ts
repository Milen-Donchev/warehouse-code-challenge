import { create } from "zustand";

type ExportSheetState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useExportSheet = create<ExportSheetState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
