
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function IntakePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    phone: "",
    title: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check Authentication when page loads
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/");
      return;
    }

    setLoading(true);

    try {
      await apiRequest("/cases", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      setSuccess("Case created successfully!");

      setFormData({
        clientName: "",
        email: "",
        phone: "",
        title: "",
        description: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Prevent form from displaying before authentication check
  if (checkingAuth) {
    return <p className="p-8">Checking authentication...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Client Intake Form</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="clientName">Client Name</label>
            <input
              id="clientName"
              name="clientName"
              placeholder="Enter client name"
              value={formData.clientName}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Phone number must be exactly 10 digits"
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label htmlFor="title">Case Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              minLength={3}
              className="w-full border p-3 rounded"
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              minLength={10}
              rows="4"
              className="w-full border p-3 rounded"
            />
          </div>

          {error && (
            <p role="alert" className="text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-green-600">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Case"}
          </button>
        </form>
      </div>
    </div>
  );
}
