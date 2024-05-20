export const typeDefs = `#graphql

  "It's important that products of different type are not stored together!"
  enum ProductType {
    hazardous
    non_hazardous
  }

  type Warehouse {
    id: ID!
    
    "Max allowed size per warehouse (based on size per unit of products)"
    sizeLimit: Int

    "Only used as a return value (not part of the actual DB schema)"
    sizeUsed: Int
    
    productType: ProductType

    products: [Product]
    imports: [Import]
    exports: [Export]
  }

  type Product {
    id: ID!
    title: String!
    type: ProductType!
    "Size per limit (Used for calculating available size in warehouses)"
    size: Int 
  }

  type Import {
    id: ID!
    product: Product
    productId: Int
    isArchived: Boolean
    
    warehouse: Warehouse
    warehouseId: Int
    
    "Timestamp in ISO string format"
    timestamp: String 
  }

  type Export {
    id: ID!
    product: Product
    productId: Int
    
    warehouse: Warehouse
    warehouseId: Int
    
    "Timestamp in ISO string format"
    timestamp: String 
  }

  type Query {
    "Used in screen 2 (currently hardcoded - seeded)"
    warehouses: [Warehouse]

    "Used in screen 1 in data table"
    masterProducts: [Product]

    "Used in import drawer in screen 2"
    productsByType(productType: ProductType): [Product]

    "Used in export drawer in screen 2"
    productsForExport(warehouseId: ID): [Import]

    "Used to display available space in warehouse in screen 2"
    stockSpaceUsedByWarehouse(id: ID): Warehouse

    "Used in screen 2 in the imports data table"
    importsByWarehouse(id: ID): [Import]

    "Used in screen 2 in the exports data table"
    exportsByWarehouse(id: ID): [Export]
  }

  type Mutation {
    addProduct(title: String, size: Int, type: ProductType): Product

    "Bonus: Not part of the assignment, but is something I used during development and decided to leave in"
    deleteProduct(id: ID): Product

    importProduct(warehouseId: ID, productId: ID, timestamp: String): Import

    exportProduct(warehouseId: ID, productId: ID, importId: ID, timestamp: String): Export
  }
`;
