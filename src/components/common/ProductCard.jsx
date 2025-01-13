import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton";
import { DisplayPriceInBDT } from "@/utils/DisplayPriceInBDT";
import ProductViewDilog from "./ProductViewDilog";

const ProductCard = ({ product }) => {
  const handleShow = (e) =>{
    e.preventDefault();
    e.stopPropagation()


  }
  return (
    <Link
      to={`/productView/${product._id}`}
      className="border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white"
    >
      <div class="relative group min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
        <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
          {" "}
          <img
            src={product?.image[0]}
            className="w-full h-full object-scale-down lg:scale-125"
          />
        </div>

       
      </div>
      <div className="flex items-center gap-1">
        <div className="rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50">
          10 min
        </div>
        <div>
          {Boolean(product?.discount) && (
            <p className="text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full">
              {product?.discount}% discount
            </p>
          )}
        </div>
      </div>
      <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
        {product?.name.substring(0, 20)}...
      </div>
      <div className="w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base">
        {product?.unit}
      </div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center gap-1">
          <div className="font-semibold">
            {DisplayPriceInBDT(product?.price)} ৳
          </div>
        </div>
        <div className="">
          {product?.stock == 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <AddToCartButton data={product} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
