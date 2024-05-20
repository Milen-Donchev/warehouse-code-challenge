"use client";
import { useState } from "react";
import { BadgeCheck, BadgePlus } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";

import type { Import } from "@/types";

import { exportMutation } from "@/graphql/mutations";
import {
  exportsByWarehouseQuery,
  productsForExportQuery,
  stockSpaceUsedByWarehouseQuery,
} from "@/graphql/queries";
import { useWarehouse } from "@/hooks/use-warehouse";
import { useExportSheet } from "@/hooks/use-export-sheet";

import { DatePicker } from "@/components/date-picker";

import { Button } from "@/components/ui/button";

export const ExportForm = () => {
  const { close } = useExportSheet();
  const { id } = useWarehouse();

  const { data, loading } = useQuery(productsForExportQuery, {
    skip: !id,
    variables: {
      warehouseId: +id!,
    },
  });

  const [mutate, { loading: processing }] = useMutation(exportMutation);

  const [selectedImport, setSelectedImport] = useState<Partial<Import> | null>(
    null
  );
  const [date, setDate] = useState<Date | null>(null);

  const importedProducts = data?.productsForExport ?? [];

  const handleExport = async () => {
    if (!selectedImport?.id || !id) return;

    await mutate({
      variables: {
        warehouseId: +id,
        productId: +selectedImport.product?.id!,
        importId: +selectedImport.id!,
        timestamp: date ? date.toISOString() : new Date().toISOString(),
      },
      refetchQueries: [
        {
          query: exportsByWarehouseQuery,
          variables: {
            id: +id,
          },
        },
        {
          query: stockSpaceUsedByWarehouseQuery,
          variables: {
            id: +id,
          },
        },
        {
          query: productsForExportQuery,
          variables: {
            warehouseId: +id,
          },
        },
      ],
    });
    close();
  };

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="space-y-6">
      {!!importedProducts &&
        importedProducts.map((item: Import) => (
          <div
            key={item.id}
            className="flex items-center gap-x-2 justify-between"
          >
            <div>
              <p className="line-clamp-1 text-sm">{item.product.title}</p>
              <span className="text-sm text-gray-400">
                Size - {item.product.size}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedImport(item)}
            >
              {selectedImport?.id === item.id ? (
                <BadgeCheck className="size-6 text-emerald-500" />
              ) : (
                <BadgePlus className="size-6 text-slate-600" />
              )}
            </Button>
          </div>
        ))}

      <div className="space-y-2">
        <p className="text-sm text-slate-400">
          (Optional): Pick a date in the future/past
        </p>
        <DatePicker date={date} setDate={setDate} />
      </div>

      <Button
        size="sm"
        className="w-full"
        disabled={!selectedImport || !!processing}
        onClick={handleExport}
      >
        Export
      </Button>
    </div>
  );
};
