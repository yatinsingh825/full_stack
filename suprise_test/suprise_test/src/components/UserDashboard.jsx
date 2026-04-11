import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import { sortComplaints, SORT_OPTIONS, formatDate } from "../utils/sortUtils";
import "../styles/UserDashboard.css";

function UserDashboard({ userData }) {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);
  const { addToast } = useToast();

  const API = "http://localhost:8080/api";

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  const fetchMyComplaints = async () => {
    try {
      const res = await axios.get(`${API}/complaints/my-complaints`);
      setComplaints(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      const errorMessage = err.response?.data?.message || "Error fetching complaints";
      addToast(errorMessage, "error");
      setLoading(false);
    }
  };

  const submitComplaint = async () => {
    if (!title.trim() || !description.trim()) {
      addToast("Please fill in all required fields", "warning");
      return;
    }

    try {
      await axios.post(`${API}/complaints`, {
        title,
        description,
        priority,
        category,
        status: "Pending",
      });

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setCategory("General");
      setShowForm(false);
      fetchMyComplaints();
      addToast("Complaint submitted successfully!", "success");
    } catch (err) {
      addToast("Error submitting complaint", "error");
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await axios.delete(`${API}/complaints/${id}`);
      fetchMyComplaints();
      addToast("Complaint deleted", "success");
    } catch (err) {
      addToast("Error deleting complaint", "error");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API}/complaints/${id}`, { status: newStatus });
      fetchMyComplaints();
      addToast("Status updated", "success");
    } catch (err) {
      addToast("Error updating complaint", "error");
    }
  };

  const getPendingCount = () => complaints.filter((c) => c.status === "Pending").length;
  const getResolvedCount = () => complaints.filter((c) => c.status === "Resolved").length;
  const sorted = sortComplaints(complaints, sortBy);

  return (
    <div className="user-dashboard">
      {/* HEADER STATS */}
      <div className="stats-row">
        <div className="stat-mini">
          <span className="stat-number">{complaints.length}</span>
          <span className="stat-text">Total Complaints</span>
        </div>
        <div className="stat-mini">
          <span className="stat-number">{getPendingCount()}</span>
          <span className="stat-text">Pending</span>
        </div>
        <div className="stat-mini">
          <span className="stat-number">{getResolvedCount()}</span>
          <span className="stat-text">Resolved</span>
        </div>
      </div>

      {/* NEW COMPLAINT BUTTON */}
      {!showForm && (
        <button className="new-complaint-btn" onClick={() => setShowForm(true)}>
          ➕ New Complaint
        </button>
      )}

      {/* FORM */}
      {showForm && (
        <div className="form-card">
          <h3>📝 Submit a New Complaint</h3>

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              placeholder="Briefly describe your issue"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General">General</option>
                <option value="Technical">Technical</option>
                <option value="Billing">Billing</option>
                <option value="Support">Support</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              placeholder="Provide detailed information about your complaint"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
            />
          </div>

          <div className="form-actions">
            <button className="submit-btn" onClick={submitComplaint}>
              ✓ Submit
            </button>
            <button className="cancel-btn" onClick={() => setShowForm(false)}>
              ✗ Cancel
            </button>
          </div>
        </div>
      )}

      {/* COMPLAINTS SECTION */}
      <div className="complaints-section">
        <div className="section-header">
          <h3>📋 Your Complaints</h3>
          <div className="sort-control">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value={SORT_OPTIONS.NEWEST}>Newest First</option>
              <option value={SORT_OPTIONS.OLDEST}>Oldest First</option>
              <option value={SORT_OPTIONS.TITLE_ASC}>Title (A-Z)</option>
              <option value={SORT_OPTIONS.TITLE_DESC}>Title (Z-A)</option>
              <option value={SORT_OPTIONS.PRIORITY_HIGH}>High Priority First</option>
              <option value={SORT_OPTIONS.STATUS}>By Status</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : sorted.length === 0 ? (
          <div className="empty-state">
            <p>No complaints yet. Submit your first complaint above!</p>
          </div>
        ) : (
          <div className="complaints-grid">
            {sorted.map((c) => (
              <div key={c.id} className="complaint-card">
                <div className="card-header">
                  <h4>{c.title}</h4>
                  <span className={`priority ${c.priority?.toLowerCase()}`}>
                    {c.priority}
                  </span>
                </div>

                <p className="description">{c.description}</p>

                <div className="card-meta">
                  <span className="category">📂 {c.category}</span>
                  <span className="date">📅 {formatDate(c.createdAt)}</span>
                </div>

                <div className="status-badge-container">
                  <span className={`status ${c.status?.toLowerCase().replace(" ", "-")}`}>
                    {c.status}
                  </span>
                </div>

                <div className="card-actions">
                  <select
                    className="status-select"
                    value={c.status}
                    onChange={(e) => updateStatus(c.id, e.target.value)}
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
    </div>
  );
}

export default UserDashboard;

