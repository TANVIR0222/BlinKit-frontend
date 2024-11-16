import Search from "@/components/common/Search";
import { Link } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { TiShoppingCart } from "react-icons/ti";

const Header = () => {
  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      <div className="container flex items-center justify-between  ">
        {/* logo */}
        <div className="h-full ">
          <div className="flex items-center  h-full">
            <Link to={"/"}>
              {" "}
              <img className="w-24 md:w-52 ml-4 " src="/logo.png" alt="logo" />
            </Link>
          </div>
        </div>
        {/* search */}
        <div className=" hidden lg:inline-block">
          <Search />
        </div>

        {/* login menu  */}
        <div className="">
          {/* only show on mobile */}
          <button className="text-neutral-600 lg:hidden">
            <LuUserCircle size={28} />
          </button>

          {/* only show on desktop */}
          <div className="hidden lg:flex items-center gap-5 ">
            <Link to={'/Login'} className="text-lg px-2">Login</Link>

            <button className="flex items-center gap-2 bg-green-700 hover:bg-green-900 px-3 py-3 rounded-md text-white">
              {/*add to card icon */}
              <div className=" animate-bounce">
                <TiShoppingCart size={28} />
              </div>
              {/* item  */}
              <div className=" font-semibold">
                <p>My cart </p>
               
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
