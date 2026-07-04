import { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../api/axios";
import toast from "react-hot-toast";
import Button from "../../components/Button";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("ASC");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef();

  useEffect(() => {
    fetchStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStores = async (opts = {}) => {
    setIsLoading(true);
    try {
      const params = {
        search: opts.search ?? search,
        sort: opts.sort ?? sort,
        order: opts.order ?? order,
        page: opts.page ?? page,
        limit,
      };

      const response = await api.get("/stores", { params });
      setStores(response.data);
    } catch (err) {
      console.error(err?.response || err);
      toast.error("Failed to fetch stores");
    } finally {
      setIsLoading(false);
    }
  };

  const giveRating = async (storeId, rating) => {
    try {
      await api.post("/ratings", { store_id: storeId, rating });
      toast.success("Rating Submitted");
      fetchStores();
    } catch (error) {
      console.log(error?.response || error);
      toast.error(error.response?.data?.message || error.message || "Failed to submit rating");
    }
  };

  // Debounced search
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchStores({ page: 1, search });
    }, 400);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, order]);

  const handlePrev = () => {
    if (page <= 1) return;
    const next = page - 1;
    setPage(next);
    fetchStores({ page: next });
  };

  const handleNext = () => {
    if (stores.length < limit) return;
    const next = page + 1;
    setPage(next);
    fetchStores({ page: next });
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-[#232946]">Stores</h1>

        <div className="flex gap-2 items-center">
          <input
            className="p-2 border rounded"
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)} className="p-2 border rounded">
            <option value="">Sort</option>
            <option value="name">Name</option>
            <option value="address">Address</option>
            <option value="rating">Rating</option>
          </select>

          <select value={order} onChange={(e) => setOrder(e.target.value)} className="p-2 border rounded">
            <option value="ASC">Asc</option>
            <option value="DESC">Desc</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {stores.map((store) => (
              <div key={store.id} className="bg-white rounded-xl shadow p-6">
                <h2 className="text-2xl font-bold">{store.name}</h2>

                <p className="text-gray-500 mt-2">{store.address}</p>
                <p className="mt-2">Your Rating : {store.user_rating ?? "Not Rated"}</p>

                <p className="mt-3">
                  Average Rating :
                  <span className="font-bold ml-2">{Number(store.average_rating || 0).toFixed(1)}</span>
                </p>

                <div className="flex gap-2 mt-5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <Button
                      key={num}
                      type="button"
                      onClick={() => giveRating(store.id, num)}
                      className={store.user_rating === num ? "bg-blue-600 text-white" : ""}
                    >
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button onClick={handlePrev} className="px-4 py-2 bg-gray-200 rounded" disabled={page <= 1}>
              Previous
            </button>
            <span>Page {page}</span>
            <button onClick={handleNext} className="px-4 py-2 bg-gray-200 rounded" disabled={stores.length < limit}>
              Next
            </button>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default UserDashboard;
