import { db } from "../../../lib/db";

export default async (
  _,
  args: {
    warehouseId: number;
    productId: number;
    importId: number;
    timestamp: string;
  }
) => {
  if (!args.warehouseId || !args.productId || !args.importId) {
    throw new Error("Invalid data");
  }

  const newExport = await db.export.create({
    data: {
      productId: +args.productId,
      warehouseId: +args.warehouseId,
      timestamp: args.timestamp,
    },
  });

  await db.import.update({
    where: {
      id: +args.importId,
      AND: {
        isArchived: false,
      },
    },
    data: {
      isArchived: true,
    },
  });

  return newExport;
};
