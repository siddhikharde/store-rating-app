import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8f9fc]">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 p-8">
          {children}
        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;