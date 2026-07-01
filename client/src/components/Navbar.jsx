import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#232946] text-white px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        Store Rating
      </h1>

      <div className="flex gap-5">
        <Link to="/user">
          Stores
        </Link>

        <Link to="/admin">
          Admin
        </Link>

        <Link to="/owner">
          Owner
        </Link>

        <button className="bg-[#eebbc3] text-[#232946] px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;