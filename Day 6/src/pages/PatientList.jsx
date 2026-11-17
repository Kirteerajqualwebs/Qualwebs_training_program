
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function PatientList() {
  const patients = [
    {
      id: "P001",
      name: "Rahul Sharma",
      age: 28,
      gender: "Male",
      contact: "9876543210",
      status: "Active",
    },
    {
      id: "P002",
      name: "Priya Verma",
      age: 32,
      gender: "Female",
      contact: "9876543211",
      status: "Pending",
    },
    {
      id: "P003",
      name: "Amit Patel",
      age: 45,
      gender: "Male",
      contact: "9876543212",
      status: "Active",
    },
    {
      id: "P004",
      name: "Neha Singh",
      age: 24,
      gender: "Female",
      contact: "9876543213",
      status: "Completed",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Patients
              </h1>
              <p className="text-gray-500 mt-1">
                Manage all registered patients.
              </p>
            </div>

            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
              + Add New Patient
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between mb-6">
              <input
                type="text"
                placeholder="Search patients..."
                className="border border-gray-200 rounded-lg px-4 py-2 w-72"
              />

              <select className="border border-gray-200 rounded-lg px-4 py-2">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm">
                    <th className="p-4">Patient ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Age</th>
                    <th className="p-4">Gender</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id} className="border-t">
                      <td className="p-4">{patient.id}</td>
                      <td className="p-4 font-medium">
                        {patient.name}
                      </td>
                      <td className="p-4">{patient.age}</td>
                      <td className="p-4">{patient.gender}</td>
                      <td className="p-4">{patient.contact}</td>
                      <td className="p-4">
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                          {patient.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PatientList;
