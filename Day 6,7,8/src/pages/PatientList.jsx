import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../context/PatientContext";
import { useState } from "react";
function PatientList() {
  const { patients, updatePatient, deletePatient } = usePatients();
  let navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [searchTerm, setSearchTerm] = useState("");

  const [editingPatient, setEditingPatient] = useState(null);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || patient.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });
  // const patients = [
  //   {
  //     id: "P001",
  //     name: "Rahul Sharma",
  //     age: 28,
  //     gender: "Male",
  //     contact: "9876543210",
  //     status: "Active",
  //   },
  //   {
  //     id: "P002",
  //     name: "Priya Verma",
  //     age: 32,
  //     gender: "Female",
  //     contact: "9876543211",
  //     status: "Pending",
  //   },
  //   {
  //     id: "P003",
  //     name: "Amit Patel",
  //     age: 45,
  //     gender: "Male",
  //     contact: "9876543212",
  //     status: "Active",
  //   },
  //   {
  //     id: "P004",
  //     name: "Neha Singh",
  //     age: 24,
  //     gender: "Female",
  //     contact: "9876543213",
  //     status: "Completed",
  //   },
  // ];

  // return (
  //   <div className="flex min-h-screen bg-gray-100">
  //     <Sidebar />

  //     <div className="flex-1">
  //       <Navbar />

  //       <main className="p-8">
  //         <div className="flex justify-between items-center mb-6">
  //           <div>
  //             <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
  //             <p className="text-gray-500 mt-1">
  //               Manage all registered patients.
  //             </p>
  //           </div>

  //           <button
  //             onClick={() => navigate("/intake")}
  //             className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
  //           >
  //             + Add New Patient
  //           </button>
  //         </div>

  //         <div className="bg-white rounded-xl border border-gray-200 p-6">
  //           <div className="flex justify-between mb-6">
  //             <input
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //               type="text"
  //               placeholder="Search patients..."
  //               className="border border-gray-200 rounded-lg px-4 py-2 w-72"
  //             />

  //             <select
  //               value={selectedStatus}
  //               onChange={(e) => setSelectedStatus(e.target.value)}
  //               className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
  //             >
  //               <option value="All">All Status</option>
  //               <option value="Active">Active</option>
  //               <option value="Pending">Pending</option>
  //               <option value="Completed">Completed</option>
  //             </select>
  //           </div>

  //           <p className="text-sm text-gray-500 mb-4">
  //             Showing {filteredPatients.length} of {patients.length} patients
  //           </p>

  //           <div className="overflow-x-auto">
  //             <table className="w-full text-left">
  //               <thead>
  //                 <tr className="bg-gray-50 text-gray-500 text-sm">
  //                   <th className="p-4">Patient ID</th>
  //                   <th className="p-4">Name</th>
  //                   <th className="p-4">Age</th>
  //                   <th className="p-4">Gender</th>
  //                   <th className="p-4">Contact</th>
  //                   <th className="p-4">Status</th>
  //                   <th className="px-6 py-4 text-left">Actions</th>
  //                 </tr>
  //               </thead>

  //               <tbody>
  //                 {filteredPatients.length === 0 ? (
  //                   <tr>
  //                     <td
  //                       colSpan="6"
  //                       className="text-center py-8 text-gray-500"
  //                     >
  //                       No patients found.
  //                     </td>
  //                   </tr>
  //                 ) : (
  //                   filteredPatients.map((patient) => (
  //                     <tr key={patient.id} className="border-t">
  //                       <td className="p-4">{patient.id}</td>
  //                       <td className="p-4 font-medium">{patient.name}</td>
  //                       <td className="p-4">{patient.age}</td>
  //                       <td className="p-4">{patient.gender}</td>
  //                       <td className="p-4">{patient.contact}</td>
  //                       <td className="p-4">
  //                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
  //                           {patient.status}
  //                         </span>
  //                       </td>

  //                       <td className="px-6 py-4">
  //                         <button
  //                           onClick={() => setEditingPatient(patient)}
  //                           className="text-blue-600 hover:text-blue-800 font-medium"
  //                         >
  //                           Edit
  //                         </button>
  //                       </td>
  //                     </tr>
  //                   ))
  //                 )}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </main>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Patients</h1>
              <p className="text-gray-500 mt-1">
                Manage all registered patients.
              </p>
            </div>

            <button
              onClick={() => navigate("/intake")}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              + Add New Patient
            </button>
          </div>

          {/* Edit Patient Form */}
          {editingPatient && (
            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
              <h2 className="text-xl font-bold mb-5">Edit Patient</h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updatePatient(editingPatient);
                  setEditingPatient(null);
                }}
                className="grid grid-cols-2 gap-4"
              >
                <input
                  type="text"
                  value={editingPatient.name}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      name: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                  placeholder="Patient Name"
                />

                <input
                  type="number"
                  value={editingPatient.age}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      age: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                  placeholder="Age"
                />

                <input
                  type="text"
                  value={editingPatient.contact}
                  onChange={(e) =>
                    setEditingPatient({
                      ...editingPatient,
                      contact: e.target.value,
                    })
                  }
                  className="border p-3 rounded-lg"
                  placeholder="Contact"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Status
                  </label>

                  <select
                    value={editingPatient.status}
                    onChange={(e) =>
                      setEditingPatient({
                        ...editingPatient,
                        status: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg p-2"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="col-span-2 flex gap-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingPatient(null)}
                    className="bg-gray-200 px-5 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex justify-between mb-6">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search patients..."
                className="border border-gray-200 rounded-lg px-4 py-2 w-72"
              />

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Showing {filteredPatients.length} of {patients.length} patients
            </p>

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
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-8 text-gray-500"
                      >
                        No patients found.
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((patient) => (
                      <tr key={patient.id} className="border-t">
                        <td className="p-4">{patient.id}</td>
                        <td className="p-4 font-medium">{patient.name}</td>
                        <td className="p-4">{patient.age}</td>
                        <td className="p-4">{patient.gender}</td>
                        <td className="p-4">{patient.contact}</td>
                        <td className="p-4">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                            {patient.status}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <button
                            onClick={() => setEditingPatient({ ...patient })}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              const confirmDelete = window.confirm(
                                `Are you sure you want to delete ${patient.name}?`,
                              );

                              if (confirmDelete) {
                                deletePatient(patient.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-800 font-medium ml-4"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
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
