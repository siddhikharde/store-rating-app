function Sidebar() {
  return (
    <aside className="w-64 bg-[#232946] text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        Store Rating
      </h1>

      <ul className="space-y-6">

        <li className="hover:text-[#eebbc3] cursor-pointer font-medium">
          Dashboard
        </li>

        <li className="hover:text-[#eebbc3] cursor-pointer font-medium">
          Users
        </li>

        <li className="hover:text-[#eebbc3] cursor-pointer font-medium">
          Stores
        </li>

      </ul>

    </aside>
  );
}

export default Sidebar;