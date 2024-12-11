import { useGetSingleProductByIdQuery } from "@/app/feature/product/productApi";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
const ProductDisplayPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleProductByIdQuery(id);

  return isLoading ? (
    <Loading />
  ) : (
    <section className="container mx-auto p-4 grid lg:grid-cols-2 ">
      <div className="">
        {/* product image */}

        <Carousel>
          {data?.image.map((image, index) => (
            <div key={index} className="">
              <img className="" src={image} alt="product image" />
            </div>
          ))}
        </Carousel>

        <div className="my-4  hidden lg:grid gap-3 ">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data?.description}</p>
          </div>
          <div>
            <p className="font-semibold">Unit</p>
            <p className="text-base">{data?.unit}</p>
          </div>
          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className="font-semibold">{element}</p>
                  <p className="text-base">{data?.more_details[element]}</p>
                </div>
              );
            })}
        </div>
      </div>

      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className="bg-green-300 w-fit px-2 rounded-full">10 Min</p>
        <h2 className="text-lg font-semibold lg:text-3xl">{data?.name}</h2>
        <p className="my-2">{data?.unit}</p>
        {/* <Divider/> */}
        <div>
          <p className="my-1">Price</p>
          <div className="flex items-center gap-2 lg:gap-4 my-1">
            <div className="border border-green-600 px-4 py-2 rounded bg-green-50 w-fit">
              <p className="font-semibold text-lg lg:text-xl">
                {data?.price * 110} BDT
              </p>
            </div>
            {data?.discount && (
              <p className="line-through">{data?.price * 110}BDT</p>
            )}
            {data?.discount && (
              <p className="font-bold text-green-600 lg:text-2xl">
                {data?.discount}%{" "}
                <span className="text-base text-neutral-500">Discount</span>
              </p>
            )}
          </div>
        </div>

        <h2 className="font-semibold">Why shop from binkeyit? </h2>

         <div className='flex  items-center gap-4 my-4'>
                      <img
                        src='/Best_Prices_Offers.png'
                        alt='Best prices offers'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Best Prices & Offers</div>
                        <p>Best price destination with offers directly from the nanufacturers.</p>
                      </div>
                  </div>
                  <div className='flex  items-center gap-4 my-4'>
                      <img
                        src='/minute_delivery.png'
                        alt='Wide Assortment'
                        className='w-20 h-20'
                      />
                      <div className='text-sm'>
                        <div className='font-semibold'>Wide Assortment</div>
                        <p>Choose from 5000+ products across food personal care, household & other categories.</p>
                      </div>
                  </div>

        {/* Packaging Type */}
        <div className="mt-4">
          <p className="font-semibold">Packaging Type:</p>
          <p>Pouch</p>
        </div>

        {/****only mobile */}
        <div className="my-4 grid gap-3 ">
          <div>
            <p className="font-semibold">Description</p>
            <p className="text-base">{data?.description}</p>
          </div>
          <div>
            {/* Seller Details */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Seller</h2>
            <p>SUPERWELL COMTRADE PRIVATE LIMITED</p>
            <p>FSSAI: 13323999000038</p>

            {/* Disclaimer */}
            <h2 className="text-xl font-semibold mt-6 mb-2">Disclaimer</h2>
            <p>
              Every effort is made to maintain accuracy of all information.
              However, actual product packaging and materials may contain more
              and/or different information. It is recommended not to solely rely
              on the information presented.
            </p>
            <div className="mt-4">
              <p className="font-semibold">Expiry Date:</p>
              <p>Refer to the product packaging for the expiry date.</p>
            </div>
            {/* Return Policy */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Return Policy</h2>
      <p>This item is non-returnable. For damaged, defective, incorrect, or expired items, request a replacement within 72 hours of delivery.</p>
      <p>Items must be <strong>sealed</strong>, <strong>unopened</strong>, and <strong>unused</strong> for return/replacement in case of incorrect delivery.</p>
          </div>

          {data?.more_details &&
            Object.keys(data?.more_details).map((element, index) => {
              return (
                <div>
                  <p className="font-semibold">{element}</p>
                  <p className="text-base">{data?.more_details[element]}</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;
