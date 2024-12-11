import { useGetProductByCategoryMutation } from "@/app/feature/product/productApi";
import CardLoading from "@/components/common/CardLoading";
import ProductCard from "@/components/common/ProductCard";
import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([]);
  const containerRef = useRef()

  const [getProductByCategory, { isLoading }] =
    useGetProductByCategoryMutation();

  const fetchCategoryWiseProduct = async () => {
    try {
      const { data } = await getProductByCategory({ id }).unwrap();
      setData(data);
    } catch (error) {
      console.log();
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);

  const handleScrollRight = () => {
    containerRef.current.scrollLeft += 200;
  };

  const handleScrollLeft = () => {
    containerRef.current.scrollLeft -= 200;
  };

  return (
    <div>
      <div className="container mx-auto p-4 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link className="text-green-600 hover:text-green-400">See All</Link>
      </div>
      <div className="relative flex items-center ">
        <div
          className=" flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none scroll-smooth"
            ref={containerRef}
        >
          {isLoading ? (
            <CardLoading />
          ) : (
            data?.map((p, index) => <ProductCard key={index} product={p} />)
          )}
        </div>
        <div className="w-full left-0 right-0 container mx-auto  px-2  absolute hidden lg:flex justify-between">
          <button
            onClick={handleScrollLeft}
            className="z-10 relative bg-white hover:bg-gray-100 shadow-lg text-lg p-2 rounded-full"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrollRight}
            className="z-10 relative  bg-white hover:bg-gray-100 shadow-lg p-2 text-lg rounded-full"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
