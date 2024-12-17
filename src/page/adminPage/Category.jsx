import { useGetAllCategoryQuery } from "@/app/feature/category/categoryApi";
import UploadeCategoryModel from "./UploadeCategoryModel";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import EditeCategory from "../../components/common/EditeCategory ";
import DeleteProduct from "@/components/common/DeleteProduct";
import { Helmet } from "react-helmet";


const Category = () => {
  const { data: allCategory, isLoading } = useGetAllCategoryQuery();


  return (
    <div>
      <div className="p-2   bg-white shadow-md flex items-center justify-between">
      <Helmet>
        <title>Admin Category Page || Blinkeyit</title>
      </Helmet>
        <h2 className="font-semibold">Category</h2>
        <button className="">
          <UploadeCategoryModel />
        </button>
      </div>
      {allCategory === undefined && <NoData />}

      <div className="p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Loading />
          </div>
        ) : (
          allCategory?.categorys.map((category) => (
            <div className="w-32 h-60 rounded shadow-md" key={category._id}>
              <img
                alt={category.name}
                src={category.image}
                className="w-full object-scale-down"
              />
              <h2 className="text-center h-16">{category.name}</h2>
              <div className="items-center h-9 flex gap-2">
                <button className="flex-1 font-medium py-1 rounded">
                  <EditeCategory category={category} />
                </button>
                <button
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded"
                >
                  {/* common conponent */}
                  <DeleteProduct id={category._id} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;
