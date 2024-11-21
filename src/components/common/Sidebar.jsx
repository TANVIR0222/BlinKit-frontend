import isAdmin from '@/utils/isAdmin';
import React from 'react';
import { GoLinkExternal } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

    return (
        <div>
            <h1 className="text-2xl font-semibold">My Account</h1>
          <h6 className=" flex items-center mt-2 gap-3">
            {user?.name}<p className=' font-semibold '>{user.role === "ADMIN"  && '(Admin)'}</p> {" "}
            <Link to={"profile"}>
              <GoLinkExternal className="text-blue-700 font-bold text-md" />
            </Link>{" "}
          </h6>
          <hr className="my-4" />

            {
              isAdmin(user.role) && (
                <>
                <Link to={'category'}><h3 className=" space-y-3 hover:bg-slate-400/5 p-2 rounded">Category</h3></Link>
                <Link to={'sub-category'}><h3 className=" space-y-3 hover:bg-slate-400/5 p-2 rounded">Sub Category</h3></Link>
                <Link to={'uploade-product'}><h3 className=" space-y-3 hover:bg-slate-400/5 p-2 rounded">Uploade Product </h3></Link>
                <Link to={'product'}><h3 className=" space-y-3 hover:bg-slate-400/5 p-2 rounded">product</h3></Link>
                </>
              )
            }

            <Link to={'order'}><h3 className=" space-y-3 hover:bg-slate-400/5 p-2 rounded">MY Order</h3></Link>
            <Link to={'address'}><h3 className="   hover:bg-slate-400/5 p-2 rounded">Save Address</h3></Link>
        </div>
    );
};

export default Sidebar;