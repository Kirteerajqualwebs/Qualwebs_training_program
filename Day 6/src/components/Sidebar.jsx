
function Sidebar() {
  const menuItems = [
    { icon: "▦", name: "Dashboard" },
    { icon: "♙", name: "Patients" },
    { icon: "＋", name: "Patient Intake" },
    { icon: "▣", name: "Appointments" },
    { icon: "⚙", name: "Settings" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        MediCare
      </h1>

      <p className="text-xs uppercase text-slate-400 mb-4">
        Main Menu
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              item.name === "Dashboard"
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
