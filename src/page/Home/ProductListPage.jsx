import { useGetAllCategoryQuery } from "@/app/feature/category/categoryApi";
import { useGetSubCategoryProductByIdQuery } from "@/app/feature/product/productApi";
import Loading from "@/components/common/Loading";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ProductCard from "@/components/common/ProductCard";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

const ProductListPage = () => {
  const { id } = useParams(); // Extract id properly
  const [productId, setProductId] = useState(id); // Initialize state with id
  const [activeSubCategory, setActiveSubCategory] = useState(); // Track active subcategory

  useEffect(() => {
    if (id) {
      setProductId(id); 
      setActiveSubCategory(id); 
    }
  }, [id]);

  const { data: subCategory, isLoading } = useGetSubCategoryProductByIdQuery(productId);
  const { data: responseData, isLoading: allCategortLoading } = useGetAllCategoryQuery();
  

  return allCategortLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <Helmet>
        <title>Product Listing Page || Blinkeyit</title>
      </Helmet>
      <section className="sticky top-24 lg:top-20">
        <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
          {/** Subcategory **/}
          <div className="min-h-[88vh] max-h-[88vh] overflow-y-scroll grid gap-1 shadow-md scrollbarCustom bg-white py-2">
            {responseData?.categorys?.map((s, index) => (
              <div
                onClick={() => setProductId(s._id)} // Update productId on click
                key={index}
                className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b cursor-pointer 
                    ${activeSubCategory === s._id ? "bg-green-400 text-white" : "hover:bg-green-50"}`}
                >   
                <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border">
                  <img
                    src={s.image}
                    alt="subCategory"
                    className="w-14 lg:h-14 lg:w-12 h-full object-scale-down"
                  />
                </div>
                <p className="-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base">
                  {s.name}
                </p>
              </div>
            ))}
          </div>

          {/** Products **/}
          <div className="sticky top-20">
            <div className="bg-white shadow-md p-4 z-10">
              {/* <h3 className='font-semibold'>{subCategoryName}</h3> */}
            </div>
            <div>
              <div className="min-h-[80vh] max-h-[80vh] overflow-y-auto relative">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                  {isLoading ? (
                    <Loading />
                  ) : (
                    subCategory?.data?.length === 0 ? <img className="flex items-center justify-center h-full w-full" src="/nothing here yet.webp" alt="" /> : subCategory?.data?.map((p) => (
                      <ProductCard product={p} key={p._id} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListPage;
