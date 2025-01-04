import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg py-4 px-6">
      <div className="flex justify-between items-center">
        {/* Logo / App Name */}
        <div className="text-2xl font-bold tracking-wide">
          <a href="/" className="hover:text-gray-200">
            Todo Manager
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="text-lg font-medium hover:text-gray-200 transition duration-300"
          >
            Home
          </a>
          <span className="text-lg font-medium hidden sm:inline">
            {userInfo && userInfo.name}
          </span>
          <button
            onClick={logoutHandler}
            className="bg-red-600 hover:bg-red-700 text-sm font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
