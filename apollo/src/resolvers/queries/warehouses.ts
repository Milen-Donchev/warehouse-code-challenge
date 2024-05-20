import { db } from "../../../lib/db";

export default async () => {
  const warehouses = await db.warehouse.findMany();
  return warehouses;
};
