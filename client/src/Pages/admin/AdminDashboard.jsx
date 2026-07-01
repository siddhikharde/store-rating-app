import Navbar from "../../components/Navbar";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#b8c1ec]">

      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold text-[#232946]">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="bg-white p-6 rounded-xl">
            <h2 className="font-bold text-[#232946]">Users</h2>
            <p className="text-4xl">
              120
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h2 className="font-bold text-[#232946]">Stores</h2>
            <p className="text-4xl">
              40
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl">
            <h2 className="font-bold text-[#232946]">Ratings</h2>
            <p className="text-4xl">
              500
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;