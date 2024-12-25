import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetSingleUserCartQuery } from "@/app/feature/cart/cartApi";
import { handleAddItemCart } from "@/app/feature/cart/cartSlice";
import useUser from "./useUser";

const useCartTotal = () => {
  const [user] = useUser();
  const { data: cartItem } = useGetSingleUserCartQuery(user?._id);
  const dispatch = useDispatch();

  let currentPrice = 0; // Total price without discount
  let totalDiscountedPrice = 0; // Total price after applying discount

  // Total quantity of items
  const totalQty = cartItem?.data?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  useEffect(() => {
    if (cartItem?.data) {
      dispatch(handleAddItemCart(cartItem?.data)); // Dispatch cart items to Redux
    }
  }, [cartItem?.data, dispatch]);

  // Calculate totals
  cartItem?.data?.forEach((item) => {
    const price = item?.productId?.price || 0;
    const discount = item?.productId?.discount || 0;
    const quantity = item.quantity;

    // Apply discount (if percentage, adjust the formula)
    const discountedPrice = price - (price * (discount / 100));

    currentPrice += price * quantity;
    totalDiscountedPrice += discountedPrice * quantity;
  });

  console.log(Math.ceil(totalDiscountedPrice));
  

  const totalPrice = currentPrice; // For consistency if you use both totals

  return [totalQty, totalPrice, totalDiscountedPrice, cartItem];
};

export default useCartTotal;
