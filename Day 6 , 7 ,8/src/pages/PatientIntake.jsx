import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { usePatients } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";
function PatientIntake() {
  const { addPatient } = usePatients();
  const navigate = useNavigate();
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

  // Update form fields
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setMessage("");
  }

  // Form validation
  function handleSubmit(e) {
    e.preventDefault();

    // 1. Required fields validation
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

    // 2. Age validation
    if (Number(formData.age) < 1 || Number(formData.age) > 120) {
      setMessage("Please enter a valid age between 1 and 120.");
      setMessageType("error");
      return;
    }

    // 3. Contact validation
    if (!/^[0-9]{10}$/.test(formData.contact)) {
      setMessage("Contact number must contain exactly 10 digits.");
      setMessageType("error");
      return;
    }

    // 4. Email validation (optional field)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    // 5. Add patient to shared context
    addPatient(formData);

    // 6. Navigate to Patient List
    navigate("/patients");
  }

  function handleReset() {
    setFormData(initialFormData);
    setMessage("");
    setMessageType("");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-800">
              Patient Intake
            </h1>
            <p className="text-gray-500 mt-1">Register a new patient.</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-lg font-semibold mb-6">Patient Information</h2>

            <form
              onSubmit={handleSubmit}
              onReset={handleReset}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Patient Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter patient name"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium mb-2">Age *</label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Enter age"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Number *
                </label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  type="tel"
                  maxLength="10"
                  placeholder="Enter contact number"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Blood Group */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter patient address"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Symptoms */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Symptoms
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter symptoms"
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`md:col-span-2 p-3 rounded-lg text-sm ${
                    messageType === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Buttons */}
              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="reset" className="px-5 py-3 border rounded-lg">
                  Reset
                </button>

                <button
                  type="submit"
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PatientIntake;
