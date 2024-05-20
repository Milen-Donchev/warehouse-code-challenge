import axios from "axios";
import { Import, Product } from "@prisma/client";

type ImportsWithProducts = (Import & {
  product: Product;
})[];

export default async (imports: ImportsWithProducts) => {
  // The BASE Url for the REST Api should obviously be in a .env file
  // But for the purpose of this code challenge, I am hardcoding it here.
  try {
    const response = await axios.post("http://localhost:3000/api/stock-space", {
      productSizes: imports.map((item) => item.product.size),
    });

    return {
      sizeUsed: response.data?.sizeUsed,
      error: null,
    };
  } catch {
    return {
      sizeUsed: null,
      error: "Failed to calculate used stock space",
    };
  }
};
