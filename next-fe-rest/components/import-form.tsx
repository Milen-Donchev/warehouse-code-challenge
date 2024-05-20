"use client";
import { toast } from "sonner";
import { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { BadgeCheck, BadgePlus } from "lucide-react";

import type { ProductType, Product } from "@/types";

import { useWarehouse } from "@/hooks/use-warehouse";
import { importMutation } from "@/graphql/mutations";
import {
  importsByWarehouseQuery,
  productsByTypeQuery,
  productsForExportQuery,
  stockSpaceUsedByWarehouseQuery,
} from "@/graphql/queries";
import { useImportSheet } from "@/hooks/use-import-sheet";

import { DatePicker } from "@/components/date-picker";

import { Button } from "@/components/ui/button";

type Props = {
  productType: ProductType;
};

export const ImportForm = ({ productType }: Props) => {
  const { close } = useImportSheet();
  const { id } = useWarehouse();

  const { data, loading } = useQuery(productsByTypeQuery, {
    variables: {
      productType,
    },
  });

  const [mutate, { loading: processing }] = useMutation(importMutation);

  const [selected, setSelected] = useState<number | null>(null);
  const [date, setDate] = useState<Date | null>(null);

  const products = data?.productsByType ?? [];

  const handleImport = async () => {
    if (!selected || !id) return;

    mutate({
      variables: {
        warehouseId: +id,
        productId: +selected,
        timestamp: date ? date.toISOString() : new Date().toISOString(),
      },
      refetchQueries: [
        {
          query: importsByWarehouseQuery,
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
    })
      .then(close)
      .catch((err: ApolloError) =>
        toast.error(err?.message ?? "Unexpected error")
      );
  };

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="space-y-6">
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="flex items-center gap-x-2 justify-between"
        >
          <div>
            <p className="line-clamp-1 text-sm">{product.title}</p>
            <span className="text-sm text-gray-400">Size - {product.size}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelected(product.id)}
          >
            {selected === product.id ? (
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
        disabled={!selected || !!processing}
        onClick={handleImport}
      >
        Import
      </Button>
    </div>
  );
};
