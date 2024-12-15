import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";
import useUser from "@/Hooks/useUser";

const Profile = () => {
  const loading = false;
  const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
  const [,userData] = useUser();
  

  return (
    <div className="p-4">
      {/**profile upload and display image */}
      <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
        {userData?.avatar ? (
          <img alt={userData?.name} src={userData?.avatar} className="w-full h-full" />
        ) : (
          <FaRegUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setProfileAvatarEdit(true)}
        className="text-sm min-w-20 border bg-slate-900 text-white hover:border-black hover:bg-slate-900 px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UpdateProfile close={() => setProfileAvatarEdit(false)} user={userData} />
      )}

      {/**name, mobile , email, change password */}
      <form className="my-4 grid gap-4">
        <div className="grid">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 w-96 outline-none border focus-within:border-black rounded"
            defaultValue={userData?.name}
            name="name"
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            defaultValue={userData?.email}
            placeholder="Enter your email"
            className="p-2 bg-blue-50 w-96 outline-none border focus-within:border-black rounded"
            name="email"
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile"
            className="p-2 bg-blue-50 w-96 outline-none border focus-within:border-black rounded"
            name="mobile"
            required
          />
        </div>

        <button className="border w-96 px-4 py-2 font-semibold bg-slate-900 hover:bg-slate-950 text-white rounded">
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
