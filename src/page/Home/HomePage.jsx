import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { valideURLConvert } from "@/utils/valideURLConvert";
import { useGetAllCategoryQuery } from "@/app/feature/category/categoryApi";
import { useGetAllSubCategoryQuery } from "@/app/feature/subCategory/subCategoryApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CategoryWiseProductDisplay from "./CategoryWiseProductDisplay";
const HomePage = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const navigate = useNavigate();
  const { data: responseSubData } = useGetAllSubCategoryQuery();


  const handleRedirectProductListpage = (id, cat) => {
    console.log("Redirecting with ID:", id, "and Category:", cat);
  
    // Ensure responseSubData and categorys exist
    if (!responseSubData?.categorys) {
      console.error("responseSubData or categorys is undefined.");
      return;
    }
  
    // Find the subcategory safely
    const subcategory = responseSubData.categorys.find((sub) => {
      // Ensure sub.category is an array
      if (!Array.isArray(sub.category)) {
        console.error(`Invalid category format for sub:`, sub);
        return false;
      }
  
      // Check if sub.category contains the given ID
      return sub.category.some((c) => c._id === id);
    });
  
    // If no subcategory is found, log an error and exit
    if (!subcategory) {
      console.error("No subcategory found for ID:", id);
      return;
    }
  
    // Construct the URL safely
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name || ""
    )}-${subcategory._id || ""}`;
  
    console.log("Navigating to URL:", url);
    navigate(url);
  };

  const { data: responseData , isLoading:allCategortLoading} = useGetAllCategoryQuery();

  return (
    <section className="bg-white ">
      <div className="container mx-auto">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded 
            !banner && "animate-pulse my-2"
           `}
        >
          <img
            src={'/banner.jpg'}
            className="w-full h-full hidden lg:block"
            alt="banner"
          />
          <img
            src={'/'}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-4 sm:grid-cols-2  md:grid-cols-8 lg:grid-cols-10 gap-6">
        {allCategortLoading? <LoadingSpinner />  : responseData?.categorys?.map((category) => (
          <div
            key={category._id}
            className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-1"
            onClick={()=>handleRedirectProductListpage(category._id,category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full bg-blue-100 h-16  md:h-24 rounded-md mb-4 px-1 object-scale-down"
            />
            <h2 className="text-sm  font-semibold text-center">
              {category.name}
            </h2>
          </div>
        ))}
      </div>

        {
          responseData?.categorys?.map((category) => (
            <CategoryWiseProductDisplay id={category._id} name={category.name} />
          ))  
        }

    </section>
  );
};

export default HomePage;
