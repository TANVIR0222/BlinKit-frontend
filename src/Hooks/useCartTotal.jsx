import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetSingleUserCartQuery } from "@/app/feature/cart/cartApi";
import { handleAddItemCart } from "@/app/feature/cart/cartSlice";
import useUser from "./useUser";

const useCartTotal = () => {
  const [user] = useUser();
  const id = user?._id;

  const { data: cartItem } = useGetSingleUserCartQuery(id, { skip: !id });

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItem?.data) {
      dispatch(handleAddItemCart(cartItem.data)); // Dispatch after render
    }
  }, [cartItem?.data, dispatch]);

  const totalQty = cartItem?.data?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  let currentPrice = 0; // Total without discount
  let totalDiscountedPrice = 0; // Total after applying discount

  cartItem?.data?.forEach((item) => {
    const price = item?.productId?.price;
    const discount = item?.productId?.discount;
    const quantity = item.quantity;
    const discountedPrice = price - discount;

    currentPrice += price * quantity;
    totalDiscountedPrice += discountedPrice * quantity;
  });

  const totalPrice = currentPrice;

  return [totalQty, totalPrice, cartItem];
};

export default useCartTotal;
