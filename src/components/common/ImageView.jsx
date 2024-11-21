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
        <DialogTrigger><IoEyeOutline  size={20} className=" hover:text-secondary" /> </DialogTrigger>
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
