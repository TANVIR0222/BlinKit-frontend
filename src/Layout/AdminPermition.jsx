import useUser from "@/Hooks/useUser";
import isAdmin from "@/utils/isAdmin";
import { Navigate } from "react-router-dom";

const AdminPermition = ({children}) => {
    const [,userData] = useUser();

    return (
        <>
            {
                isAdmin(userData?.role) ? children : <Navigate to="/login" />
            }
        </>
    );
};

export default AdminPermition;