import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import { sortComplaints, SORT_OPTIONS } from "../utils/sortUtils";
import { exportToCSV, exportToPDF } from "../utils/exportUtils";
import SimpleChart from "./SimpleChart";
import "../styles/AdminDashboard.css";

function AdminDashboard({ userData }) {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);
  const { addToast } = useToast();

  const API = "http://localhost:8080/api";

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchAllComplaints();
  }, []);

  const fetchStats = async () => {
    try {
      console.log("📊 Fetching stats...");
      const res = await axios.get(`${API}/complaints/admin/stats`);
      console.log("✅ Stats fetched:", res.data);
      setStats(res.data);
    } catch (err) {
      console.error("❌ Error fetching stats:", err);
      console.error("Response data:", err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || "Error fetching stats";
      addToast(errorMessage, "error");
    }
  };

  const fetchUsers = async () => {
    try {
      console.log("👥 Fetching users...");
      const res = await axios.get(`${API}/users/all`);
      console.log("✅ Users fetched:", res.data);
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
      console.error("Response data:", err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || "Error fetching users";
      addToast(errorMessage, "error");
    }
  };

  const fetchAllComplaints = async () => {
    try {
      console.log("📋 Fetching all complaints...");
      const res = await axios.get(`${API}/complaints`);
      console.log("✅ Complaints fetched:", res.data);
      setComplaints(res.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Error fetching complaints:", err);
      console.error("Response data:", err.response?.data);
      const errorMessage = err.response?.data?.message || err.message || "Error fetching complaints";
      addToast(errorMessage, "error");
      setLoading(false);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`${API}/users/${userId}`, { role: newRole });
      fetchUsers();
      addToast("User role updated", "success");
    } catch (err) {
      addToast("Error updating user role", "error");
    }
  };

  const toggleUserActive = async (userId, isActive) => {
    try {
      await axios.put(`${API}/users/${userId}`, { active: !isActive });
      fetchUsers();
      addToast(isActive ? "User deactivated" : "User activated", "success");
    } catch (err) {
      addToast("Error updating user", "error");
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${API}/users/${userId}`);
      fetchUsers();
      addToast("User deleted", "success");
    } catch (err) {
      addToast("Error deleting user", "error");
    }
  };

  const updateComplaintStatus = async (complaintId, newStatus) => {
    try {
      await axios.put(`${API}/complaints/${complaintId}`, { status: newStatus });
      fetchAllComplaints();
      addToast("Complaint status updated", "success");
    } catch (err) {
      addToast("Error updating complaint", "error");
    }
  };

  const deleteComplaint = async (complaintId) => {
    try {
      await axios.delete(`${API}/complaints/${complaintId}`);
      fetchAllComplaints();
      addToast("Complaint deleted", "success");
    } catch (err) {
      addToast("Error deleting complaint", "error");
    }
  };

  const sorted = sortComplaints(complaints, sortBy);

  return (
    <div className="admin-dashboard">
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "dashboard" ? "active" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          📊 Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          👥 Users
        </button>
        <button
          className={`tab-btn ${activeTab === "complaints" ? "active" : ""}`}
          onClick={() => setActiveTab("complaints")}
        >
          📋 Complaints
        </button>
      </div>

      {/* DASHBOARD TAB */}
      {activeTab === "dashboard" && stats && (
        <>
          <div className="dashboard-grid">
            <div className="stat-card primary">
              <div className="stat-value">{stats.totalComplaints}</div>
              <div className="stat-label">Total Complaints</div>
              <div className="stat-icon">📝</div>
            </div>

            <div className="stat-card pending">
              <div className="stat-value">{stats.pendingComplaints}</div>
              <div className="stat-label">Pending</div>
              <div className="stat-icon">⏳</div>
            </div>

            <div className="stat-card inprogress">
              <div className="stat-value">{stats.inProgressComplaints}</div>
              <div className="stat-label">In Progress</div>
              <div className="stat-icon">🔄</div>
            </div>

            <div className="stat-card resolved">
              <div className="stat-value">{stats.resolvedComplaints}</div>
              <div className="stat-label">Resolved</div>
              <div className="stat-icon">✅</div>
            </div>
          </div>

          <div className="analytics-section">
            <h3>📊 Analytics</h3>
            <SimpleChart stats={stats} />
          </div>
        </>
      )}

      {/* USERS TAB */}
      {activeTab === "users" && (
        <div className="users-section">
          <h3>👥 User Management ({users.length})</h3>
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className={`user-card ${!user.active ? "inactive" : ""}`}>
                <div className="user-header">
                  <h4>{user.fullName}</h4>
                  <button
                    className={`status-toggle ${user.active ? "active" : "inactive"}`}
                    onClick={() => toggleUserActive(user.id, user.active)}
                  >
                    {user.active ? "Active" : "Inactive"}
                  </button>
                </div>
                <p className="user-username">@{user.username}</p>
                <p className="user-email">{user.email}</p>

                <div className="role-selector">
                  <label>Role:</label>
                  <select value={user.role} onChange={(e) => updateUserRole(user.id, e.target.value)}>
                    <option value="USER">USER</option>
                    <option value="VIEWER">VIEWER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <button className="delete-btn" onClick={() => deleteUser(user.id)}>
                  🗑️ Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPLAINTS TAB */}
      {activeTab === "complaints" && (
        <div className="complaints-section">
          <div className="complaints-header">
            <h3>📋 All Complaints ({sorted.length})</h3>
            <div className="export-actions">
              <button
                className="export-btn csv"
                onClick={() => {
                  exportToCSV(complaints, "complaints.csv");
                  addToast("CSV exported successfully", "success");
                }}
              >
                📥 CSV
              </button>
              <button
                className="export-btn pdf"
                onClick={() => {
                  exportToPDF(complaints, "complaints.pdf");
                  addToast("PDF exported successfully", "success");
                }}
              >
                📥 PDF
              </button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value={SORT_OPTIONS.NEWEST}>Newest First</option>
                <option value={SORT_OPTIONS.OLDEST}>Oldest First</option>
                <option value={SORT_OPTIONS.TITLE_ASC}>Title (A-Z)</option>
                <option value={SORT_OPTIONS.PRIORITY_HIGH}>High Priority</option>
                <option value={SORT_OPTIONS.STATUS}>By Status</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="complaints-list">
              {sorted.map((c) => (
                <div key={c.id} className="complaint-card-admin">
                  <div className="complaint-header">
                    <h4>{c.title}</h4>
                    <span className={`priority ${c.priority?.toLowerCase()}`}>
                      {c.priority} Priority
                    </span>
                  </div>
                  <p>{c.description}</p>
                  <div className="complaint-meta">
                    <span className={`status ${c.status?.toLowerCase()}`}>{c.status}</span>
                    <span className="category">{c.category}</span>
                    <span className="user">By: {c.user?.fullName || "Unknown User"}</span>
                  </div>

                  <div className="status-actions">
                    <select
                      value={c.status}
                      onChange={(e) => updateComplaintStatus(c.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                    <button className="delete-btn" onClick={() => deleteComplaint(c.id)}>
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
