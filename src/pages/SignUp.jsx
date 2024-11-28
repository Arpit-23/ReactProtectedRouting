import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { regex } from "../constants/regex";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useUserAuth } from "../context/userAuthContext";


const SignUp = () => {
  const navigate = useNavigate();
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const {signUp} = useUserAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    contactNumber: "",
    address: "",
    gender: "",
  });

  const [emptyCheck, setEmptyCheck] = useState({
    name: false,
    email: false,
    password: false,
    repassword: false,
    contactNumber: false,
    address: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
    contactNumber: "",
    address: "",
    gender: "off",
  });

  const validateName = (id, name) => {
    let result = name.trimStart();
    let valuee = result.replace(/\s+/g, " ");

    setFormData({ ...formData, [id]: valuee });

    if (name.length == 0) {
      setEmptyCheck((prev) => ({ ...prev, name: false }));
      return "";
    } else if (regex.name.test(valuee)) {
      setEmptyCheck((prev) => ({ ...prev, name: true }));
      return "";
    } else {
      setEmptyCheck((prev) => ({ ...prev, name: false }));
      return "*Enter valid name";
    }
  };

  const validateEmail = (id, email) => {
    let k = email.trim();
    setFormData({ ...formData, [id]: k });

    if (k.length == 0) {
      setEmptyCheck((prev) => ({ ...prev, email: false }));
      return "";
    }

    if (regex.email.test(k)) {
      setEmptyCheck((prev) => ({ ...prev, email: true }));
      return "";
    } else {
      setEmptyCheck((prev) => ({ ...prev, email: false }));
      return "*Enter valid email";
    }
  };

  const [passError, setPassError] = useState([]);

  const validatePassword = (id, password) => {
    if (password.length == 0) {
      setEmptyCheck((prev) => ({ ...prev, password: false }));
    } else {
      setEmptyCheck((prev) => ({ ...prev, password: true }));
    }
    while (passError.length != 0) {
      passError.pop();
    }

    setPassError(passError);
    let pass = password.trim();
    setFormData((prev) => ({ ...prev, password: pass }));
    if(pass.length!=0){
    if(pass.length<8)
      passError.push("Password must contain at least 8 charactor")
    if(pass.length>15)
      passError.push("Password can contain at most 15 charactor")
    if (!regex.uppercase.test(pass))
      passError.push("Password must contain at least one uppercase letter");
    if (!regex.lowercasse.test(pass))
      passError.push("Password must contain at least one lowercase letter");
    if (!regex.number.test(password))
      passError.push("Password must contain at least one number");
    if (!regex.specialSymbol.test(pass))
      passError.push("Password must contain at least one special character");
  }
    setPassError(passError);
    let j = validateRepassword(formData.repassword, pass);
    setErrors((prevState) => ({ ...prevState, repassword: j }));
    return "";
  };

  const validateRepassword = (repassword, password) => {
    if (repassword.length == 0) {
      setEmptyCheck((prev) => ({ ...prev, repassword: false }));
      return "";
    } else if (password != repassword) {
      setEmptyCheck((prev) => ({ ...prev, repassword: true }));
      return "*Repassword not match";
    } else {
      setEmptyCheck((prev) => ({ ...prev, repassword: true }));
      return "";
    }
  };

  const validateContactNumber = (id, contactNumber) => {
    const numericValue = contactNumber.replace(/[^0-9]/g, "");

    setFormData((prev) => ({ ...prev, contactNumber: numericValue }));
    if (numericValue.length == 0) {
      setEmptyCheck((prev) => ({ ...prev, contactNumber: false }));
      return "";
    } else if (regex.contactNumber.test(numericValue)) {
      setEmptyCheck((prev) => ({ ...prev, contactNumber: true }));
      return "";
    } else {
      setEmptyCheck((prev) => ({ ...prev, contactNumber: true }));
      return "*Contact number must be exactly 10 digits";
    }
  };

  const validateAddress = (id, address) => {
    const result = address.replace(/ +/g, " ");
    setFormData((prev) => ({ ...prev, address: result }));
    if (result.length == 0) {
      setEmptyCheck((prev) => ({ ...prev, address: false }));
      return "";
    } else if (regex.address.test(result)) {
      setEmptyCheck((prev) => ({ ...prev, address: true }));
      return "";
    } else {
      setEmptyCheck((prev) => ({ ...prev, address: true }));
      return "*Enter valid email";
    }
  };

  const validateGender = (gender) => {
    return "";
  };

  const handleInputChange = (e) => {
    const { id, value, type } = e.target;
    if (type != "radio") {
      setFormData((prev) => ({ ...prev, [id]: value }));
    } else {
      setFormData((prev) => ({ ...prev, gender: value }));
      setErrors((prevState) => ({ ...prevState, gender: "" }));
      return;
    }

    let errorMsg = "";
    switch (id) {
      case "name":
        errorMsg = validateName(id, value);
        break;
      case "email":
        errorMsg = validateEmail(id, value);
        break;
      case "password":
        errorMsg = validatePassword(id, value);
        break;
      case "repassword":
        errorMsg = validateRepassword(value, formData.password);
        break;
      case "contactNumber":
        errorMsg = validateContactNumber(id, value);
        break;
      case "address":
        errorMsg = validateAddress(id, value);
        break;
      default:
        break;
    }

    setErrors((prevState) => ({ ...prevState, [id]: errorMsg }));
  };

  const handleSubmit = async (data) => {
    data.preventDefault();
    try {
      await signUp(formData);
      navigate("../login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <div className=" h-full flex flex-col items-center  w-screen mt-12" >
      <form
        onSubmit={handleSubmit}
        className=" h-auto flex flex-col items-center mt-8 w-[35rem] gap-5 border-2 border-blue-500 rounded-md p-6 shadow-blue-200 shadow-2xl"
      >
        <h2 className=" text-2xl font-semibold text-blue-500">Registration Form</h2>
        <div className=" flex flex-col w-full">
            <label htmlFor="name" className="">Name:</label>
            <input
              className=" border-2 border-solid border-blue-500 rounded-md "
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>

        <div className="flex flex-col w-full">
            <label htmlFor="email" className="">Email:</label>
            <input
             className=" border-2 border-solid border-black rounded-md "
              type="email"
              id="email"
              value={formData.email}
              onInput={handleInputChange}
            />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="flex flex-col w-full">
            <label htmlFor="password" className="">Password:</label>
            <div className="relative">
            <input
             className=" border-2 border-solid border-black rounded-md w-full"
              type={toggle1?"text":"password"}
              id="password"
              value={formData.password}
              onInput={handleInputChange}
            />{
              toggle1?
               <LuEye size={23} className=" absolute right-3 top-1 " onClick={()=>setToggle1((prev) =>!prev)}/>
              :<LuEyeOff size={23} className=" absolute right-3 top-1 "  onClick={()=>setToggle1((prev) =>!prev)}/>
            }
            </div>
          {passError.length != 0 &&
            passError.map((e, i) => (
              <div className="error" key={i}>
                {e}
              </div>
            ))}
        </div>

        <div className="flex flex-col w-full">
            <label htmlFor="repassword">Confirm Password:</label>
            <div className="relative">
            <input
             className="w-full border-2 border-solid border-black rounded-md"
              type={toggle2?"text":"password"}
              id="repassword"
              value={formData.repassword}
              onInput={handleInputChange}
            />
            {
              toggle2?
              <LuEye size={23} className=" absolute right-3 top-1 "  onClick={()=>setToggle2((prev) =>!prev)}/>
            :<LuEyeOff size={23} className=" absolute right-3 top-1 " onClick={()=>setToggle2((prev) =>!prev)}/>
            }
            </div>
          {errors.repassword && (
            <div className="error">{errors.repassword}</div>
          )}
        </div>

        <div className="flex flex-col w-full">
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
             className=" border-2 border-solid border-black rounded-md"
              type="text"
              id="contactNumber"
              value={formData.contactNumber}
              onInput={handleInputChange}
            />
          {errors.contactNumber && (
            <div className="error">{errors.contactNumber}</div>
          )}
        </div>

        <div className="flex flex-col w-full">
            <label htmlFor="address">Address:</label>
            <textarea
             className=" border-2 border-solid border-black rounded-md max-h-20"
              id="address"
              value={formData.address}
              onInput={handleInputChange}
            />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>

        <div className=" flex flex-col w-full gap-3">
          <label>Gender:</label>
          <div className="flex gap-2">
          <div>
            <input
              name="gender"
              type="radio"
              id="gender1"
              value="Male"
              onChange={handleInputChange}
            />
            <label htmlFor="gender">Male</label>
          </div>
          <div>
            <input
              name="gender"
              type="radio"
              id="gender2"
              value="Female"
              onChange={handleInputChange}
            />
            <label htmlFor="gender">Female</label>
          </div>
          </div>
        </div>

        <button
        className={`bg-blue-400 w-full p-2 rounded-lg text-white ${(passError.length != 0 ||
            Object.values(errors).some((error) => error !== "") ||
            Object.values(emptyCheck).some((error) => error !== true))?"bg-blue-200":"bg-blue-400 cursor-pointer"}`} 
          type="submit"
          disabled={
            passError.length != 0 ||
            Object.values(errors).some((error) => error !== "") ||
            Object.values(emptyCheck).some((error) => error !== true)
          }
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
