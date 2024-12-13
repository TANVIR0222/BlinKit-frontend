import Search from "@/components/common/Search";
import { Link } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import UserMenu from "@/components/common/UserMenu";
import { useGetSingleUserCartQuery } from "@/app/feature/cart/cartApi";
import { DisplayPriceInBDT } from "@/utils/DisplayPriceInBDT";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  const { data: cartItem } = useGetSingleUserCartQuery(user?._id);
  const totalQty = cartItem?.data?.reduce((acc,item) => acc + item.quantity , 0);
  // Calculate total price
  const totalPrice = cartItem?.data.reduce((acc, item) => {
  const price = item.productId.price;
  const discount = item.productId.discount;
  const quantity = item.quantity;

  const discountedPrice = price + discount; // Discount is negative, so we add it
  return acc + discountedPrice * quantity;
}, 0);

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
            {user ? (
              <div className="flex items-center gap-2 cursor-pointer">
                <p>Account</p>
                <UserMenu user={user} />
              </div>
            ) : (
              <Link to="/login">
                <LuUserCircle size={28} />
              </Link>
            )}
          </button>

          {/* only show on desktop */}
          <div className="hidden lg:flex items-center gap-5 ">
            {user ? (
              <div className="flex items-center gap-2 cursor-pointer">
                <p>Account</p>
                <UserMenu user={user} />
              </div>
            ) : (
              <Link to={"/Login"} className="text-lg px-2">
                Login
              </Link>
            )}

            <button className="flex items-center gap-2 bg-green-700 hover:bg-green-900 px-3 py-3 rounded-md text-white">
              {/*add to card icon */}
              <div className=" animate-bounce">
                <TiShoppingCart size={28} />
              </div>
              {/* item  */}
              <div className="font-semibold text-sm">
                {cartItem ? (
                  <div>
                    <p>{totalQty} Items</p>
                    <p>{DisplayPriceInBDT(totalPrice)}</p>
                  </div>
                ) : (
                  <p>My Cart</p>
                )}
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
