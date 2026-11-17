
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/Statisticscards";

function Dashboard() {
  const stats = [
    {
      title: "Total Patients",
      value: "250",
      icon: "👥",
      color: "bg-blue-100",
    },
    {
      title: "Appointments",
      value: "18",
      icon: "📅",
      color: "bg-green-100",
    },
    {
      title: "Active Cases",
      value: "35",
      icon: "📋",
      color: "bg-purple-100",
    },
    {
      title: "Pending Cases",
      value: "12",
      icon: "⏳",
      color: "bg-orange-100",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Overview
          </h1>

          <p className="text-gray-500 mb-6">
            Here is what's happening in your hospital today.
          </p>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            {stats.map((item) => (
              <StatCard
                key={item.title}
                title={item.title}
                value={item.value}
                icon={item.icon}
                color={item.color}
              />
            ))}

          </div>

        </main>
      </div>
    </div>
  );
}

export default Dashboard;
