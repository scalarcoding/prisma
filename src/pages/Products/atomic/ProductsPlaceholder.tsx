import { SkeletonCard } from "../../../components/ui/skeletons/SkeletonCard";

const ProductsPlaceholder = () => {
  return (
    <div className="products mt-4 lg:mt-10 grid grid-cols-2 md:grid-cols-4 gap-2">
      {Array.from({ length: 16 }).map((_, index) => (
        <div
          key={index} // Use index as key
          className="card bg-white ease-in-out transition p-4 border rounded-lg"
        >
          <div className="relative">
            <div className="inset-0 flex justify-center items-center">
              <SkeletonCard />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPlaceholder;
