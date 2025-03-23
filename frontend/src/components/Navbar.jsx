import { CircleUserRound, LogOut } from "lucide-react";
import { axiosInstance } from "../lib/axios";
const Navbar = () => {
  const handleLogout = async () => {
    try {
      axiosInstance.get("/auth/logout")    
    } catch (error) {
      console.log("error in handleLogout", error);
    }
  }
  
  return (
    <>
      <div className="navbar bg-base-100 flex justify-between mt-2 mx-10">
        <div className="flex flex-row gap-6">
          <img
            src="/luffy.png"
            className="rounded-full size-16"
            alt="onepieceimg"
          />
          <div className="flex-1">
            <a className=" text-[26px] text-primary">One Piece Theories</a>
          </div>
        </div>

        <div className="flex-none gap-2 mr-20">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <CircleUserRound className="size-full text-accent" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] w-20 shadow"
            >
              <li className="text-secondary text-2xl">
                <a onClick={handleLogout}>
                  <LogOut className=" text-primary" />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
