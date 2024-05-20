"use client";

import { useImportSheet } from "@/hooks/use-import-sheet";

import { ImportForm } from "@/components/import-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const ImportSheet = () => {
  const { isOpen, close, productType } = useImportSheet();

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Import product</SheetTitle>
          <SheetDescription>
            Add a product to Your warehouse. Keep in mind that only products of
            the same type can be stored together.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full flex flex-col my-8 overflow-y-auto space-y-4">
          <ImportForm productType={productType} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
