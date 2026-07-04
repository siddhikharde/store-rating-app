import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Button from "./Button";
import { useState, useEffect } from "react";

function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer" title="Store Rating App">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="7" width="20" height="12" rx="2" fill="#eebbc3" />
        <circle cx="8" cy="13" r="2" fill="#232946" />
        <path d="M14 9h4" stroke="#232946" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div>
        <div className="text-xl font-bold text-[#232946]">Store Rating</div>
        <div className="text-xs text-gray-500">Reviews & Ratings</div>
      </div>
    </div>
  );
}

function Navbar({ setIsOpen }) {

  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") document.documentElement.classList.add("dark"); else document.documentElement.classList.remove("dark");
  }, [theme]);

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
          onClick={() => setIsOpen && setIsOpen(true)}
          className="md:hidden text-2xl cursor-pointer"
        >
          <FaBars />
        </button>

        <Link to="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        <h2 className="text-2xl font-bold text-[#232946] ml-4 hidden sm:block">
          {title}
        </h2>

      </div>

      <div className="flex items-center gap-4">

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-3 py-2 border rounded text-sm"
          title="Toggle theme"
        >
          {theme === "light" ? "🌤" : "🌙"}
        </button>

        <span className="hidden sm:block text-sm font-semibold">
          {user?.name}
        </span>

        <Button
          type="button"
          variant="outline"
          className="w-auto"
          onClick={() => navigate("/change-password")}
        >
          Change Password
        </Button>

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