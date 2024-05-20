import { z } from "zod";
import { NextResponse, NextRequest } from "next/server";

const schema = z.object({
  productSizes: z.number().array(),
});

export const POST = async (req: NextRequest) => {
  const requestBody: z.infer<typeof schema> = await req.json();

  const { success, data } = schema.safeParse(requestBody);

  if (!success) {
    throw new NextResponse("Invalid data", { status: 401 });
  }

  const sizeUsed = data.productSizes.reduce((acc, curVal) => {
    acc += curVal;
    return acc;
  }, 0);

  return NextResponse.json({ sizeUsed });
};
