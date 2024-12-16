import {useGetSingleProductByIdQuery,useUpdateProductMutation,} from "@/app/feature/product/productApi";
import { MdDelete } from "react-icons/md";
import { useParams } from "react-router-dom";
import ImageView from "./ImageView";
import Loading from "./Loading";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useState } from "react";
import { useImageUploadeMutation } from "@/app/feature/uploadeImage/imageApi";
import uploadImage from "@/utils/uploadeImage";
import Swal from "sweetalert2";

const EditeProducAdmin = () => {
  const { id } = useParams();
  const { data } = useGetSingleProductByIdQuery(id);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUploade] = useImageUploadeMutation();
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [datas, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });


  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    try {
      setImageLoading(true);
      const imageRes = await uploadImage(file, id, imageUploade);
      setData((prev) => ({
        ...prev,
        image: [...prev.image, imageRes.data.url],
      }));
      setImageLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   handleDeleteImage
  const handleDeleteImage = async (index) => {
    datas.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      id: id,
      name: datas.name,
      image: [...data.image, ...datas.image],
      unit: datas.unit,
      stock: datas.stock,
      price: datas.price,
      discount: datas.discount,
      description: datas.description,
    };

    try {
      const {success} = await updateProduct(updateData).unwrap();
      if (success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} uploaded successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section>
        <div className="p-2   bg-white shadow-md flex items-center justify-between">
          <h2 className="font-semibold">Upload Product</h2>
        </div>
        <div className="grid p-3">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            {/* name text input */}
            <div className="grid gap-1">
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                name="name"
                defaultValue={data?.name}
                onChange={handleChange}
                required
                className="bg-blue-50 p-2 outline-none border focus-within:border-black rounded"
              />
            </div>
            {/* Description */}
            <div className="grid gap-1">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <textarea
                id="description"
                type="text"
                placeholder="Enter product description"
                name="description"
                defaultValue={data?.description}
                onChange={handleChange}
                required
                multiple
                rows={3}
                className="bg-blue-50 p-2 outline-none border focus-within:border-black rounded resize-none"
              />
            </div>
            {/* image  */}
            <div>
              <p className="font-medium">Image</p>
              <div>
                <label
                  htmlFor="productImage"
                  className="bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer"
                >
                  <div className="text-center flex justify-center items-center flex-col">
                    {imageLoading ? (
                      <Loading />
                    ) : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Image</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="productImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUploadImage}
                  />
                </label>
                {/**display uploded image*/}
                <div className="flex flex-wrap gap-4">
                  {data?.image.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                      >
                        <img
                          src={img}
                          alt={img}
                          className="w-full h-full object-scale-down cursor-pointer"
                          onClick={() => setViewImageURL(img)}
                        />
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className="absolute bottom-0 right-0 p-1 text-red-500 rounded  hidden group-hover:block cursor-pointer"
                        >
                          <MdDelete size={16} />
                        </div>

                        <div className="absolute top-0 right-0 p-1 rounded hidden group-hover:block cursor-pointer">
                          <ImageView image={img} />
                        </div>
                      </div>
                    );
                  })}
                  {datas?.image.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group"
                      >
                        <img
                          src={img}
                          alt={img}
                          className="w-full h-full object-scale-down cursor-pointer"
                          onClick={() => setViewImageURL(img)}
                        />
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className="absolute bottom-0 right-0 p-1 text-red-500 rounded  hidden group-hover:block cursor-pointer"
                        >
                          <MdDelete size={16} />
                        </div>

                        <div className="absolute top-0 right-0 p-1 rounded hidden group-hover:block cursor-pointer">
                          <ImageView image={img} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/*Unit  */}
            <div className="grid gap-1">
              <label htmlFor="unit" className="font-medium">
                Unit
              </label>
              <input
                id="unit"
                type="text"
                placeholder="Enter product unit"
                name="unit"
                defaultValue={data?.unit}
                onChange={handleChange}
                required
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
            {/* Number of Stock */}
            <div className="grid gap-1">
              <label htmlFor="stock" className="font-medium">
                Number of Stock
              </label>
              <input
                id="stock"
                type="number"
                placeholder="Enter product stock"
                name="stock"
                defaultValue={data?.stock}
                onChange={handleChange}
                required
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
            {/* Price */}
            <div className="grid gap-1">
              <label htmlFor="price" className="font-medium">
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="Enter product price"
                name="price"
                defaultValue={data?.price}
                onChange={handleChange}
                required
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>
            {/* Discount */}
            <div className="grid gap-1">
              <label htmlFor="discount" className="font-medium">
                Discount
              </label>
              <input
                id="discount"
                type="number"
                placeholder="Enter product discount"
                name="discount"
                defaultValue={data?.discount}
                onChange={handleChange}
                required
                className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded"
              />
            </div>

            <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold">
              {isLoading ? <p>Loading...</p> : "Submit"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditeProducAdmin;
