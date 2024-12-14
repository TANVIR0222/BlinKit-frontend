import { FaCartShopping } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { DisplayPriceInBDT } from '@/utils/DisplayPriceInBDT'
import useCartTotal from '@/Hooks/useCartTotal';

const CartMobileOnly = () => {
    const {cart} = useSelector(state => state.cart)
    
    const [totalQty , totalPrice ] = useCartTotal();
    
  return (
    <>
        {
            cart && (
            <div className='sticky bottom-4 p-2'>
            <div className='bg-green-600 px-2 py-1 rounded text-neutral-100 text-sm  flex items-center justify-between gap-3 lg:hidden'>
                    <div className='flex items-center gap-2'>
                        <div className='p-2 bg-green-500 rounded w-fit'>
                            <FaCartShopping/>
                        </div>
                        <div className='text-xs'>
                                <p>{totalQty} items</p>
                                <p>{DisplayPriceInBDT(totalPrice)}</p>
                        </div>
                    </div>

                    <Link to={"/cart"} className='flex items-center gap-1'>
                        <span className='text-sm'>View Cart</span>
                        <FaCaretRight/>
                    </Link>
                </div>
            </div>
            )
        }
    </>
    
  )
}

export default CartMobileOnly