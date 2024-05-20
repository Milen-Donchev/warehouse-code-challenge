import { create } from "zustand";

import type { Warehouse } from "@/types";

type WarehouseState = Partial<Warehouse> & {
  setWarehouse: (warehouse: Warehouse) => void;
};

export const useWarehouse = create<WarehouseState>((set) => ({
  setWarehouse: (warehouse) => set(warehouse),
}));
