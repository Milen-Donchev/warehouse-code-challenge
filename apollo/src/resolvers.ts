// Query resolvers
import warehouses from "./resolvers/queries/warehouses";
import masterProducts from "./resolvers/queries/master-products";
import importsByWarehouse from "./resolvers/queries/imports-by-warehouse";
import exportsByWarehouse from "./resolvers/queries/exports-by-warehouse";
import stockSpaceUsedByWarehouse from "./resolvers/queries/stock-space-used-by-warehouse";
import productsByType from "./resolvers/queries/products-by-type";
import productsForExport from "./resolvers/queries/products-for-export";

// Mutation Resolves
import addProduct from "./resolvers/mutations/add-product";
import deleteProduct from "./resolvers/mutations/delete-product";
import importProduct from "./resolvers/mutations/import-product";
import exportProduct from "./resolvers/mutations/export-product";

export const resolvers = {
  Query: {
    warehouses,
    masterProducts,
    importsByWarehouse,
    exportsByWarehouse,
    stockSpaceUsedByWarehouse,
    productsByType,
    productsForExport,
  },
  Mutation: {
    addProduct,
    deleteProduct,
    importProduct,
    exportProduct,
  },
};
