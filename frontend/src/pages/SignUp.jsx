import { UserRound, Lock, User, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate, Link } from "react-router-dom";
const SignUp = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "aryanbaranwal",
    email: "aryan@gmail.com",
    password: "123123123",
  });
  const [isSigningUp, setIsSigningUp] = useState(false); // to show loading spinner

  const validateInputs = () => {
    const { username, email, password } = formData;
    if (!username) {
      return toast.error("Username is required");
    }
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
    // handling signup from backend
    if (success) {
      try {
        setIsSigningUp(true);
        const res = await axiosInstance.post("/auth/signup", formData);
        if (res.data.doesUserExist === true) {
          setIsSigningUp(false);
          return toast.error("Email already exists");
        }
        toast.success("Account created successfully");
        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      } catch (error) {
        console.log("error in useAuthStore.signup:", error);
        toast.error("An error occurred in signing up");
        setIsSigningUp(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        {/* title  */}
        <div className="flex flex-col items-center justify-center gap-1 mb-2">
          <UserRound className="size-14 text-primary" />
          <h1 className="text-3xl text-accent">Welcome To</h1>
          <h1 className="text-4xl text-secondary">One Piece Theories</h1>
        </div>

        {/* Input  */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center "
        >
          {/* username  */}
          <div className="mt-3 flex flex-col items-center justify-center gap-2">
            <div className="flex flex-row w-full gap-2 items-start">
              <User className="size-5 pt-[2px]" />
              <p>Username</p>
            </div>

            <label className="input input-bordered h-[50px] w-[400px] flex items-center gap-2 rounded-md">
              <input
                type="text"
                className="grow placeholder-gray-400 placeholder-opacity-40"
                placeholder="aryanbaranwal"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </label>
          </div>

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
          {isSigningUp ? (
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
          Already a user ?&nbsp;&nbsp; Click here to{" "}
          <Link className="text-primary underline italic" to={"/login"}>
            Log In
          </Link>
        </span>
      </div>
    </>
  );
};

export default SignUp;
