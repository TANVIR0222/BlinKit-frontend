import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { SlEye } from "react-icons/sl";

const ProductViewDilog = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to the previous slide
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? product?.image?.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  // Go to the next slide
  const nextSlide = () => {
    const isLastSlide = currentIndex === product?.image?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <SlEye className="text-3xl p-1 w-full bg-green-500 text-black rounded-l" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{product?.name}</DialogTitle>
            <DialogDescription>
              <div className="relative w-full max-w-4xl mx-auto ">
                {/* Images */}
                <div className="w-full h-40 md:h-96 flex items-center justify-center">
                  <img
                    src={product?.image[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Left Arrow */}
                <button
                  onClick={prevSlide}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition duration-300"
                >
                  &#8592;
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextSlide}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition duration-300"
                >
                  &#8594;
                </button>
              </div>
              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product?.image?.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full cursor-pointer ${
                      currentIndex === index ? "bg-white" : "bg-gray-400"
                    }`}
                  ></div>
                ))}
              </div>
              <div className="">
                <div className="my-4 gap-3 ">
                  <div>
                    <p className="font-semibold">Description</p>
                    <p className="text-base">{product?.description}</p>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductViewDilog;
