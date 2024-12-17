import { useSearchProductQuery } from "@/app/feature/product/productApi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import CardLoading from "@/components/common/CardLoading";
import ProductCard from "@/components/common/ProductCard";
import Loading from "@/components/common/Loading";
import { Helmet } from "react-helmet";

const SearchPage = () => {
  const [page, setPage] = useState(1);
  const params = useLocation();
  const search = params?.search?.slice(3);

  const queryParameters = {
    search,
    page,
    limit: 12,
  };

  const { data, isLoading } = useSearchProductQuery(queryParameters);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <Helmet>
        <title>Search Page || Blinkeyit</title>
      </Helmet>
      <section className="">
        <div className="container mx-auto p-4">
          <p className="font-semibold">
            Search Results: {data?.product?.length}{" "}
          </p>

          <InfiniteScroll
            dataLength={data?.product}
            hasMore={true}
            // next={handleFetchMore}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
              {data?.product?.map((p, index) => {
                return (
                  <ProductCard
                    product={p}
                    key={p?._id + "searchProduct" + index}
                  />
                );
              })}

              {/***loading data */}
              {isLoading && <CardLoading />}
            </div>
          </InfiniteScroll>

          {
            //no data
            !data?.product[0] && !isLoading && (
              <div className="flex flex-col justify-center items-center w-full mx-auto">
                <img
                  //   src={noDataImage}
                  className="w-full h-full max-w-xs max-h-xs block"
                />
                <p className="font-semibold my-2">No Data found</p>
              </div>
            )
          }
        </div>
        <div className=" flex justify-center gap-4 items-center ">
          {Array.from({ length: data?.totalPage }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 gap-3 py-2 rounded-lg border ${
                i + 1 === data?.currentPage
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-600 border-gray-300"
              } hover:bg-green-400 hover:text-white transition`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
