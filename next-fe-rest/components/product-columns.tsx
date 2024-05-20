"use client";
import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { gql, useMutation } from "@apollo/client";
import { MoreHorizontal, Trash } from "lucide-react";

import type { Product } from "@/types";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const productSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is a required field").max(99),
  size: z.number().min(1).max(99),
  type: z.enum(["hazardous", "non_hazardous"]).default("hazardous"),
});

const newProductMutation = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const [deleteProduct, { loading: processing }] = useMutation(
        newProductMutation,
        {
          refetchQueries: ["MasterProductsQuery"],
        }
      );

      const onDelete = () =>
        deleteProduct({
          variables: {
            id: +product.id,
          },
        });

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={processing} onClick={onDelete}>
              <Trash className="size-4 mr-2 text-rose-500" />
              Delete product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
