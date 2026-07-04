import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

      setIsOpen(false);
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

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">

        <h1 className="text-3xl font-bold text-[#232946]">
          Users
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

          <div className="w-full sm:w-80">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto"
          >
            Add User
          </Button>

        </div>

      </div>

      <Modal
        title="Add User"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <Input
            name="name"
            placeholder="Full Name"
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
            className="w-full h-12 px-4 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#eebbc3]"
          >
            <option value="USER">User</option>
            <option value="OWNER">Owner</option>
            <option value="ADMIN">Admin</option>
          </select>

          <Button
            type="submit"
            className="w-full"
          >
            Save User
          </Button>

        </form>

      </Modal>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-[900px] w-full">

          <thead className="bg-[#232946] text-white">

            <tr>
              <th className="p-4 text-left whitespace-nowrap">Id</th>
              <th className="p-4 text-left whitespace-nowrap">Name</th>
              <th className="p-4 text-left whitespace-nowrap">Email</th>
              <th className="p-4 text-left whitespace-nowrap">Address</th>
              <th className="p-4 text-left whitespace-nowrap">Role</th>
            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 whitespace-nowrap">
                  {user.id}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {user.name}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {user.email}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {user.address}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {user.role}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Users;