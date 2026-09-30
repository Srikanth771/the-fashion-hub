import React from "react";
import { useParams } from "react-router-dom";
import ProductCatalog from "../components/products/ProductCatalog";

const CategoryProductsPage = () => {
  const { categoryName } = useParams();

  const formattedName = categoryName
    ? decodeURIComponent(categoryName)
    : "Men's Fashion";

  return (
    <ProductCatalog
      pageTitle={`Men's ${formattedName}`}
      breadcrumbTitle={formattedName}
      badgeText={formattedName}
      filterPredicate={(p) => {
        if (!formattedName) return true;
        const target = formattedName.toLowerCase();
        const cat = (p.category || "").toLowerCase();
        const subCat = (p.subCategory || "").toLowerCase();
        const name = (p.name || "").toLowerCase();

        return (
          cat.includes(target) ||
          subCat.includes(target) ||
          name.includes(target) ||
          target.includes(cat) ||
          target.includes(subCat)
        );
      }}
    />
  );
};

export default CategoryProductsPage;
