// Products.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductsMenuBar from "./atomic/ProductsMenuBar";
import { ProductCategories } from "@/constants/categories/categories";
import { ProductPagination } from "./atomic/ProductPagination";
import { Button } from "@/components/ui/button";
import { TbLayoutGrid, TbList, TbSearch, TbSortAZ, TbSortZA } from "react-icons/tb";
import { supabase } from "@/api/repository/supabase";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { ProductType } from "./atomic/productype";
import ProductsLayout from "./atomic/ProductsLayout";
import ProductsList from "./atomic/ProducstList";
import ProductsPlaceholder from "./atomic/ProductsPlaceholder";
import { useAuth } from "@/hooks/use-auth";

const Products = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getProduct();
    console.log(user);
    
  }, []);

  const getProduct = async () => {
    const fetchedProducts = await fetchProducts();
    console.log(fetchedProducts);
    
    setProducts(fetchedProducts);
  };

  async function fetchProducts(): Promise<ProductType[]> {
  const { data, error } = await supabase.rpc("fetch_products");

  if (error) {
    console.error("Supabase RPC Error:", error);
    toast.error("Failed to fetch products.");
    return [];
  }

  return data as ProductType[];
}

  
  

  const sidebar = (
    <ul className="flex flex-col gap-4 p-4">
      <li className="hover:underline cursor-pointer font-bold">
        <Link to="/products" className={!id ? "text-blue-600 font-bold" : ""}>
          All
        </Link>
      </li>
      {ProductCategories.map((item) => {
        const isActive = item.href === `/products/${id}`;
        return (
          <li className="hover:underline cursor-pointer" key={item.label}>
            <Link to={item.href} className={isActive ? "text-blue-600 font-bold" : ""}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const header = (
    <div className="flex items-center justify-between">
      <div className="views hidden md:flex flex-row gap-2">
        <Button variant="ghost">
          <TbList />
        </Button>
        <Button variant="ghost">
          <TbLayoutGrid />
        </Button>
        <Button variant="ghost">
          <TbSortAZ />
        </Button>
        <Button variant="ghost">
          <TbSortZA />
        </Button>
        <div className="search__button hidden md:flex lg:hidden xl:hidden">
        <Button variant="ghost">
          <TbSearch />
        </Button>
        </div>
      </div>
      <div className="hidden lg:flex w-full items-center align-middle justify-center">
      <ProductsMenuBar/>
      </div>
      <ProductPagination />
    </div>
  );

  return (
    <ProductsLayout sidebar={sidebar} header={header}>
      <Toaster />
      {products.length > 0 ? <ProductsList products={products} /> : <ProductsPlaceholder/>}
    </ProductsLayout>
  );
};

export default Products;
