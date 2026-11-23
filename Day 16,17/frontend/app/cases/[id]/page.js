
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function CaseDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch Single Case
  useEffect(() => {
    const fetchCase = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      try {
        const data = await apiRequest(`/cases/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCaseData(data.case);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCase();
  }, [id, router]);

  // Update Case Status
  const handleStatusUpdate = async (newStatus) => {
    const token = sessionStorage.getItem("token");

    setUpdating(true);
    setError("");
    setSuccess("");

    try {
      const data = await apiRequest(`/cases/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      setCaseData(data.case);
      setSuccess("Case status updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p className="p-8">Loading case...</p>;
  }

  if (error && !caseData) {
    return (
      <p role="alert" className="p-8 text-red-600">
        {error}
      </p>
    );
  }

  if (!caseData) {
    return <p className="p-8">Case not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => router.push("/cases")}
        className="mb-6 text-blue-600"
      >
        ← Back to Cases
      </button>

      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4">
          {caseData.title}
        </h1>

        <p>
          <strong>Client:</strong> {caseData.clientName}
        </p>

        <p>
          <strong>Email:</strong> {caseData.email}
        </p>

        <p>
          <strong>Phone:</strong> {caseData.phone}
        </p>

        {/* Case Status Dropdown */}
        <div className="mt-4">
          <label htmlFor="status" className="font-semibold">
            Case Status:
          </label>

          <select
            id="status"
            value={caseData.status}
            disabled={updating}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="ml-3 border p-2 rounded"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          {updating && (
            <p className="text-blue-600 mt-2">
              Updating status...
            </p>
          )}
        </div>

        {error && (
          <p role="alert" className="text-red-600 mt-3">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="text-green-600 mt-3">
            {success}
          </p>
        )}

        <p className="mt-4">
          <strong>Description:</strong> {caseData.description}
        </p>
      </div>
    </div>
  );
}
