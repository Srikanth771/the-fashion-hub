import React from "react";
import ProductCatalog from "../components/products/ProductCatalog";

const TrendingPage = () => {
  return (
    <ProductCatalog
      pageTitle="Trending Products"
      breadcrumbTitle="Trending Products"
      badgeText="Trending"
      filterPredicate={(p) => p.isTrending === true}
    />
  );
};

export default TrendingPage;
