import Search from "@/components/common/Search";
import { Link } from "react-router-dom";
import { LuUserCircle } from "react-icons/lu";
import UserMenu from "@/components/common/UserMenu";
import CartSidebar from "@/components/common/CartSidebar";
import useUser from "@/Hooks/useUser";
import {useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { DisplayPriceInBDT } from "@/utils/DisplayPriceInBDT";
import useCartTotal from "@/Hooks/useCartTotal";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [user] = useUser();
  const [openCartSection, setOpenCartSection] = useState(false);

  const closeCartSidebar = () => setOpenCartSection(false);
  const [totalQty, totalPrice, , cartItem] = useCartTotal();



  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="h-full">
          <div className="flex items-center h-full">
            <Link to="/">
              <img className="w-24 md:w-52 ml-4" src="/logo.png" alt="logo" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="hidden lg:inline-block">
          <Search />
        </div>

        {/* Login Menu */}
        <div>
          <button className="text-neutral-600 lg:hidden">
            {user ? (
              <div className="flex items-center gap-2 cursor-pointer">
                <p>Account</p>
                <UserMenu />
              </div>
            ) : (
              <Link to="/login">
                <LuUserCircle size={28} />
              </Link>
            )}
          </button>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 cursor-pointer">
                <p>Account</p>
                <UserMenu />
                <div>
                <div>
      {/* Cart Button */}
      <button
        className="flex items-end gap-2 bg-green-700 hover:bg-green-900 px-3 py-3 rounded-md text-white transition-all duration-300"
        aria-expanded={openCartSection}
        aria-controls="cart-sidebar"
        onClick={() => setOpenCartSection(!openCartSection)}
      >
        <div className="animate-bounce">
          <TiShoppingCart size={28} />
        </div>
        <div className="font-semibold text-sm">
          {cartItem?.data?.length > 0 ? (
            <div>
              <p>{totalQty} Items</p>
              <p>{DisplayPriceInBDT(totalPrice)}</p>
            </div>
          ) : (
            <p>My Cart</p>
          )}
        </div>
      </button>

      {/* Cart Sidebar with Animation */}
      <AnimatePresence>
        {openCartSection && (
          <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50"
        >
          <CartSidebar close={closeCartSidebar} />
        </motion.div>
        )}
      </AnimatePresence>
    </div>
      </div>
              </div>
            ) : (
              <Link to="/login" className="text-lg px-2">
                Login
              </Link>
            )}
          </div>
        </div>
         {/* Cart Sidebar */}
      </div>

      

      {/* Mobile Search */}
      <div className="container mx-auto px-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
