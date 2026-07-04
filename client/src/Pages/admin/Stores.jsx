import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/Modal";

function Stores() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: ""
  });

  useEffect(() => {
    fetchStores();
  }, []);

 const fetchStores = async () => {
  try {
    const response = await api.get("/admin/stores");

    console.log(response.data);

    setStores(response.data);

  } catch (error) {
    console.log(error);
    toast.error("Failed to fetch stores");
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
        "/admin/stores",
        form
      );

      toast.success(response.data.message);

      fetchStores();

      setForm({
        name: "",
        email: "",
        address: "",
        owner_id: ""
      });

      setIsOpen(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to add store"
      );
    }
  };

  const handleSearch = async (e) => {
    const value = e.target.value;

    setSearch(value);

    try {
      const response = await api.get(
        `/admin/stores/search?search=${value}`
      );

      setStores(response.data);

    } catch (error) {
      toast.error("Search Failed");
    }
  };

  return (
    <DashboardLayout>

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">

        <h1 className="text-3xl font-bold text-[#232946]">
          Stores
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

          <div className="w-full sm:w-80">
            <Input
              placeholder="Search stores..."
              value={search}
              onChange={handleSearch}
            />
          </div>

          <Button
            type="button"
            onClick={() => setIsOpen(true)}
            className="w-full sm:w-auto"
          >
            Add Store
          </Button>

        </div>

      </div>

      <Modal
        title="Add Store"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <Input
            name="name"
            placeholder="Store Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            type="email"
            name="email"
            placeholder="Store Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <Input
            type="number"
            name="owner_id"
            placeholder="Owner Id"
            value={form.owner_id}
            onChange={handleChange}
          />

          <Button type="submit">
            Save Store
          </Button>

        </form>

      </Modal>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-[900px] w-full">

          <thead className="bg-[#232946] text-white">

            <tr>
              <th className="p-4 text-left whitespace-nowrap">
                Id
              </th>

              <th className="p-4 text-left whitespace-nowrap">
                Store Name
              </th>

              <th className="p-4 text-left whitespace-nowrap">
                Email
              </th>

              <th className="p-4 text-left whitespace-nowrap">
                Address
              </th>

              <th className="p-4 text-left whitespace-nowrap">
                Owner
              </th>
            </tr>

          </thead>

          <tbody>

            {stores.map((store) => (

              <tr
                key={store.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 whitespace-nowrap">
                  {store.id}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {store.name}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {store.email}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {store.address}
                </td>

                <td className="p-4 whitespace-nowrap">
                  {store.owner_name}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default Stores;