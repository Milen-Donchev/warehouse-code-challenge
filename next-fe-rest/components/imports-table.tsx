"use client";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";

import type { Import, Warehouse } from "@/types";

import { importsByWarehouseQuery } from "@/graphql/queries";

import { DataTable } from "@/components/data-table";
import { importsColumns } from "@/components/imports-columns";

type Props = {
  warehouse: Warehouse;
};

type Response = {
  importsByWarehouse: Import[];
};

export const ImportsTable = ({ warehouse }: Props) => {
  const { data, loading } = useQuery<Response>(importsByWarehouseQuery, {
    variables: {
      id: +warehouse.id,
    },
  });

  const tableData = data?.importsByWarehouse.map((imp) => ({
    timestamp: format(imp.timestamp, "dd MMMM yyyy (h:mm a) , iiii "),
    title: imp.product.title,
    size: imp.product.size,
  }));

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Imports</h3>
      <DataTable
        columns={importsColumns}
        data={tableData as Partial<Import>[]}
      />
    </div>
  );
};
