import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="h-16 bg-white shadow px-8 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-[#232946]">
        Admin Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <span className="font-semibold text-[#232946]">
          {user?.name}
        </span>

        <Button
          type="button"
          variant="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;