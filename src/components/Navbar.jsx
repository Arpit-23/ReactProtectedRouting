import { CgLogOut } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/userAuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logOut, user } = useUserAuth();
  const  handleLogout = async() => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div className="flex flex-col mb-6">
      <div className=" flex flex-row bg-blue-500 justify-between pt-3 pb-2 pl-5 pr-16 h-20 text-white">
        <p className="text-white font-semibold text-4xl ml-2">CIARO</p>

       { user &&
        <>
        <div className="flex flex-row  gap-5 text-xl h-11 pt-1">
            <Link to="/home">Home</Link>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact us</Link>
          </div>
          <button
            className=" border-zinc-50 border-2 pl-3 pr-3 h-11 text-center rounded-md bg-blue-500 flex gap-2 items-center"
            onClick={handleLogout}
          >
            <CgLogOut fontSize={25} />
            Logout
          </button>
        </>
       }
    
        {!user &&
          <div className="text-xl flex gap-9">
            <button
              className=" border-zinc-50 border-2 pl-3 pr-3 h-11 text-center rounded-md bg-blue-500"
              onClick={() => navigate("login")}
            >
              Login
            </button>
            <button
              className=" border-zinc-50 border-2 pl-3 pr-3 h-11 text-center rounded-md bg-blue-500"
              onClick={() => navigate("signup")}
            >
              signup
            </button>
          </div>
        }
        
      </div>
    </div>
  );
}

export default Navbar;
