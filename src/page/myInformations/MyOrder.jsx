import { useOrderDetailsQuery } from "@/app/feature/order/OrderApi";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import useUser from "@/Hooks/useUser";
import { DisplayPriceInBDT } from "@/utils/DisplayPriceInBDT";
import { Helmet } from "react-helmet";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const MyOrder = () => {
  const [user] = useUser();

  const { data: order  , isLoading} = useOrderDetailsQuery(user?._id);
//   console.log(order);

const totalPrice = order?.data?.reduce((sum, item) => sum + item.totalAmt,0);
 console.log(totalPrice);
 

//   const or = 0;

  return isLoading ? <LoadingSpinner /> : (
    <div className="grid grid-cols-1 md:flex">
      <Helmet>
        <title>Oder Page || Blinkeyit</title>
      </Helmet>
      {order?.data.length > 0  && (
        <>
          <div className="w-full md:w-3/4">
            <h1 className="text-4xl md:text-6xl p-[18px] font-semibold ">
              Order
            </h1>
            <hr />
            <div className=" p-4">
              <div className="flex items-center gap-4 my-6 ">
                <TiTick className="text-4xl md:text-6xl  bg-green-600 text-white rounded-full" />
                <div className="flex-col  space-y-1 items-center">
                  <h4 className="text-xl font-medium md:font-semibold">
                    Your order is successfully placed
                  </h4>
                  <p className="from-neutral-400 text-sm text-[#737373]">
                    Thank you for purchasing our products!
                  </p>
                </div>
              </div>

              {order &&
                order?.data?.map((item, index) => (
                  <div key={index} className=" space-y-2  text-start p-4">
                    <h2 className="from-neutral-400 font-semibold">
                      Customer information
                    </h2>
                    <h5 className="text-[#737373] font-light">
                      Full name :{" "}
                      <span className="text-green-700  text-[14px]">
                        {item?.userId?.name}
                      </span>
                    </h5>
                    <h5 className="text-[#737373] font-light">
                      Phone :{" "}
                      <span className="text-green-700 text-[14px]">
                        {item?.userId?.number}
                      </span>
                    </h5>
                    <h5 className="text-[#737373] font-light">
                      Email :{" "}
                      <span className="text-green-700 text-[14px]">
                        {item?.userId?.email}
                      </span>{" "}
                    </h5>
                    <h5 className="text-[#737373] font-light">
                      Payment method :{" "}
                      <span className="text-green-700 text-[14px]">
                        {item?.payment_status}
                      </span>
                    </h5>
                    {/* <h5 className="text-[#737373] font-light">Payment status : <span className="text-green-700 text-[14px]">Md Tanvir</span></h5> */}
                    <h5 className="text-[#737373] font-light">
                      Order Date :{" "}
                      <span className="text-green-700 text-[14px]">
                        {" "}
                        {new Date(item?.createdAt).toLocaleString()}
                      </span>
                    </h5>
                  </div>
                ))}

              <Link to={"/"}>
                <button className="bg-green-600 px-3 py-2 rounded text-white font-semibold my-8">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          <div className="p-6 w-full md:w-1/4 bg-gray-200 h-fit md:mt-8 mt-2">
            <h6>Order number: {order?.data?.length}</h6>
            <div className="border-t border-black my-4"></div>
            <div className=" space-y-2 my-6">
              <div className="flex items-center justify-between">
                <p className="">Subtotal:</p>
                <p className="">00</p>
              </div>
              <div className="flex items-center justify-between">
                <p>Tax : </p>
                <p>00 </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Dedelivery chargesli : </p>
                <p>00 </p>
              </div>
            </div>
            <div className="border-t border-black my-4"></div>
            <div className="flex items-center justify-between">
              <p>Total</p>
              <p>{DisplayPriceInBDT(totalPrice)} </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrder;
