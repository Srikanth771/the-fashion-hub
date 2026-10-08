import React from "react";
import { useParams } from "react-router-dom";
import ProductCatalog from "../components/products/ProductCatalog";

const CategoryProductsPage = () => {
  const { categoryName } = useParams();

  const formattedName = categoryName
    ? decodeURIComponent(categoryName)
    : "";

  const target = formattedName.toLowerCase();

  return (
    <ProductCatalog
      pageTitle={
        formattedName
          ? `Men's ${formattedName}`
          : "Men's Fashion"
      }
      breadcrumbTitle={
        formattedName || "Men's Fashion"
      }
      badgeText={
        formattedName || "Fashion"
      }
      filterPredicate={(p) => {
        if (!target) return true;

        const cat = (p.category || "").toLowerCase();
        const subCat = (p.subCategory || "").toLowerCase();
        const name = (p.name || "").toLowerCase();

        return (
          (cat && cat.includes(target)) ||
          (subCat && subCat.includes(target)) ||
          (name && name.includes(target)) ||
          (cat && target.includes(cat)) ||
          (subCat && target.includes(subCat))
        );
      }}
    />
  );
};

export default CategoryProductsPage;