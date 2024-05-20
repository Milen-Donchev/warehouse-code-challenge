export type ProductType = "hazardous" | "non_hazardous";

export type Warehouse = {
  id: number;
  sizeLimit: number;
  productType: ProductType;
};

export type Product = {
  id: number;
  title: string;
  size: number;
  type: ProductType;
  createdAt: Date;
  updatedAt: Date;
  warehouseId?: number;
  warehouse?: Warehouse;
};

export type Import = {
  id: number;
  warehouseId: number;
  warehouse: Warehouse;
  productId: number;
  product: Product;
  timestamp: string;
  isArchived: boolean;
};

export type Export = {
  id: number;
  warehouseId: number;
  warehouse: Warehouse;
  productId: number;
  product: Product;
  timestamp: string;
};
