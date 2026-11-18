import { createContext, useContext, useState } from "react";

const PatientContext = createContext();

const initialPatients = [
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

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState(() => {
    const savedPatients = localStorage.getItem("patients");

    return savedPatients ? JSON.parse(savedPatients) : initialPatients;
  });

  function addPatient(patientData) {
    const newPatient = {
      id: `P${Date.now().toString().slice(-5)}`,
      ...patientData,
      status: "Active",
    };

    setPatients((previousPatients) => {
      const updatedPatients = [...previousPatients, newPatient];

      localStorage.setItem("patients", JSON.stringify(updatedPatients));

      return updatedPatients;
    });
  }

  function updatePatient(updatedPatient) {
    setPatients((previousPatients) => {
      const updatedPatients = previousPatients.map((patient) =>
        patient.id === updatedPatient.id ? updatedPatient : patient,
      );

      localStorage.setItem("patients", JSON.stringify(updatedPatients));

      return updatedPatients;
    });
  }

  function deletePatient(patientId) {
    setPatients((previousPatients) => {
      const updatedPatients = previousPatients.filter(
        (patient) => patient.id !== patientId,
      );

      localStorage.setItem("patients", JSON.stringify(updatedPatients));

      return updatedPatients;
    });
  }
  return (
    <PatientContext.Provider
      value={{ patients, addPatient, updatePatient, deletePatient }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  return useContext(PatientContext);
}
