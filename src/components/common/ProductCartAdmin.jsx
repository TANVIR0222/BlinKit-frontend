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
      </div>
    </div>
  );
};

export default ProductCartAdmin;
