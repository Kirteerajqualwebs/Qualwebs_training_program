"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function CasesPage() {
  const router = useRouter();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCases = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      try {
        const data = await apiRequest("/cases", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCases(data.cases);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [router]);

  if (loading) {
    return <p className="p-8">Loading cases...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">All Cases</h1>

      {error && (
        <p role="alert" className="text-red-600">
          {error}
        </p>
      )}

      {cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <div className="space-y-4">
          {cases.map((item) => (
            <div key={item._id} className="bg-white p-5 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{item.title}</h2>

              <p>Client: {item.clientName}</p>
              <p>Email: {item.email}</p>
              <p>Status: {item.status}</p>
              <button
                onClick={() => router.push(`/cases/${item._id}`)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
