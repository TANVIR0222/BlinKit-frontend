import { useAddCategoryMutation } from "@/app/feature/category/categoryApi";
import { useImageUploadeMutation } from "@/app/feature/uploadeImage/imageApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import uploadImage from "@/utils/uploadeImage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const UploadeCategoryModel = () => {
  const [image, setImage] = useState("");
  const [categoryEror, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { user } = useSelector((state) => state.auth);
  const [imageUploade, { isLoading:imageLoading }] = useImageUploadeMutation();
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const onSubmit = async (data) => {
    // const name = ;
    const file = data.uploadCategoryImage[0];
    if (!file) {
      return;
    }

    try {
      const res = await uploadImage(file, { id: user._id }, imageUploade);
      setImage(res.data.url);

      const category = {
        name : data.categoryName,
        image: res.data.url,
      }      

      const uploadeCategory = await addCategory(category).unwrap();
      
      if(uploadeCategory.success){
        toast.success(' Categoy added successfully');
        reset();
      }
    } catch (error) {
      setError(error.data.msg);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Category</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <form className="my-3 grid gap-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-1">
                <label id="categoryName">Name</label>
                <input
                  type="text"
                  id="categoryName"
                  placeholder="Enter category name"
                  name="categoryName"
                  {...register("categoryName", { required: true })}
                  className="bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 outline-none rounded"
                />
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
                      <p className="text-sm text-neutral-500">No Image</p>
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
                  </label>
                </div>
              </div>

              <button className={`bg-secondary px-3 py-2 rounded `}> {isLoading ? <p>Loading....</p> : 'Add Category' } </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadeCategoryModel;
