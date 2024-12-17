import { useImageUploadeMutation } from "@/app/feature/uploadeImage/imageApi";
import Loading from "@/components/common/Loading";
import uploadImage from "@/utils/uploadeImage";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import ImageView from "@/components/common/ImageView";
import { IoClose } from "react-icons/io5";
import { useGetAllCategoryQuery } from "@/app/feature/category/categoryApi";
import { useGetAllSubCategoryQuery } from "@/app/feature/subCategory/subCategoryApi";
import { useProductUploadeMutation } from "@/app/feature/product/productApi";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const UploadeProduct = () => {
  const { user } = useSelector((state) => state.auth);
  //   image loding true
  const [imageLoading, setImageLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const [data, setData] = useState({
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
      const imageRes = await uploadImage(file, user._id, imageUploade);
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
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  //  remove category view dispay delete
  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  //

  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  //
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  //
  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  // ta
  const [imageUploade] = useImageUploadeMutation();
  const { data: allCategory } = useGetAllCategoryQuery();
  const { data: allSubCategory } = useGetAllSubCategoryQuery();
  const [productUploade, { isLoading}] =useProductUploadeMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();


    const productData ={
      name : data.name,
     image : data.image,
     category : data.category,
     subCategory : data.subCategory,
     unit : data.unit,
     stock : data.stock,
     price : data.price,
     discount : data.discount,
     description : data.description,
     more_details : data.more_details,
      
    }

    try {
      const {success} = await productUploade(productData).unwrap();
      if (success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${data.name} uploaded successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
        setData({
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <Helmet>
        <title>Admin uploade Page || Blinkeyit</title>
      </Helmet>
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
              value={data.name}
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
              value={data.description}
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
                {data.image.map((img, index) => {
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
          {/* select category and sub category view data  */}
          <div className="grid gap-1">
            <label className="font-medium">Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory?.categorys.find(
                    (item) => item._id === value
                  );
                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    };
                  });
                  setSelectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {allCategory?.categorys.map((c, index) => {
                  return (
                    <option key={c._id} value={c?._id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.category.map((c, index) => {
                  return (
                    <div
                      key={index + 1}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveCategory(index)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sub Category */}
          <div className="grid gap-1">
            <label className="font-medium">Sub Category</label>
            <div>
              <select
                className="bg-blue-50 border w-full p-2 rounded"
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory?.categorys.find(
                    (el) => el._id === value
                  );

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory],
                    };
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value={""} className="text-neutral-600">
                  Select Sub Category
                </option>
                {allSubCategory?.categorys.map((c, index) => {
                  return <option value={c?._id}>{c.name}</option>;
                })}
              </select>
              <div className="flex flex-wrap gap-3">
                {data.subCategory.map((c, index) => {
                  return (
                    <div
                      key={c._id + index + "productsection"}
                      className="text-sm flex items-center gap-1 bg-blue-50 mt-2"
                    >
                      <p>{c.name}</p>
                      <div
                        className="hover:text-red-500 cursor-pointer"
                        onClick={() => handleRemoveSubCategory(index)}
                      >
                        <IoClose size={20} />
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
              value={data.unit}
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
              value={data.stock}
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
              value={data.price}
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
              value={data.discount}
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
  );
};

export default UploadeProduct;
