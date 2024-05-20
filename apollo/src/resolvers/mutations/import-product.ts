import { db } from "../../../lib/db";
import getStockSpaceUsed from "../../helpers/get-stock-space-used";

export default async (
  _,
  args: { warehouseId: number; productId: number; timestamp: string }
) => {
  const warehouse = await db.warehouse.findUnique({
    where: {
      id: +args.warehouseId,
    },
    select: {
      productType: true,
      sizeLimit: true,
    },
  });

  const product = await db.product.findUnique({
    where: {
      id: +args.productId,
    },
    select: {
      size: true,
      type: true,
    },
  });

  if (product?.type !== warehouse?.productType) {
    throw new Error("Product cannot be imported in this warehouse");
  }

  const unarchivedImports = await db.import.findMany({
    where: {
      warehouseId: +args.warehouseId,
      AND: {
        isArchived: false,
      },
    },
    include: {
      product: true,
    },
  });

  const { sizeUsed, error } = await getStockSpaceUsed(unarchivedImports);

  if (!!error) {
    throw new Error(error);
  }

  if (product.size + sizeUsed > warehouse.sizeLimit) {
    throw new Error("Warehouse space limit reached");
  }

  const newImport = await db.import.create({
    data: {
      productId: +args.productId,
      warehouseId: +args.warehouseId,
      timestamp: args.timestamp,
    },
  });

  return newImport;
};
