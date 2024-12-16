import { Link } from "react-router-dom";
import AdminDeleteProduct from "./AdminDeleteProduct";

const ProductCartAdmin = ({ product }) => {
  return (
    <div>
       <div className='w-36 p-4 bg-gray-100 rounded'>
        <div>
            <img
               src={product?.image[0]}  
               alt={product?.name}
               className='w-full h-full object-scale-down'
            />
        </div>
        <p className='text-ellipsis line-clamp-2 font-medium'>{product?.name}</p>
        <p className='text-slate-400'>unit:{product?.unit}</p>
        <div className="flex items-center justify-between gap-2 mt-2">
         <Link to={`/productEdite/${product._id}`}><button className="bg-black px-2 py-1 rounded text-white">Edit</button></Link>
         <button className="bg-red-500 px-2 py-1 rounded text-white"><AdminDeleteProduct id={product._id} /></button>
        </div>
      </div>
    </div>
  );
};

export default ProductCartAdmin;
