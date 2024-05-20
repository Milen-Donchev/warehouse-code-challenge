import { create } from "zustand";

import type { ProductType } from "@/types";

type ImportSheetState = {
  isOpen: boolean;
  productType: ProductType;
  open: (productType: ProductType) => void;
  close: () => void;
};

export const useImportSheet = create<ImportSheetState>((set) => ({
  isOpen: false,
  productType: "hazardous",
  open: (productType) => set({ isOpen: true, productType }),
  close: () => set({ isOpen: false, productType: "hazardous" }),
}));
