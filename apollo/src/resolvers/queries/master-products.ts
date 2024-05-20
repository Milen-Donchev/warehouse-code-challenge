import { db } from "../../../lib/db";

export default async () => {
  const products = await db.product.findMany();
  return products;
};
