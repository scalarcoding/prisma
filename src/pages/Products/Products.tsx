// Products.tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductsMenuBar from "./atomic/ProductsMenuBar";
import { ProductCategories } from "@/constants/categories/categories";
import { ProductPagination } from "./atomic/ProductPagination";
import { Button } from "@/components/ui/button";
import { TbLayoutGrid, TbList, TbSearch, TbSortAZ, TbSortZA } from "react-icons/tb";
import { supabase } from "@/lib/SupabaseClient";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/toaster";
import { ProductType } from "./atomic/productype";
import ProductsLayout from "./atomic/ProductsLayout";
import ProductsList from "./atomic/ProducstList";
import ProductsPlaceholder from "./atomic/ProductsPlaceholder";

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const { id } = useParams();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const fetchedProducts = await fetchProducts();
    setProducts(fetchedProducts);
  };

  async function fetchProducts(): Promise<ProductType[]> {
    const { data, error } = await supabase
      .from("catalogue")
      .select(`
        reg_number,
        item_description,
        pn_preference!inner(part_number, img_url)
      `)
      .eq("pn_preference.preference", "01")
      .order("reg_number", { ascending: true }) 
      .limit(16);
  
    if (error) {
      toast.error("An error has occurred");
      return [];
    }
  
    // Map data while checking if `pn_preference` contains items
    return data.map((item) => ({
      reg_number: item.reg_number,
      item_description: item.item_description,
      part_number: item.pn_preference?.[0]?.part_number || '',
      img_url: item.pn_preference?.[0]?.img_url || '',
    }));
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
