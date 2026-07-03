import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/DashboardCard";
import api from "../../api/axios";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      setStats(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to load dashboard"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#232946]">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome to the Store Rating System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Users"
          value={stats.totalUsers}
        />

        <DashboardCard
          title="Total Stores"
          value={stats.totalStores}
        />

        <DashboardCard
          title="Total Ratings"
          value={stats.totalRatings}
        />
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;