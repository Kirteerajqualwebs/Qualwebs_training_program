import { useEffect, useState } from "react";

const Dashboard = () => {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Backend connection failed"));
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Backend Response:</h2>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
