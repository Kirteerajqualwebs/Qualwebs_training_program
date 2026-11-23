
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import { PatientProvider } from "@/context/PatientContext";

export const metadata = {
  title: "MediCare",
  description: "MediCare Patient Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PatientProvider>
          {children}
        </PatientProvider>
      </body>
    </html>
  );
}
