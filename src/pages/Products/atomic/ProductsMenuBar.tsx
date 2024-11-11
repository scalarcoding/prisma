// ProductsMenuBar.tsx
import { Button } from "@/components/ui/button";
import React from "react";
import { TbSearch } from "react-icons/tb";

const ProductsMenuBar = () => {
  const handleSearchProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="h-16 w-full flex justify-center px-4">
      <div className="search__container flex w-full items-center justify-center">
        <form
          onSubmit={handleSearchProduct}
          className="flex w-full items-center px-2"
        >
          <input
            type="text"
            placeholder="Search by keyword..."
            className="rounded-md p-2 w-full border border-slate-400 focus:outline-none focus:border-blue-500 transition-colors duration-200"
          />
          <Button type="submit" className="ml-2">
            <TbSearch />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProductsMenuBar;
