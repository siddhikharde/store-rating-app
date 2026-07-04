import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import Button from "../../components/Button";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  address: "",
  role: "USER"
});


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

  const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post(
      "/admin/users",
      form
    );

    toast.success(response.data.message);

    fetchUsers();

    setForm({
      name: "",
      email: "",
      password: "",
      address: "",
      role: "USER"
    });

  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to add user"
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

<form
  onSubmit={handleSubmit}
  className="bg-white p-6 rounded-xl shadow mb-8"
>

  <div className="grid grid-cols-2 gap-4">

    <Input
      name="name"
      placeholder="Name"
      value={form.name}
      onChange={handleChange}
    />

    <Input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
    />

    <Input
      type="password"
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
    />

    <Input
      name="address"
      placeholder="Address"
      value={form.address}
      onChange={handleChange}
    />

    <select
      name="role"
      value={form.role}
      onChange={handleChange}
      className="border rounded-lg px-4 py-3"
    >
      <option value="USER">User</option>
      <option value="OWNER">Owner</option>
      <option value="ADMIN">Admin</option>
    </select>

  </div>

  <div className="mt-6">

    <Button type="submit">
      Add User
    </Button>

  </div>

</form>

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