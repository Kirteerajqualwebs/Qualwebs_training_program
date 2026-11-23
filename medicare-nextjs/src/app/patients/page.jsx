
"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { usePatients } from "@/context/PatientContext";
import { useState } from "react";

export default function PatientList() {
  const { patients, updatePatient, deletePatient } = usePatients();
  const router = useRouter();

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

  function handleUpdate(e) {
    e.preventDefault();
    updatePatient(editingPatient);
    setEditingPatient(null);
  }

  function handleDelete(patient) {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${patient.name}?`
    );

    if (confirmDelete) {
      deletePatient(patient.id);
    }
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <main className="container-fluid p-4 p-lg-5">
          {/* Page Header */}
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
              <h1 className="h3 fw-bold text-dark">Patients</h1>
              <p className="text-secondary mb-0">
                Manage all registered patients.
              </p>
            </div>

            <button
              onClick={() => router.push("/intake")}
              className="btn btn-primary px-4 py-2"
            >
              + Add New Patient
            </button>
          </div>

          {/* Edit Patient Form */}
          {editingPatient && (
            <div className="card border shadow-sm mb-4">
              <div className="card-body p-4">
                <h2 className="h5 fw-bold mb-4">Edit Patient</h2>

                <form onSubmit={handleUpdate}>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        value={editingPatient.name}
                        onChange={(e) =>
                          setEditingPatient({
                            ...editingPatient,
                            name: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Patient Name"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <input
                        type="number"
                        value={editingPatient.age}
                        onChange={(e) =>
                          setEditingPatient({
                            ...editingPatient,
                            age: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Age"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <input
                        type="text"
                        value={editingPatient.contact}
                        onChange={(e) =>
                          setEditingPatient({
                            ...editingPatient,
                            contact: e.target.value,
                          })
                        }
                        className="form-control"
                        placeholder="Contact"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label fw-medium">
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
                        className="form-select"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="col-12 d-flex gap-2">
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingPatient(null)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Patients Table */}
          <div className="card border shadow-sm">
            <div className="card-body p-4">
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search patients..."
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-md-4 ms-md-auto">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="form-select"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <p className="small text-secondary mb-3">
                Showing {filteredPatients.length} of {patients.length} patients
              </p>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th className="p-3">Patient ID</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Age</th>
                      <th className="p-3">Gender</th>
                      <th className="p-3">Contact</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredPatients.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-5 text-secondary"
                        >
                          No patients found.
                        </td>
                      </tr>
                    ) : (
                      filteredPatients.map((patient) => (
                        <tr key={patient.id}>
                          <td className="p-3">{patient.id}</td>
                          <td className="p-3 fw-semibold">{patient.name}</td>
                          <td className="p-3">{patient.age}</td>
                          <td className="p-3">{patient.gender}</td>
                          <td className="p-3">{patient.contact}</td>

                          <td className="p-3">
                            <span
                              className={`badge rounded-pill ${
                                patient.status === "Active"
                                  ? "bg-success-subtle text-success"
                                  : patient.status === "Pending"
                                  ? "bg-warning-subtle text-warning-emphasis"
                                  : "bg-primary-subtle text-primary"
                              }`}
                            >
                              {patient.status}
                            </span>
                          </td>

                          <td className="p-3">
                            <button
                              onClick={() =>
                                setEditingPatient({ ...patient })
                              }
                              className="btn btn-link text-primary text-decoration-none p-0 me-3"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(patient)}
                              className="btn btn-link text-danger text-decoration-none p-0"
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
          </div>
        </main>
      </div>
    </div>
  );
}
