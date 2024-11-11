// ProductsLayout.tsx
import React, { ReactNode } from "react";

interface ProductsLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

const ProductsLayout: React.FC<ProductsLayoutProps> = ({ sidebar, header, children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Fixed */}
      <div className="w-1/6  bg-white overflow-y-auto fixed h-full hidden md:flex pt-20">  {/* Add shadow to the left from right border*/}
        {sidebar}
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col w-full md:w-5/6 ml-auto">
        {/* Header - Fixed */}
        <div className="bg-white border-b fixed w-full md:w-5/6 mt-2 md:mt-0 z-10 px-4 py-2">
          {header}
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow mt-16 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProductsLayout;
