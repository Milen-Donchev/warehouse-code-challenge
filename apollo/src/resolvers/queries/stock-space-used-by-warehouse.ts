import { db } from "../../../lib/db";
import getStockSpaceUsed from "../../helpers/get-stock-space-used";

export default async (_, args: { id: number }) => {
  const imports = await db.import.findMany({
    where: {
      warehouseId: +args.id,
      AND: {
        isArchived: false,
      },
    },
    include: {
      product: true,
    },
  });

  if (imports && imports.length === 0) {
    return {
      sizeUsed: 0,
    };
  }

  const { sizeUsed, error } = await getStockSpaceUsed(imports);

  if (!!error) {
    throw new Error(error);
  }

  return {
    sizeUsed,
  };
};
