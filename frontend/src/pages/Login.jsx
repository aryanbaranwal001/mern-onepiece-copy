import { UserRound, Lock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuth.js";




const Login = () => {
  
  



  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "aryan@gmail.com",
    password: "123123123",
  });
  const [isLogginIn, setIsLogginIn] = useState(false); // to show loading spinner
  const { login } = useAuthStore();

  const validateInputs = () => {
    const { email, password } = formData;
    if (!email) {
      return toast.error("Email is required");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Email format is wrong");
    }
    if (!password) {
      return toast.error("Password is required");
    }
    if (password.length < 8) {
      return toast.error("Password should be atleast 8 characters long");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateInputs();
    if (success) {
      setIsLogginIn(true);
      const successOfLogin = await login(formData);
      if (successOfLogin) {
        toast.success("Logged In Successfully");
        setTimeout(() => {
          Navigate("/top");
        }, 1000);
      } else {
        setIsLogginIn(false);
        return toast.error("Login failed");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        {/* title  */}
        <div className="flex flex-col items-center justify-center gap-1 mb-2">
          <UserRound className="size-14 text-primary" />
          <h1 className="text-3xl text-accent">Login To</h1>
          <h1 className="text-4xl text-secondary">One Piece Theories</h1>
        </div>

        {/* Input  */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center "
        >
          {/* email  */}
          <div className="mt-3 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-row w-full gap-2 items-start">
              <Mail className="size-5 pt-[2px]" />
              <p>Email</p>
            </div>

            <label className="input input-bordered h-[50px] w-[400px] flex items-center gap-2 rounded-md">
              <input
                type="text"
                className="grow placeholder-gray-400 placeholder-opacity-40"
                placeholder="aryan@gmail.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </label>
          </div>

          {/* password */}
          <div className="mt-3 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-row w-full gap-2 items-start">
              <Lock className="size-5 pt-[2px]" />
              <p>Password</p>
            </div>

            <label className="input input-bordered h-[50px] w-[400px] flex items-center gap-2 rounded-md">
              <input
                type="password"
                className="grow placeholder-gray-400 placeholder-opacity-40"
                placeholder="*********"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </label>
          </div>

          {/* submit */}
          {isLogginIn ? (
            <div className="flex items-center justify-center mt-6">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <button className="btn btn-accent mt-6 w-full font-normal text-[25px] rounded-md">
              Submit
            </button>
          )}
        </form>

        {/* login Link */}
        <span className=" text-[16px] text-secondary">
          New user ?&nbsp;&nbsp; Click here to{" "}
          <Link className="text-primary underline italic" to={"/signup"}>
            Sign Up
          </Link>
        </span>
      </div>
    </>
  );
};

export default Login;
