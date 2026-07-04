import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Button from "../../components/Button";

function UserDashboard() {

  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchStores();
  }, []);

  const fetchStores = async () => {

    try {

      const response = await api.get("/stores");

      setStores(response.data);

    } catch {

      toast.error("Failed");

    }

  };

  const giveRating = async (storeId, rating) => {

    try {

      await api.post("/ratings", {
        user_id: 1,
        store_id: storeId,
        rating
      });

      toast.success("Rating Submitted");

      fetchStores();

    } catch {

      toast.error("Failed");

    }

  };

  return (

    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6 text-[#232946]">
        Stores
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        {stores.map(store => (

          <div
            key={store.id}
            className="bg-white rounded-xl shadow p-6"
          >

            <h2 className="text-2xl font-bold">
              {store.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {store.address}
            </p>

            <p className="mt-3">
              Average Rating :
              <span className="font-bold ml-2">
                {Number(store.average_rating).toFixed(1)}
              </span>
            </p>

            <div className="flex gap-2 mt-5">

              {[1,2,3,4,5].map(num => (

                <Button
                  key={num}
                  type="button"
                  onClick={() =>
                    giveRating(store.id, num)
                  }
                >
                  {num}
                </Button>

              ))}

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>

  );

}

export default UserDashboard;