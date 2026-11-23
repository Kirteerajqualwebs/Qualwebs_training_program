
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PatientContext = createContext(null);

const initialPatients = [
  // {
  //   id: "P001",
  //   name: "Rahul Sharma",
  //   age: 28,
  //   gender: "Male",
  //   contact: "9876543210",
  //   status: "Active",
  // },
  // {
  //   id: "P002",
  //   name: "Priya Verma",
  //   age: 32,
  //   gender: "Female",
  //   contact: "9876543211",
  //   status: "Pending",
  // },
  // {
  //   id: "P003",
  //   name: "Amit Patel",
  //   age: 45,
  //   gender: "Male",
  //   contact: "9876543212",
  //   status: "Active",
  // },
  // {
  //   id: "P004",
  //   name: "Neha Singh",
  //   age: 24,
  //   gender: "Female",
  //   contact: "9876543213",
  //   status: "Completed",
  // },
];

export function PatientProvider({ children }) {
  const [patients, setPatients] = useState(initialPatients);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load patients from localStorage
  useEffect(() => {
    try {
      const savedPatients = localStorage.getItem("patients");

      if (savedPatients) {
        setPatients(JSON.parse(savedPatients));
      }
    } catch (error) {
      console.error("Unable to load patients:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save patients whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("patients", JSON.stringify(patients));
    }
  }, [patients, isLoaded]);

  function addPatient(patientData) {
    const newPatient = {
      id: `P${Date.now().toString().slice(-5)}`,
      ...patientData,
      status: "Active",
    };

    setPatients((previousPatients) => [
      ...previousPatients,
      newPatient,
    ]);
  }

  function updatePatient(updatedPatient) {
    setPatients((previousPatients) =>
      previousPatients.map((patient) =>
        patient.id === updatedPatient.id
          ? updatedPatient
          : patient
      )
    );
  }

  function deletePatient(patientId) {
    setPatients((previousPatients) =>
      previousPatients.filter(
        (patient) => patient.id !== patientId
      )
    );
  }

  return (
    <PatientContext.Provider
      value={{
        patients,
        addPatient,
        updatePatient,
        deletePatient,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientContext);

  if (!context) {
    throw new Error(
      "usePatients must be used inside PatientProvider"
    );
  }

  return context;
}
