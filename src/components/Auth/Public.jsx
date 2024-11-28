import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";

const Public = ({ children}) => {
  const {user} = useUserAuth();
    return user ?  <Navigate to="../home"/> : children ;
};

export default Public;
