import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fc]">
      <Navbar setIsOpen={setIsOpen} />

      <div className="flex">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;