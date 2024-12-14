import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useCartTotal from "@/Hooks/useCartTotal";
import { DisplayPriceInBDT } from "@/utils/DisplayPriceInBDT";
import { TiShoppingCart } from "react-icons/ti";
import AddToCartButton from "./AddToCartButton";
import { FaCaretRight } from "react-icons/fa";
import { pricewithDiscount } from "@/utils/priceWithDiscount";

const CartSidebar = () => {
  const [totalQty, totalPrice, cartItem] = useCartTotal();

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          {/*add to card icon */}
          <button className="flex items-end gap-2 bg-green-700 hover:bg-green-900 px-3 py-3 rounded-md text-white ">
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
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Cart</SheetTitle>
            <SheetDescription>
              <section className="">
                <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto">
                  <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
                    {/***display items */}
                    {cartItem ? (
                      <>
                        <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full">
                          <p>Your total savings</p>
                          <p>{DisplayPriceInBDT(totalPrice)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                          {cartItem &&
                            cartItem?.data?.map((item, index) => {
                              return (
                                <div
                                  key={item?._id + "cartItemDisplay"}
                                  className="flex  w-full gap-4"
                                >
                                  <div className="w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded">
                                    <img
                                      src={item?.productId?.image[0]}
                                      className="object-scale-down"
                                    />
                                  </div>
                                  <div className="w-full max-w-sm text-xs">
                                    <p className="text-xs text-ellipsis line-clamp-2">
                                      {item?.productId?.name}
                                    </p>
                                    <p className="text-neutral-400">
                                      {item?.productId?.unit}
                                    </p>
                                    <p className='font-semibold'>{DisplayPriceInBDT(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
                                  </div>
                                  <div>
                                    <AddToCartButton data={item?.productId} />
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div className="bg-white p-4">
                          <h3 className="font-semibold">Bill details</h3>
                          <div className="flex gap-4 justify-between ml-1">
                            <p>Items total</p>
                            <p className="flex items-center gap-2">
                              <span className="line-through text-neutral-400">
                                {}
                              </span>
                              <span>{DisplayPriceInBDT(totalPrice)}</span>
                            </p>
                          </div>
                          <div className="flex gap-4 justify-between ml-1">
                            <p>Quntity total</p>
                            <p className="flex items-center gap-2">
                              {totalQty} item
                            </p>
                          </div>
                          <div className="flex gap-4 justify-between ml-1">
                            <p>Delivery Charge</p>
                            <p className="flex items-center gap-2">Free</p>
                          </div>
                          <div className="font-semibold flex items-center justify-between gap-4">
                            <p>Grand total</p>
                            <p>{DisplayPriceInBDT(totalPrice)}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-white flex flex-col justify-center items-center">
                        <img
                          src={"/empty_cart.webp"}
                          className="w-full h-full object-scale-down"
                        />
                        tanvir
                      </div>
                    )}
                  </div>

                  {cartItem && (
                    <div className="p-2">
                      <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
                        <div>{DisplayPriceInBDT(totalPrice)}</div>
                        <button className="flex items-center gap-1">
                          Proceed
                          <span>
                            <FaCaretRight />
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartSidebar;
