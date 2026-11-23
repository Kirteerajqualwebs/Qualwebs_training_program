
"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { usePatients } from "@/context/PatientContext";

export default function PatientIntake() {
  const { addPatient } = usePatients();
  const router = useRouter();

  const initialFormData = {
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    bloodGroup: "",
    address: "",
    symptoms: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.age ||
      !formData.gender ||
      !formData.contact.trim()
    ) {
      setMessage("Please fill all required fields.");
      setMessageType("error");
      return;
    }

    if (Number(formData.age) < 1 || Number(formData.age) > 120) {
      setMessage("Please enter a valid age between 1 and 120.");
      setMessageType("error");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.contact)) {
      setMessage("Contact number must contain exactly 10 digits.");
      setMessageType("error");
      return;
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    addPatient(formData);
    router.push("/patients");
  }

  function handleReset() {
    setFormData(initialFormData);
    setMessage("");
    setMessageType("");
  }

  return (
    <div className="d-flex min-vh-100 bg-light">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <main className="container-fluid p-4 p-lg-5">
          <div className="mb-4">
            <h1 className="h3 fw-bold text-dark">
              Patient Intake
            </h1>
            <p className="text-secondary mb-0">
              Register a new patient.
            </p>
          </div>

          <div className="card border shadow-sm">
            <div className="card-body p-4 p-lg-5">
              <h2 className="h5 fw-semibold mb-4">
                Patient Information
              </h2>

              <form onSubmit={handleSubmit} onReset={handleReset}>
                <div className="row g-4">

                  {/* Patient Name */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">
                      Patient Name *
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter patient name"
                      className="form-control"
                    />
                  </div>

                  {/* Age */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">
                      Age *
                    </label>
                    <input
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      type="number"
                      min="1"
                      max="120"
                      placeholder="Enter age"
                      className="form-control"
                    />
                  </div>

                  {/* Gender */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Contact */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">
                      Contact Number *
                    </label>
                    <input
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      type="tel"
                      maxLength="10"
                      placeholder="Enter contact number"
                      className="form-control"
                    />
                  </div>

                  {/* Email */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">
                      Email
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Enter email"
                      className="form-control"
                    />
                  </div>

                  {/* Blood Group */}
                  <div className="col-12 col-md-6">
                    <label className="form-label fw-medium">
                      Blood Group
                    </label>
                    <select
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>

                  {/* Address */}
                  <div className="col-12">
                    <label className="form-label fw-medium">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter patient address"
                      className="form-control"
                    />
                  </div>

                  {/* Symptoms */}
                  <div className="col-12">
                    <label className="form-label fw-medium">
                      Symptoms
                    </label>
                    <textarea
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter symptoms"
                      className="form-control"
                    />
                  </div>

                  {/* Message */}
                  {message && (
                    <div className="col-12">
                      <div
                        className={`alert ${
                          messageType === "success"
                            ? "alert-success"
                            : "alert-danger"
                        } mb-0`}
                      >
                        {message}
                      </div>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="col-12 d-flex justify-content-end gap-3">
                    <button
                      type="reset"
                      className="btn btn-outline-secondary px-4"
                    >
                      Reset
                    </button>

                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                    >
                      Register Patient
                    </button>
                  </div>

                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
