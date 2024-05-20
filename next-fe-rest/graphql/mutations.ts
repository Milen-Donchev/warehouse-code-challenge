import { gql } from "@apollo/client";

export const importMutation = gql`
  mutation ImportProduct($warehouseId: ID, $productId: ID, $timestamp: String) {
    importProduct(
      warehouseId: $warehouseId
      productId: $productId
      timestamp: $timestamp
    ) {
      warehouseId
      productId
      timestamp
    }
  }
`;

export const exportMutation = gql`
  mutation ExportProduct(
    $warehouseId: ID
    $productId: ID
    $importId: ID
    $timestamp: String
  ) {
    exportProduct(
      warehouseId: $warehouseId
      productId: $productId
      importId: $importId
      timestamp: $timestamp
    ) {
      id
    }
  }
`;
