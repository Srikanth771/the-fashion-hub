import React from "react";
import ProductCatalog from "../components/products/ProductCatalog";

const AllProductsPage = () => {
  return (
    <ProductCatalog
      pageTitle="All Men's Wear Products"
      breadcrumbTitle="All Products"
      badgeText="Men's Fashion"
      filterPredicate={() => true}
    />
  );
};

export default AllProductsPage;
