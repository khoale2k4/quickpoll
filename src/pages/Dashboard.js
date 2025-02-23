import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import ActivityChart from "../components/ActivityChart";
import ProductsChart from "../components/ProductsChart";
import ProfileModal from "../components/ProfileModal"; // ✅ Import the modal
import Transactions from "../components/Transactions";

const Dashboard = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <StatsCard title="Total Revenues" value="$2,129,430" change="+2.5%" />
          <StatsCard title="Total Transactions" value="1,520" change="+1.7%" />
          <StatsCard title="Total Likes" value="9,721" change="+1.4%" />
          <StatsCard title="Total Users" value="9,721" change="+4.2%" />
        </div>
        

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <ActivityChart />
          <ProductsChart />
        </div>
        <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <Transactions />
    </div>

        {/* Profile Section */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-gray-200 px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-300"
            onClick={() => setProfileModalOpen(true)}
          >
            Add Profile
          </button>
        </div>

        {/* Profile Modal */}
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} />
      </div>
    </div>
  );
};

export default Dashboard;
