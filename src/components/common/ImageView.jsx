import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoEyeOutline } from "react-icons/io5";


const ImageView = ({ image }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-fit" ><IoEyeOutline  size={16} className=" hover:text-black" /> </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <img className="p-4" src={image} alt="" />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageView;
