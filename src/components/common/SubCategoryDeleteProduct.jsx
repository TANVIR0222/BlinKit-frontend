import { useDelateSubCategoryMutation } from "@/app/feature/subCategory/subCategoryApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const SubCategoryDeleteProduct = ({ id }) => {  
  const [delateSubCategory] = useDelateSubCategoryMutation();

  const handleDelete = async (deleteId) => {
    try {
       await delateSubCategory(deleteId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="bg-red-500 p-2 text-white rounded shadow" >Delete</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SubCategoryDeleteProduct;
