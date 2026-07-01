import Navbar from "../../components/Navbar";

function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-[#b8c1ec]">

      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold text-[#232946]">
          Owner Dashboard
        </h1>

        <div className="bg-white p-6 rounded-xl mt-6">

          <h2 className="text-xl font-bold">
            Average Rating
          </h2>

          <p className="text-5xl text-[#eebbc3] pt-5">
            ⭐ 4.5
          </p>

        </div>

      </div>

    </div>
  );
}

export default OwnerDashboard;