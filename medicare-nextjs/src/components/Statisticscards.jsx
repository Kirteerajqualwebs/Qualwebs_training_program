
export default function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="card border shadow-sm h-100">
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between">
          <p className="small text-secondary fw-medium mb-0">
            {title}
          </p>

          <div
            className={`${color} rounded d-flex align-items-center justify-content-center`}
            style={{ width: "44px", height: "44px" }}
          >
            <Icon size={23} strokeWidth={2} className="text-dark" />
          </div>
        </div>

        <h2 className="h3 fw-bold text-dark mt-4 mb-2">
          {value}
        </h2>

        <p className="small text-success mb-0">
          Patient statistics
        </p>
      </div>
    </div>
  );
}
