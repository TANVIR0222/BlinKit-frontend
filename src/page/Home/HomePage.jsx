import { Link} from "react-router-dom";
import { useGetAllCategoryQuery } from "@/app/feature/category/categoryApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import CategoryWiseProductDisplay from "./CategoryWiseProductDisplay";
import { Helmet } from "react-helmet";
const HomePage = () => {
 
  const { data: responseData , isLoading:allCategortLoading} = useGetAllCategoryQuery();
  
  

  return (
    <section className="bg-white ">
       <Helmet>
          <title>Home Page || Blinkeyit</title>
        </Helmet>
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
            src={'/banner-mobile.jpg'}
            className="w-full h-full lg:hidden"
            alt="banner"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 my-2 grid grid-cols-4 sm:grid-cols-2  md:grid-cols-8 lg:grid-cols-10 gap-6">
        {allCategortLoading? <LoadingSpinner />  : responseData?.categorys?.map((category) => (
          <Link
            key={category._id}
            className="border rounded-lg shadow-md hover:shadow-lg transition-shadow p-1"
            // onClick={()=>handleRedirectProductListpage(category._id,category.name)}
            to={`subCategory/${category._id}`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full bg-blue-100 h-16  md:h-24 rounded-md mb-4 px-1 object-scale-down"
            />
            <h2 className="text-sm  font-semibold text-center">
              {category.name}
            </h2>
          </Link>
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
