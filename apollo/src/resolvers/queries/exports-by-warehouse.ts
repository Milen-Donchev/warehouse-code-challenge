import { db } from "../../../lib/db";

export default async (_, args: { id: number }) => {
  const exports = await db.export.findMany({
    where: {
      warehouseId: +args.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      timestamp: "asc",
    },
  });

  return exports;
};
