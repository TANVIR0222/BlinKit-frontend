import { useGetProductsQuery } from "@/app/feature/product/productApi";
import ProductCartAdmin from "@/components/common/ProductCartAdmin";
import ProductSearch from "@/components/common/ProductSearch";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
function Product() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useGetProductsQuery({ page, search });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on search
  };


  const handleNext = () => {
    setPage(page + 1);
  }
  const handlePrevious = () => {
    if (page === 1) {
        return toast.success('First Page')
    }
    setPage(page - 1);
    
  }

  return (
    <div>
       <Helmet>
        <title>Product Page || Blinkeyit</title>
      </Helmet>
      <div className="p-1  bg-white shadow-md flex items-center justify-between">
        <div className="">
          <h2 className="font-semibold md:text-xl text-sm">
           Total Products : {data?.total}
          </h2>
        </div>
        <ProductSearch
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          loading={isLoading}
        />
      </div>

      {/* Search Bar */}

      {/* Loading and Error Handling */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching products</p>}

      {/* Products List */}
      {data?.products?.length ? (
        <div>
          <ul className="grid grid-cols-2 mx-4 md:grid-cols-4 lg:grid-cols-5 gap-4 my-10 ">
            {data.products.map((product) => (
              <ProductCartAdmin key={product.id} product={product} />
            ))}
          </ul>

          {/* Pagination */}
          <div className="flex mx-auto justify-center items-center gap-5">
            <button
              className="bg-secondary px-3 py-[6px] rounded "
              onClick={handlePrevious}
              disabled={page === 1 && !data?.products?.length}
            >
              Previous
            </button>
            <p className=" border-black border-2 rounded px-2">{page}/{data?.pages }</p>
            <button
              className="bg-secondary px-3 py-[6px] rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Product;
