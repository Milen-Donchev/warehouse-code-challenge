"use client";
import { ColumnDef } from "@tanstack/react-table";

import type { Export } from "@/types";

export const exportsColumns: ColumnDef<Partial<Export>>[] = [
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
