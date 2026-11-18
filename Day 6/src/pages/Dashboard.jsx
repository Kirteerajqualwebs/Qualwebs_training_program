import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/Statisticscards";
import { usePatients } from "../context/PatientContext";
import { Users, ClipboardList, Clock } from "lucide-react";

function Dashboard() {
  const { patients } = usePatients();

  const totalPatients = patients.length;

  const activePatients = patients.filter(
    (patient) => patient.status === "Active",
  ).length;

  const pendingPatients = patients.filter(
    (patient) => patient.status === "Pending",
  ).length;

  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: Users,
      color: "bg-blue-100",
    },

    {
      title: "Active Cases",
      value: activePatients,
      icon: ClipboardList,
      color: "bg-purple-100",
    },
    {
      title: "Pending Cases",
      value: pendingPatients,
      icon: Clock,
      color: "bg-orange-100",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Overview</h1>

          <p className="text-gray-500 mb-6">
            Here is what's happening in your hospital today.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Recent Patients */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm mt-8 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-5">
              Recent Patients
            </h2>

            {patients.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No patients registered yet.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b text-sm text-gray-500">
                      <th className="py-3">Patient ID</th>
                      <th className="py-3">Name</th>
                      <th className="py-3">Age</th>
                      <th className="py-3">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {[...patients]
                      .slice(-5)
                      .reverse()
                      .map((patient) => (
                        <tr
                          key={patient.id}
                          className="border-b last:border-0 text-sm"
                        >
                          <td className="py-4">{patient.id}</td>
                          <td className="py-4 font-medium text-slate-700">
                            {patient.name}
                          </td>
                          <td className="py-4">{patient.age}</td>
                          <td className="py-4">
                            <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                              {patient.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
