import { Link } from "react-router-dom";

const ProductCard = ({product}) => {
    
    return (
        <Link  className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
        <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
              <img 
                  src={product?.image[0]}
                  className='w-full h-full object-scale-down lg:scale-125'
              />
        </div>
        <div className='flex items-center gap-1'>
          <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50'>
                10 min 
          </div>
          <div>
              {
                Boolean(product?.discount) && (
                  <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{product?.discount}% discount</p>
                )
              }
          </div>
        </div>
        <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
          {product?.name}
        </div>
        <div className='w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base'>
          {product?.unit} 
          
        </div>
  
        <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
          <div className='flex items-center gap-1'>
            <div className='font-semibold'>
                {/* {DisplayPriceInRupees(pricewithDiscount(product?.price,data.discount))}  */}
            </div>
            
            
          </div>
          {/* <div className=''>
            {
              data.stock == 0 ? (
                <p className='text-red-500 text-sm text-center'>Out of stock</p>
              ) : (
                <AddToCartButton data={data} />
              )
            }
              
          </div> */}
        </div>
  
      </Link>
    );
};

export default ProductCard;