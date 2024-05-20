"use client";
import { ColumnDef } from "@tanstack/react-table";

import type { Import } from "@/types";

export const importsColumns: ColumnDef<Partial<Import>>[] = [
  {
    accessorKey: "timestamp",
    header: "Date performed",
  },
  {
    accessorKey: "title",
    header: "Product",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
];
