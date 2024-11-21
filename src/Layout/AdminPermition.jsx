import isAdmin from "@/utils/isAdmin";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPermition = ({children}) => {
    const {user} = useSelector((state) => state.auth);
    return (
        <>
            {
                isAdmin(user.role) ? children : <Navigate to="/login" />
            }
        </>
    );
};

export default AdminPermition;