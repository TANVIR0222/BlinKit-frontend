import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TiArrowSortedDown } from "react-icons/ti";
import { GoLinkExternal } from "react-icons/go";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserLogoutMutation } from "@/app/feature/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "@/app/feature/auth/authSlice";
import Swal from "sweetalert2";
import useUser from "@/Hooks/useUser";
const UserMenu = () => {
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const [userLogout] = useUserLogoutMutation();
  const dispatch = useDispatch();

  const [,userData] = useUser()

  const Logout = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You are sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log out!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await userLogout().unwrap();
          dispatch(logout());
          if (res.success) {
            Swal.fire({
              title: "Log Out!",
              text: "You have been logged out successfully",
              icon: "success",
            });
          }
          navigate('/')
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p>
          <TiArrowSortedDown size={23} />
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-xl">My Account </DropdownMenuLabel>
        <DropdownMenuLabel className=" flex items-center font-bold gap-3">
          {userData?.name} {userData?.role === "ADMIN"  && '(Admin)'}{" "}
          <Link to={'dashboard/profile'}>
            <GoLinkExternal  className="text-blue-700 font-bold text-md" />
          </Link>{" "}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-2 bg-secondary" />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <Link to={'dashboard/order'}>
            {" "}
            <DropdownMenuRadioItem value="Orders">
              My Orders
            </DropdownMenuRadioItem>
          </Link>
          <Link to={'dashboard/address'}>
            {" "}
            <DropdownMenuRadioItem value="Address">
              Save Address
            </DropdownMenuRadioItem>
          </Link>
          <DropdownMenuRadioItem onClick={Logout} value="Logout">
            Log Out
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
