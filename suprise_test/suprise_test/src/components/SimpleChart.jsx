import '../styles/Chart.css';

export default function SimpleChart({ stats }) {
  const total = stats.totalComplaints || 1;
  const pendingPercent = ((stats.pendingComplaints / total) * 100).toFixed(1);
  const inProgressPercent = ((stats.inProgressComplaints / total) * 100).toFixed(1);
  const resolvedPercent = ((stats.resolvedComplaints / total) * 100).toFixed(1);

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <h4>Status Distribution</h4>
        <div className="bar-chart">
          <div className="bar-item">
            <div className="bar-label">Pending</div>
            <div className="bar-container">
              <div
                className="bar pending"
                style={{ width: `${pendingPercent}%` }}
              >
                {pendingPercent}%
              </div>
            </div>
            <div className="bar-count">{stats.pendingComplaints}</div>
          </div>

          <div className="bar-item">
            <div className="bar-label">In Progress</div>
            <div className="bar-container">
              <div
                className="bar inprogress"
                style={{ width: `${inProgressPercent}%` }}
              >
                {inProgressPercent}%
              </div>
            </div>
            <div className="bar-count">{stats.inProgressComplaints}</div>
          </div>

          <div className="bar-item">
            <div className="bar-label">Resolved</div>
            <div className="bar-container">
              <div
                className="bar resolved"
                style={{ width: `${resolvedPercent}%` }}
              >
                {resolvedPercent}%
              </div>
            </div>
            <div className="bar-count">{stats.resolvedComplaints}</div>
          </div>
        </div>
      </div>

      <div className="pie-chart-wrapper">
        <h4>Overview</h4>
        <svg viewBox="0 0 100 100" className="pie-chart">
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#f39c12"
            strokeWidth="15"
            strokeDasharray={`${pendingPercent * 2.51} ${251}`}
            transform="rotate(-90 50 50)"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#3498db"
            strokeWidth="15"
            strokeDasharray={`${inProgressPercent * 2.51} ${251}`}
            strokeDashoffset={`${-pendingPercent * 2.51}`}
            transform="rotate(-90 50 50)"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#27ae60"
            strokeWidth="15"
            strokeDasharray={`${resolvedPercent * 2.51} ${251}`}
            strokeDashoffset={`${-(pendingPercent * 2.51 + inProgressPercent * 2.51)}`}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="legend">
          <div className="legend-item">
            <span className="legend-color pending"></span>
            <span>Pending</span>
          </div>
          <div className="legend-item">
            <span className="legend-color inprogress"></span>
            <span>In Progress</span>
          </div>
          <div className="legend-item">
            <span className="legend-color resolved"></span>
            <span>Resolved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
