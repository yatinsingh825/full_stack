import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

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

      <div style={{ width: "100%", height: "500px", maxWidth: "500px" }}>

        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
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

export default Dashboard;
