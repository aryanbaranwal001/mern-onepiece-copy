import { CircleUserRound, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-base-100 flex mt-2 px-4 justify-between border-box ">
        <div className="flex flex-row gap-6">
          <img
            src="/luffy.png"
            className="rounded-full size-16"
            alt="onepieceimg"
          />
          <div className="flex-1 flex  justify-start items-center">
            <a className=" text-[26px] text-primary">One Piece Theories</a>
          </div>
        </div>

        <div className="dropdown dropdown-end pr-9">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box shadow absolute right-0 w-28 mt-2 z-50 translate-x-[-30px]"
          >
            <li className="text-secondar ">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="text-primary" />
                <p className="text-[18px] text-primary mb-1">Logout</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
