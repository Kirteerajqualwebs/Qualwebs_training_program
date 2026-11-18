import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import PatientList from "./pages/PatientList";
import PatientIntake from "./pages/PatientIntake";
import { PatientProvider } from "./context/PatientContext";
function App() {
  return (
    <PatientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/intake" element={<PatientIntake />} />
        </Routes>
      </BrowserRouter>
    </PatientProvider>
  );
}

export default App;
