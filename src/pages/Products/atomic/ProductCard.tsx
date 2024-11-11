import React, { useState } from "react";
import { SkeletonCard } from "../../../components/ui/skeletons/SkeletonCard";
import { Link, useNavigate } from "react-router-dom";
import FallBackImage from "/assets/img/fallback_image.png";
import { ProductType } from "./productype";
import { Button } from "@/components/ui/button";
import { TbEdit, TbShoppingBagPlus, TbStar } from "react-icons/tb";

const ProductCard: React.FC<ProductType> = ({
  reg_number,
  part_number,
  item_description,
  img_url,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };  

  useState(() => {
      setIsLoading(false);
  });


  const handleMaintenanceCatalogue = () =>{
    navigate(`/products/maintenance/${reg_number}`)
  }

  return (
    <div>
      <div
        key={reg_number}
        className="card bg-white hover:bg-stone-200 ease-in-out transition p-4 border rounded-lg"
      >
        <div className="relative">
          {isLoading ? (
            <div className="inset-0 flex justify-center items-center">
              <SkeletonCard />
            </div>
          ) : (
            <div>
              <Link to={`/product/detail/${reg_number}`}>
                <img
                  src={img_url === null ? FallBackImage : img_url}
                  alt="img"
                  onLoad={handleImageLoad}
                  className={`w-full h-40 object-cover ${
                    isLoading ? "hidden" : "block object-scale-down border rounded-lg border-gray-100"
                  }`}
                />
              </Link>
              <Link to={`/product/detail/${reg_number}`}>
              <h3 className="mt-4 text-lg font-semibold text-blue-600 hover:underline cursor-pointer">{reg_number}</h3>
              </Link>
              <h3 className="text-lg ">{part_number}</h3>
              <p
                className="text-sm text-slate-400 font-bold overflow-hidden text-ellipsis whitespace-nowrap"
                onMouseEnter={() => setIsHovered(true)} // Set hover to true on mouse enter
                onMouseLeave={() => setIsHovered(false)} // Set hover to false on mouse leave
              >
                {item_description}
              </p>
              {/* Popup for full text */}
              {isHovered && (
                <div className=" absolute bg-white bg-opacity-10 backdrop-blur-md p-4 border rounded-lg shadow-lg max-w-xs w-auto z-10 mt-2 text-sm text-slate-500">
                  {item_description}
                </div>
              )}
              <div className="action__bars mt-4">
                <Button variant="ghost">
                  <TbShoppingBagPlus/>
                </Button>
                <Button variant="ghost">
                  <TbStar/>
                </Button>
                <Button variant="ghost" onClick={handleMaintenanceCatalogue}>
                  <TbEdit/>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
