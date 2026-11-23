
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();

  const [totalCases, setTotalCases] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Check Login and Fetch Cases
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

        setTotalCases(data.count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [router]);

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.replace("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="mt-10 text-xl font-semibold">
        Welcome to Case Management System!
      </h2>

      {/* Total Cases Card */}
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h3 className="text-lg font-semibold">Total Cases</h3>

        <p className="text-3xl font-bold text-blue-600 mt-2">
          {loading ? "Loading..." : totalCases}
        </p>

        {error && (
          <p role="alert" className="text-red-600 mt-2">
            {error}
          </p>
        )}
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <button
          onClick={() => router.push("/cases")}
          className="bg-white p-8 rounded-xl shadow text-left hover:bg-gray-50"
        >
          <h3 className="text-xl font-bold">View Cases</h3>
          <p className="text-gray-600 mt-2">
            View all existing cases.
          </p>
        </button>

        <button
          onClick={() => router.push("/intake")}
          className="bg-white p-8 rounded-xl shadow text-left hover:bg-gray-50"
        >
          <h3 className="text-xl font-bold">Create New Case</h3>
          <p className="text-gray-600 mt-2">
            Submit a new client intake form.
          </p>
        </button>
      </div>
    </div>
  );
}
