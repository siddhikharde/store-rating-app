import Navbar from "../../components/Navbar";

function UserDashboard() {
  const stores = [
    {
      name:"ABC Store",
      address:"Pune",
      rating:4
    },
    {
      name:"XYZ Store",
      address:"Mumbai",
      rating:5
    }
  ];

  return (
    <div className="min-h-screen bg-[#b8c1ec]">

      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold text-[#232946]">
          Stores
        </h1>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          {stores.map((store,index)=>(
            <div
              key={index}
              className="bg-[#fffffe] p-5 rounded-xl"
            >

              <h2 className="text-xl font-bold">
                {store.name}
              </h2>

              <p>
                {store.address}
              </p>

              <p>
                ⭐ {store.rating}
              </p>

              <button className="mt-3 bg-[#eebbc3] px-4 py-2 rounded">
                Rate
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;