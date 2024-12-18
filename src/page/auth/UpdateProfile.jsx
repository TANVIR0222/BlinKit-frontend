import { useUserImageUpdateMutation } from "@/app/feature/auth/authApi";
import { FaRegUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const UpdateProfile = ({ close , user}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [userImageUpdate, { isLoading: loading }] = useUserImageUpdateMutation();

  const handleUploadAvatarImage = async (e) => {
    const id = user?._id;

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await userImageUpdate({ id, formData }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
        <button
          onClick={close}
          className="text-neutral-800 w-fit block ml-auto"
        >
          <IoClose size={20} />
        </button>
        <div className="w-20 h-20 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm">
          {user ? (
            <img alt={user?.name} src={user?.avatar} className="w-full h-full" />
          ) : (
            <FaRegUserCircle size={65} />
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="uploadProfile">
            <div className="border border-primary-200 cursor-pointer hover:bg-primary-200 px-4 py-1 rounded text-sm my-3">
              {loading ? "Loading..." : "Upload"}
            </div>
            <input
              onChange={handleUploadAvatarImage}
              type="file"
              id="uploadProfile"
              className="hidden"
            />
          </label>
        </form>
      </div>
    </section>
  );
};

export default UpdateProfile;
