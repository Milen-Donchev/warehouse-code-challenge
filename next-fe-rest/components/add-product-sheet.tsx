"use client";
import { useNewProductSheet } from "@/hooks/use-new-product-sheet";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NewProductForm } from "@/components/new-product-form";

export const AddProductSheet = () => {
  const { isOpen, close } = useNewProductSheet();

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new product</SheetTitle>
          <SheetDescription>
            Create a new product, which You can then import or export from Your
            warehouses.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full flex flex-col my-8 overflow-y-auto space-y-4">
          <NewProductForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};
