import { Routes, Route, Link } from "react-router-dom";
import pfp from "./pfp.jpg";
import "./App.css";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

/* ---------- Navbar ---------- */
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/profile" className="logo">
        My App
      </Link>

      <div>
        <Link to="/profile">Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

/* ---------- Profile ---------- */
function Profile() {
  return (
    <div className="container">
      <img src={pfp} alt="Profile" className="profile-pic" />
      <h2>Yatin Singh</h2>
      <p>Class: B.E CSE (6th Semester)</p>
      <p>UID: 23BAI70025</p>
    </div>
  );
}

/* ---------- Dashboard ---------- */
function Dashboard() {
  const data = [
    { name: "React", value: 80 },
    { name: "JavaScript", value: 75 },
    { name: "Python", value: 70 },
    { name: "AI", value: 65 },
  ];

  const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

  return (
    <div className="container">
      <h2>Skill Dashboard</h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---------- Main App ---------- */
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
