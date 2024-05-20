import { db } from "../../../lib/db";

export default async (_, args: { id: number }) => {
  const imports = await db.import.findMany({
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

  return imports;
};
