"use client";
import { useQuery } from "@apollo/client";
import { PackageMinus, PackagePlus } from "lucide-react";

import type { Warehouse } from "@/types";

import { useImportSheet } from "@/hooks/use-import-sheet";
import { useExportSheet } from "@/hooks/use-export-sheet";
import { stockSpaceUsedByWarehouseQuery } from "@/graphql/queries";

import { Button } from "@/components/ui/button";

type Props = {
  warehouse: Warehouse;
};

export const WarehouseDetails = ({ warehouse }: Props) => {
  const { open: openImportSheet } = useImportSheet();
  const { open: openExportSheet } = useExportSheet();

  const { data, loading } = useQuery(stockSpaceUsedByWarehouseQuery, {
    skip: !warehouse?.id,
    variables: {
      id: +warehouse?.id!,
    },
  });

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="space-y-4 mt-8">
      <h3 className="text-lg font-semibold">Stock</h3>
      <p className="text-gray-500">
        Used stock space ({data?.stockSpaceUsedByWarehouse?.sizeUsed} /{" "}
        {warehouse.sizeLimit})
      </p>
      <p className="text-gray-500">
        Free space remaining -&nbsp;
        <span className="text-rose-500">
          {warehouse.sizeLimit - data?.stockSpaceUsedByWarehouse?.sizeUsed}
        </span>
      </p>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <p className="text-base text-gray-500">
          Product type allowed for import/export -{" "}
          <span className="font-semibold text-emerald-500">
            {warehouse.productType?.replace("_", " ")?.toUpperCase()}
          </span>
        </p>
        <div className="flex items-center gap-x-2">
          <Button
            onClick={() => openImportSheet(warehouse.productType)}
            variant="outline"
          >
            <PackagePlus className="size-4 mr-2" />
            Import
          </Button>
          <Button onClick={openExportSheet} variant="outline">
            <PackageMinus className="size-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};
