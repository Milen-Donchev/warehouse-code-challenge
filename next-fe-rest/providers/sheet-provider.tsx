"use client";
import { useState, useEffect } from "react";

import { ImportSheet } from "@/components/import-sheet";
import { ExportSheet } from "@/components/export-sheet";
import { AddProductSheet } from "@/components/add-product-sheet";

export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Fix for hydration errors

  return (
    <>
      <AddProductSheet />
      <ImportSheet />
      <ExportSheet />
      {/* ... All other sheets/modals can go here */}
    </>
  );
};
