import { db } from "../../../lib/db";

export default async (
  _,
  args: { title: string; size: number; type: "hazardous" | "non_hazardous" }
) => {
  if (!args.title || !args.size || !args.type) {
    throw new Error("Invalid data");
  }

  const newProduct = await db.product.create({
    data: {
      title: args.title,
      size: args.size,
      type: args.type,
    },
  });

  return newProduct;
};
