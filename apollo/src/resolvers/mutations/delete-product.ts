import { db } from "../../../lib/db";

export default async (_, args: { id: number }) => {
  if (!args.id) {
    throw new Error("Id is required");
  }

  const deletedProduct = await db.product.delete({
    where: {
      id: +args.id,
    },
  });

  return deletedProduct;
};
