
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: "▦", name: "Dashboard", path: "/dashboard" },
    { icon: "♙", name: "Patients", path: "/patients" },
    { icon: "＋", name: "Patient Intake", path: "/intake" },
  ];

  return (
    <aside
      className="bg-dark text-white p-4 min-vh-100"
      style={{ width: "250px", flexShrink: 0 }}
    >
      <h1 className="h4 fw-bold mb-5">MediCare</h1>

      <p className="small text-secondary text-uppercase mb-3">
        Main Menu
      </p>

      <nav className="d-flex flex-column gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`text-decoration-none d-flex align-items-center gap-3 px-3 py-3 rounded ${
                isActive
                  ? "bg-primary text-white"
                  : "text-light"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
