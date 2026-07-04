import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import toast from "react-hot-toast";

function OwnerDashboard() {

  const [store, setStore] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStore();
  }, []);

  const fetchStore = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await api.get("/owner/dashboard");
      setStore(response.data);
    } catch (error) {
      const status = error?.response?.status;
      const serverMessage = error?.response?.data?.message;

      if (status === 404 && serverMessage === "No store found for this owner") {
        setErrorMessage(
          "No store is currently assigned to your account. Please contact the admin to create or assign a store."
        );
      } else {
        const message = serverMessage || error.message || "Unable to load your dashboard.";
        setErrorMessage(message);
        toast.error(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    );
  }

  if (errorMessage) {
    return (
      <DashboardLayout>
        <div className="rounded-xl bg-white p-8 shadow">
          <h1 className="text-3xl font-bold text-[#232946] mb-4">Owner Dashboard</h1>
          <p className="text-gray-600">{errorMessage}</p>
        </div>
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