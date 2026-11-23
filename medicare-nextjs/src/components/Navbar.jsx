
"use client";

import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/patients": "Patients",
    "/intake": "Patient Intake",
  };

  const title = pageTitles[pathname] || "MediCare";

  return (
    <header className="bg-white border-bottom px-4 py-3 d-flex align-items-center justify-content-between">
      <div>
        <h2 className="h5 fw-bold text-dark mb-1">{title}</h2>
        <p className="small text-secondary mb-0">
          Welcome back! Here's your overview.
        </p>
      </div>

      <div className="d-flex align-items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          style={{ maxWidth: "180px" }}
        />

        <button className="btn btn-light fs-5" type="button">
          🔔
        </button>

        <div className="d-flex align-items-center gap-2">
          <div className="rounded-circle bg-primary-subtle text-primary fw-bold d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}>
            KJ
          </div>

          <div>
            <p className="small fw-semibold text-dark mb-0">
              Kirteeraj Jhala
            </p>
            <p className="small text-secondary mb-0">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
