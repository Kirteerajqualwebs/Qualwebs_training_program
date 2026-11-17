
function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 font-medium">
          {title}
        </p>

        <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-xl ${color}`}>
          {icon}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800 mt-4">
        {value}
      </h2>

      <p className="text-xs text-green-600 mt-2">
        +12% from last month
      </p>

    </div>
  );
}

export default StatCard;
