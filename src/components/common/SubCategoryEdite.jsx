import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useImageUploadeMutation } from "@/app/feature/uploadeImage/imageApi";
import uploadImage from "@/utils/uploadeImage";
import { useUpdateSubCategoryMutation } from "@/app/feature/subCategory/subCategoryApi";
import { useGetAllCategoryQuery } from "@/app/feature/category/categoryApi";

const SubCategoryEdite = ({ category }) => {
  const { _id: id, name } = category;
  const { data: allCategory } = useGetAllCategoryQuery();

  const [image, setImage] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imageUploade, { isLoading: imageLoading }] = useImageUploadeMutation();
  const [updateSubCategory, { isLoading: categoryLoading }] =
    useUpdateSubCategoryMutation();

  const onSubmit = async (data) => {
    const file = data.uploadCategoryImage[0];
    if (!file) {
      return alert("Please select an image");
    }

    try {
      const imageUrl = await uploadImage(file, id, imageUploade);
      setImage(imageUrl.data.url);

      const name = data.categoryName;
      const image = imageUrl.data.url;
      const  category = data.select;

      const res = await updateSubCategory({ id, name, image , category}).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger >
          <Button size="sm" variant="">
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <h2 className="text-lg font-bold">Edit Category</h2>
            <form className="my-3 grid gap-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-1">
                <label id="categoryName">Name</label>
                <input
                  type="text"
                  id="categoryName"
                  defaultValue={name}
                  placeholder="Enter category name"
                  name="categoryName"
                  {...register("categoryName", { required: true })}
                  className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
                />
                {errors.categoryName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="grid gap-1">
                <p>Image</p>
                <div className="flex gap-4 flex-col lg:flex-row items-center">
                  <div className="border bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center rounded">
                    {image ? (
                      <img
                        alt="category"
                        src={image}
                        className="w-full h-full object-scale-down"
                      />
                    ) : (
                      <p className="text-sm text-neutral-500">Uploade image</p>
                    )}
                  </div>
                  <label htmlFor="uploadCategoryImage">
                    <div className="bg-secondary px-3 py-2 rounded">
                      {imageLoading ? <p>Loading....</p> : "Upload Image"}
                    </div>
                    <input
                      // onChange={handleUploadCategoryImage}
                      type="file"
                      id="uploadCategoryImage"
                      className="hidden"
                      {...register("uploadCategoryImage", { required: true })}
                    />
                    {errors.uploadCategoryImage && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="grid gap-1">
                  <label>Select Category</label>
                  <div className="border focus-within:border-primary-200 rounded">
                    {/*display value**/}

                    {/*select category**/}
                    <select
                      id="select"
                      name="select"
                      {...register("select", { required: true })}
                      className="w-full p-2 bg-transparent outline-none border"
                    >
                      <option>Select Category</option>
                      {allCategory?.categorys.map((category, index) => (
                        <option value={category?.name} key={index}>
                          {category?.name}
                        </option>
                      ))}
                       {errors.select && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                    </select>
                   
                   
                  </div>
                </div>

              <button className={`bg-secondary px-3 py-2 rounded `}>
                {" "}
                {categoryLoading ? <p>Loading....</p> : "Update category"}
              </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
  //{isLoading ? <p>Loading....</p> : 'Add Category' }
};

export default SubCategoryEdite;