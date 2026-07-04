import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-40 md:hidden ${isOpen ? "block" : "hidden"
          }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed md:static top-0 left-0 z-50 h-screen w-64 bg-[#232946] text-white p-6 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden mb-8 text-2xl"
        >
          <FaTimes />
        </button>

        <h1 className="text-3xl font-bold mb-10">
          Store Rating
        </h1>

        <ul className="space-y-6">
          <li>Dashboard</li>
          <Link to="/admin/users">
            <li className="flex items-center gap-3 hover:text-[#eebbc3]"> Users</li>
          </Link>
          <Link to="/admin/stores">
  Stores
</Link>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;