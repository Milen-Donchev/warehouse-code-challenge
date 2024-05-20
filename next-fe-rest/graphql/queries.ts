import { gql } from "@apollo/client";

export const warehousesQuery = gql`
  query WarehousesQuery {
    warehouses {
      id
      sizeLimit
      productType
    }
  }
`;

export const warehouseDataQuery = gql`
  query WarehouseDataQuery($id: ID) {
    warehouseData(id: $id) {
      productType
      exports {
        id
        product {
          id
          size
          title
          type
        }
        timestamp
      }
      id
      sizeLimit
      imports {
        warehouseId
        timestamp
        id
        product {
          type
          title
          size
          id
        }
      }
    }
  }
`;

export const importsByWarehouseQuery = gql`
  query ImportsByWarehouseQuery($id: ID) {
    importsByWarehouse(id: $id) {
      id
      warehouseId
      timestamp
      productId
      product {
        type
        title
        size
        id
      }
    }
  }
`;

export const exportsByWarehouseQuery = gql`
  query ExportsByWarehouseQuery($id: ID) {
    exportsByWarehouse(id: $id) {
      id
      warehouseId
      timestamp
      productId
      product {
        type
        title
        size
        id
      }
    }
  }
`;

export const stockSpaceUsedByWarehouseQuery = gql`
  query StockSpaceUsedByWarehouseQuery($id: ID) {
    stockSpaceUsedByWarehouse(id: $id) {
      sizeUsed
    }
  }
`;

export const productsByTypeQuery = gql`
  query ProductsByTypeQuery($productType: ProductType) {
    productsByType(productType: $productType) {
      id
      size
      title
    }
  }
`;

export const productsForExportQuery = gql`
  query ProductsForExportQuery($warehouseId: ID) {
    productsForExport(warehouseId: $warehouseId) {
      id
      warehouseId
      productId
      product {
        id
        title
        size
      }
    }
  }
`;
