"use client";

import { useExportSheet } from "@/hooks/use-export-sheet";

import { ExportForm } from "@/components/export-form";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export const ExportSheet = () => {
  const { isOpen, close } = useExportSheet();

  return (
    <Sheet open={isOpen} onOpenChange={close}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Export product</SheetTitle>
          <SheetDescription>
            Remove a product from Your warehouse. This action is irreversible,
            but You could always import it again later.
          </SheetDescription>
        </SheetHeader>
        <div className="w-full flex flex-col my-8 overflow-y-auto space-y-4">
          <ExportForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};
