import { useGetSingleUserQuery } from "../app/feature/auth/authApi"; // Adjust as needed
import {  useSelector } from "react-redux";

const useUser = () => {
    const { user } = useSelector((state) => state.auth);
    
    const { data: userData , isLoading} = useGetSingleUserQuery(user?._id)
    
    
  
 
  return [user , userData , isLoading];
};

export default useUser;
