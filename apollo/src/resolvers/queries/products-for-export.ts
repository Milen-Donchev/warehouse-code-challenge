import { db } from "../../../lib/db";

export default async (_, args: { warehouseId: number }) => {
  const imports = await db.import.findMany({
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
  return imports;
};
