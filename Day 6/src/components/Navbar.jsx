function Navbar() {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Welcome back! Here's your overview.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Notification */}
        <button className="text-xl">🔔</button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
            JD
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">John Doe</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
