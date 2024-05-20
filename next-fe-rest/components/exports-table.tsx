"use client";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";

import type { Export, Warehouse } from "@/types";

import { exportsByWarehouseQuery } from "@/graphql/queries";

import { DataTable } from "@/components/data-table";
import { exportsColumns } from "@/components/exports-columns";

type Props = {
  warehouse: Warehouse;
};

type Response = {
  exportsByWarehouse: Export[];
};

export const ExportsTable = ({ warehouse }: Props) => {
  const { data, loading } = useQuery<Response>(exportsByWarehouseQuery, {
    variables: {
      id: +warehouse.id,
    },
  });

  const tableData = data?.exportsByWarehouse.map((item) => ({
    timestamp: format(item.timestamp, "dd MMMM yyyy (h:mm a) , iiii "),
    title: item.product.title,
    size: item.product.size,
  }));

  if (loading) return <div>Loading ...</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Exports</h3>
      <DataTable
        columns={exportsColumns}
        data={tableData as Partial<Export>[]}
      />
    </div>
  );
};
