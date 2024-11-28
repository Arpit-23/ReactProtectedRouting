import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../context/userAuthContext";

const Protected = ({ children}) => {
    const {user} = useUserAuth();
    return user ? children : <Navigate to="../login"/>
};

export default Protected;
