import { useGetAllCategoryQuery } from "@/app/feature/category/categoryApi";
import { useSubCategoryUploadeMutation } from "@/app/feature/subCategory/subCategoryApi";
import { useImageUploadeMutation } from "@/app/feature/uploadeImage/imageApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import uploadImage from "@/utils/uploadeImage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UploadeSubCategoryModel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [subCategoryData, setSubCategoryData] = useState();
  const { data: allCategory } = useGetAllCategoryQuery();
  const [imageUploade , {isLoading:imageLoading}] = useImageUploadeMutation();
  const [subCategoryUploade , {isLoading :subCategoryLoading}] = useSubCategoryUploadeMutation();
  const { user } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    const file = data.uploadSubCategoryImage[0];
    try {
      const uploageImage = await uploadImage(
        file,
        { id: user._id },
        imageUploade
      );
      setSubCategoryData(uploageImage.data.url);
      console.log(uploageImage.data.url);

      const name = data.name;
      const image = uploageImage.data.url;
      const category = data.select;

      const res = await subCategoryUploade({ name, image, category }).unwrap();
      if(res.success){
        toast.success('Add sub category successfully');
        reset()
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Sub Category</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Sub Category</DialogTitle>
            <div className="w-full max-w-5xl bg-white p-4 rounded">
              <div className="flex items-center justify-between gap-3"></div>
              <form
                className="my-3 grid gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid gap-1">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    className="p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded "
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="grid gap-1">
                  <p>Image</p>
                  <div className="flex flex-col lg:flex-row items-center gap-3">
                    <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center">
                      {!subCategoryData ? (
                        <p className="text-sm text-neutral-400">No Image</p>
                      ) : (
                        <img
                          alt="subCategory"
                          src={subCategoryData}
                          className="w-full h-full object-scale-down"
                        />
                      )}
                    </div>
                    <label htmlFor="uploadSubCategoryImage">
                      <div className="p-2 bg-secondary rounded ">
                        {imageLoading ? <p>Loading...</p> : ' Upload Image'}  
                      </div>
                      <input
                        type="file"
                        id="uploadSubCategoryImage"
                        className="hidden"
                        {...register("uploadSubCategoryImage", {
                          required: true,
                        })}
                      />
                      {errors.uploadSubCategoryImage && (
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
                <button className="bg-secondary p-2 rounded">{subCategoryLoading ? <p>Loading...</p> : 'Submit'}</button>
              </form>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadeSubCategoryModel;
