import useCartTotal from "@/Hooks/useCartTotal";
import { DisplayPriceInBDT } from "@/utils/DisplayPriceInBDT";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddAddress from "./AddAddress";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserAddressQuery } from "@/app/feature/address/adderssApi";
import useUser from "@/Hooks/useUser";
import { useCashOnDeliveryMutation, useOnlinePaymentMutation } from "@/app/feature/order/OrderApi";
import toast from "react-hot-toast";
import { clearCart } from "@/app/feature/cart/cartSlice";
// stripe 
import {loadStripe} from '@stripe/stripe-js';

const CheckOut = () => {
    const [totalQty, totalPrice,totalDiscountedPrice, cartItem] = useCartTotal();
    const [openAddress, setOpenAddress] = useState(false)
    const [user] = useUser();
    const {cart} = useSelector(state => state.cart)
    const navigate = useNavigate();
    
    useEffect(() => {
      cartItem
    }, [cartItem]);
    
    const {data: addresses, isLoading, error} = useGetUserAddressQuery(user?._id);    
    
    const [selectAddress, setSelectAddress] = useState(0)
    const { data: address, isSuccess, isError } = useGetUserAddressQuery(user?._id);
    const dispatch = useDispatch();

    // Get the selected address
    const selectedAddress = address?.data?.[selectAddress];

  
  // list_items ,subTotalAmt , totalAmt , addressId
    const locations = useLocation()

    const [cashOnDelivery] = useCashOnDeliveryMutation();
    const [onlinePayment] = useOnlinePaymentMutation();


    const handleCashOnDelivery = async() =>{
      
      try {

        const data  = {
          list_items : cart,
          addressId: selectedAddress?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      
        const {success} = await cashOnDelivery({...data , id: user?._id} ).unwrap();
        if(success){
          toast.success("Address Added Successfully")
          navigate('/success');
          dispatch(clearCart())

        }
        
      } catch (error) {
        console.log(error);
      }
    }
    
    const handleOnlinePayment = async() =>{
      
      try {
        toast.loading();
        const stripePublicKey = import.meta.env.VITE_STRIPE_KEY;
        const stripePromise = await loadStripe(stripePublicKey);

        const data  = {
          list_items : cart,
          addressId: selectedAddress?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalDiscountedPrice,
        }
      
        const res  = await onlinePayment({...data , id: user?._id} ).unwrap();
        await stripePromise.redirectToCheckout({sessionId: res.id});
        
      } catch (error) {
        console.log(error);
      }
    }
    
    return (
        <div>
             <section className='bg-blue-50'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
        <div className='w-full'>
          {/***address***/}
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className='bg-white p-2 grid gap-4'>
            {
              addresses?.data?.map((address, index) => {
                return (
                  <label key={index} htmlFor={"address" + index} className={!address.status && "hidden"}>
                    <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                      <div>
                        <input id={"address" + index} type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
                      </div>
                      <div> 
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobile}</p> 
                      </div>
                    </div>
                  </label>
                )
              })
            } 
            <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
              Add address
            </div>
          </div>



        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          {/**summary**/}
          <h3 className='text-lg font-semibold'>Summary</h3>
          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Bill details</h3>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Items total</p>
              <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInBDT(totalPrice)}</span><span>{DisplayPriceInBDT(totalDiscountedPrice)}</span></p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Quntity total</p>
              <p className='flex items-center gap-2'>{totalQty} item</p>
            </div>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Delivery Charge</p>
              <p className='flex items-center gap-2'>Free</p>
            </div>
            <div className='font-semibold flex items-center justify-between gap-4'>
              <p >Grand total</p>
              <p>{DisplayPriceInBDT(totalDiscountedPrice)}</p>
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <button onClick={handleOnlinePayment} className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold' >Online Payment</button>
            <button onClick={handleCashOnDelivery} className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white'>Cash on Delivery</button>
          </div>
        </div>
      </div>


      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }
    </section>
        </div>
    );
};

export default CheckOut;