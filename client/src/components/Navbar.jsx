import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar({ setIsOpen }) {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  let title = "Dashboard";

  if (user?.role === "ADMIN") {
    title = "Admin Dashboard";
  } else if (user?.role === "OWNER") {
    title = "Owner Dashboard";
  } else {
    title = "User Dashboard";
  }

  return (
    <nav className="h-16 bg-white shadow px-6 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl cursor-pointer"
        >
          <FaBars />
        </button>

        <h2 className="text-2xl font-bold text-[#232946]">
          {title}
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <span className="hidden sm:block text-lg font-semibold">
          {user?.name}
        </span>

        <Button
          type="button"
          variant="secondary"
          className="w-auto"
          onClick={handleLogout}
        >
          Logout
        </Button>

      </div>

    </nav>
  );
}

export default Navbar;