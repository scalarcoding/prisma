// ProductsList.tsx
import React from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "./productype";

interface ProductsListProps {
  products: ProductType[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  return (
    <div className="products mt-4 lg:mt-10 grid grid-cols-2 md:grid-cols-4 gap-2">
      {products.map((item) => (
        <ProductCard
          key={item.reg_number}
          img_url={item.img_url}
          reg_number={item.reg_number}
          part_number={item.part_number}
          item_description={item.item_description}
        />
      ))}
    </div>
  );
};

export default ProductsList;
