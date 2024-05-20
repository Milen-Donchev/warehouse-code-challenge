"use client";
import { useQuery } from "@apollo/client";
import { WarehouseIcon } from "lucide-react";

import type { Warehouse } from "@/types";

import { cn } from "@/lib/utils";
import { warehousesQuery } from "@/graphql/queries";
import { useWarehouse } from "@/hooks/use-warehouse";

import { Wrapper } from "@/components/wrapper";
import { ImportsTable } from "@/components/imports-table";
import { ExportsTable } from "@/components/exports-table";
import { WarehouseDetails } from "@/components/warehouse-details";

import { Button } from "@/components/ui/button";

const WarehousesPage = () => {
  const { setWarehouse, ...currentWarehouse } = useWarehouse();

  const { data, loading } = useQuery<{ warehouses: Warehouse[] }>(
    warehousesQuery
  );

  // TODO: Add skeletons for cleaner UI while fetching data.
  if (loading) return <div>Loading ...</div>;

  return (
    <div className="space-y-6">
      <Wrapper>
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-semibold">My Warehouses</h2>
        </div>
        <div className="flex items-center gap-x-4 my-4">
          {data?.warehouses?.map((warehouse) => (
            <Button
              onClick={() => setWarehouse(warehouse)}
              key={warehouse.id}
              variant={
                currentWarehouse?.id === warehouse.id ? "default" : "outline"
              }
              className={cn(
                warehouse.id === currentWarehouse?.id &&
                  "bg-emerald-500 hover:bg-emerald-600"
              )}
            >
              <WarehouseIcon className="size-5 mr-2" />
              Warehouse {warehouse.id}
            </Button>
          ))}
        </div>

        {!!currentWarehouse?.id && (
          <WarehouseDetails warehouse={currentWarehouse as Warehouse} />
        )}
      </Wrapper>

      {!!currentWarehouse?.id && (
        <Wrapper>
          <ImportsTable warehouse={currentWarehouse as Warehouse} />
        </Wrapper>
      )}
      {!!currentWarehouse?.id && (
        <Wrapper>
          <ExportsTable warehouse={currentWarehouse as Warehouse} />
        </Wrapper>
      )}
    </div>
  );
};

export default WarehousesPage;
