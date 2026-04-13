import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import "../styles/ViewerDashboard.css";

function ViewerDashboard({ userData }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToast } = useToast();

  const API = "http://localhost:8080/api";

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const fetchAllComplaints = async () => {
    try {
      const res = await axios.get(`${API}/complaints`);
      setComplaints(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      let errorMessage = err.response?.data?.message || err.message || "Error fetching complaints";
      if (err.response?.status === 500) {
        errorMessage = "Server error. Please refresh the page.";
      }
      addToast(errorMessage, "error");
      setComplaints([]); // Set empty array on error
      setLoading(false);
    }
  };

  const getFilteredComplaints = () => {
    return complaints.filter((c) => {
      const matchesStatus = filterStatus === "All" || c.status === filterStatus;
      const matchesSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.user?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  };

  const getStats = () => {
    return {
      total: complaints.length,
      pending: complaints.filter((c) => c.status === "Pending").length,
      inProgress: complaints.filter((c) => c.status === "In Progress").length,
      resolved: complaints.filter((c) => c.status === "Resolved").length,
    };
  };

  const stats = getStats();
  const filtered = getFilteredComplaints();

  return (
    <div className="viewer-dashboard">
      {/* STATS */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card pending">
          <span className="stat-value">{stats.pending}</span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-card inprogress">
          <span className="stat-value">{stats.inProgress}</span>
          <span className="stat-label">In Progress</span>
        </div>
        <div className="stat-card resolved">
          <span className="stat-value">{stats.resolved}</span>
          <span className="stat-label">Resolved</span>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="🔍 Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Filter by Status:</label>
          <div className="filter-buttons">
            {["All", "Pending", "In Progress", "Resolved"].map((status) => (
              <button
                key={status}
                className={`filter-btn ${filterStatus === status ? "active" : ""}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* COMPLAINTS */}
      <div className="complaints-section">
        <h3>📋 All Complaints ({filtered.length})</h3>

        {loading ? (
          <p className="loading">Loading complaints...</p>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>No complaints found.</p>
          </div>
        ) : (
          <div className="complaints-table-wrapper">
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Category</th>
                  <th>Submitted By</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className={`row-${c.status?.toLowerCase().replace(" ", "-")}`}>
                    <td className="cell-title">{c.title}</td>
                    <td className="cell-description">
                      {c.description.substring(0, 60)}
                      {c.description.length > 60 ? "..." : ""}
                    </td>
                    <td>
                      <span className={`status-badge ${c.status?.toLowerCase().replace(" ", "-")}`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <span className={`priority-badge ${c.priority?.toLowerCase()}`}>
                        {c.priority}
                      </span>
                    </td>
                    <td>{c.category}</td>
                    <td>{c.user?.fullName || "Unknown User"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewerDashboard;
