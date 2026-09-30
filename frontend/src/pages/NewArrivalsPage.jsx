import React from "react";
import ProductCatalog from "../components/products/ProductCatalog";

const NewArrivalsPage = () => {
  return (
    <ProductCatalog
      pageTitle="New Arrivals & Latest Season"
      breadcrumbTitle="New Arrivals"
      badgeText="NEW"
      filterPredicate={(p) => p.isNew === true}
    />
  );
};

export default NewArrivalsPage;
