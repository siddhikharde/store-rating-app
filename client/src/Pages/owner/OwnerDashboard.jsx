import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import toast from "react-hot-toast";

function OwnerDashboard() {

  const [store, setStore] = useState(null);

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {

    try {

      const response = await api.get("/owner/dashboard");
      setStore(response.data);

    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Failed to fetch store data";
      toast.error(message);
    }

  };

  if (!store) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold text-[#232946] mb-8">
        Owner Dashboard
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Store Name
          </h2>

          <p className="text-2xl font-bold mt-2">
            {store.name}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Address
          </h2>

          <p className="text-2xl font-bold mt-2">
            {store.address}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Average Rating
          </h2>

          <p className="text-4xl font-bold mt-2">
            {Number(store.average_rating).toFixed(1)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-gray-500">
            Total Ratings
          </h2>

          <p className="text-4xl font-bold mt-2">
            {store.total_ratings}
          </p>
        </div>

      </div>

    </DashboardLayout>
  );
}

export default OwnerDashboard;