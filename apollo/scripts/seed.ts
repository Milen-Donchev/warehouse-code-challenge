import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  console.log("🌱 Seeding database ---------");

  await prisma.warehouse.createMany({
    data: [
      {
        id: 1,
        sizeLimit: 20,
        productType: "hazardous",
      },
      {
        id: 2,
        sizeLimit: 25,
        productType: "non_hazardous",
      },
    ],
  });

  console.log("✅ Seeding finished --------");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
