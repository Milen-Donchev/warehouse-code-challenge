"use client";
import { Plus } from "lucide-react";
import { useQuery, gql } from "@apollo/client";

import { useNewProductSheet } from "@/hooks/use-new-product-sheet";

import { Wrapper } from "@/components/wrapper";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Product, productColumns } from "@/components/product-columns";

const query = gql`
  query MasterProductsQuery {
    masterProducts {
      id
      size
      title
      type
    }
  }
`;

export default function Home() {
  const { open } = useNewProductSheet();

  const { data, loading } = useQuery<{ masterProducts: Product[] }>(query);

  if (loading) return <div>Loading ...</div>;

  return (
    <Wrapper>
      <div className="w-full flex items-center justify-between my-4">
        <h2 className="text-xl font-semibold">All Products</h2>
        <Button onClick={open} variant="ghost">
          <Plus className="size-4 mr-2" />
          Add Product
        </Button>
      </div>
      <DataTable data={data?.masterProducts ?? []} columns={productColumns} />
    </Wrapper>
  );
}
