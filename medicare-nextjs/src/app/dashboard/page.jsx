
"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/Statisticscards";
import { usePatients } from "@/context/PatientContext";
import { Users, ClipboardList, Clock } from "lucide-react";

export default function Dashboard() {
  const { patients } = usePatients();

  const totalPatients = patients.length;

  const activePatients = patients.filter(
    (patient) => patient.status === "Active"
  ).length;

  const pendingPatients = patients.filter(
    (patient) => patient.status === "Pending"
  ).length;

  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: Users,
      color: "bg-primary-subtle",
    },
    {
      title: "Active Cases",
      value: activePatients,
      icon: ClipboardList,
      color: "bg-info-subtle",
    },
    {
      title: "Pending Cases",
      value: pendingPatients,
      icon: Clock,
      color: "bg-warning-subtle",
    },
  ];

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <main className="container-fluid p-4 p-lg-5">
          <h1 className="h3 fw-bold text-dark mb-2">
            Overview
          </h1>

          <p className="text-secondary mb-4">
            Here is what's happening in your hospital today.
          </p>

          {/* Statistics Cards */}
          <div className="row g-4">
            {stats.map((item) => (
              <div className="col-12 col-sm-6 col-lg-4" key={item.title}>
                <StatCard
                  title={item.title}
                  value={item.value}
                  icon={item.icon}
                  color={item.color}
                />
              </div>
            ))}
          </div>

          {/* Recent Patients */}
          <div className="card border shadow-sm mt-4">
            <div className="card-body p-4">
              <h2 className="h5 fw-semibold mb-4">
                Recent Patients
              </h2>

              {patients.length === 0 ? (
                <p className="text-secondary small mb-0">
                  No patients registered yet.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table align-middle mb-0">
                    <thead>
                      <tr className="text-secondary small">
                        <th>Patient ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>
                      {[...patients]
                        .slice(-5)
                        .reverse()
                        .map((patient) => (
                          <tr key={patient.id}>
                            <td>{patient.id}</td>

                            <td className="fw-semibold text-dark">
                              {patient.name}
                            </td>

                            <td>{patient.age}</td>

                            <td>
                              <span className="badge rounded-pill bg-primary-subtle text-primary">
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
          </div>
        </main>
      </div>
    </div>
  );
}
