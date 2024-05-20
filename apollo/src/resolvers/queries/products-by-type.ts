import { db } from "../../../lib/db";

export default async (
  _,
  args: { productType: "hazardous" | "non_hazardous" }
) => {
  const products = await db.product.findMany({
    where: {
      type: args.productType,
    },
  });
  return products;
};
