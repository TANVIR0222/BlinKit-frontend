import { useGetSingleUserCartQuery } from "@/app/feature/cart/cartApi";
import { handleAddItemCart } from "@/app/feature/cart/cartSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useCartTotal = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { data: cartItem } = useGetSingleUserCartQuery(user?._id);
  dispatch(handleAddItemCart(cartItem?.data));
  const totalQty = cartItem?.data?.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  // Calculate total price
  // const totalPrice = cartItem?.data.reduce((acc, item) => {
  //   const price = item.productId.price;
  //   const discount = item.productId.discount;
  //   const quantity = item.quantity;

  //   const discountedPrice = price + discount; // Discount is negative, so we add it
  //   return acc + discountedPrice * quantity;
  // }, 0);

  let currentPrice = 0; // Total without discount
  let totalDiscountedPrice = 0; // Total after applying discount

  cartItem?.data.forEach((item) => {
    const price = item.productId.price;
    const discount = item.productId.discount;
    const quantity = item.quantity;

    const discountedPrice = price - discount;

    currentPrice += price * quantity;
    totalDiscountedPrice += discountedPrice * quantity;
  });


// console.log("Total Price (without discount): ₹", currentPrice);
// console.log("Total Price (with discount): ₹",totalDiscountedPrice);

const totalPrice = totalDiscountedPrice;
 
  return [totalQty , totalPrice ,cartItem ];
};

export default useCartTotal;