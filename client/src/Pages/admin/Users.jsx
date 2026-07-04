import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Input from "../../components/Input";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to fetch users"
      );
    }
  };


  const handleSearch = async (e) => {
  const value = e.target.value;

  setSearch(value);

  try {
    const response = await api.get(
      `/admin/users/search?search=${value}`
    );

    setUsers(response.data);
  } catch (error) {
    toast.error("Search Failed");
  }
};
  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

  <h1 className="text-3xl font-bold text-[#232946]">
    Users
  </h1>

  <div className="w-full md:w-80">
    <Input
      type="text"
      placeholder="Search users..."
      value={search}
      onChange={handleSearch}
    />
  </div>

</div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        
        <table className="w-full">

          <thead className="bg-[#232946] text-white">

            <tr>
              <th className="p-4 text-left">Id</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Role</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-4">{user.id}</td>
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.address}</td>
                <td className="p-4">{user.role}</td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>
    </DashboardLayout>
  );
}

export default Users;