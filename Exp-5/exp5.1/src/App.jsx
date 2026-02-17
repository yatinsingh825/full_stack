import "./App.css";
import { lazy, Suspense } from "react";

// ✅ Lazy import
const Dashboard = lazy(() => import("./Component/Dashboard"));

function App() {
  return (
    <Suspense fallback={<h2>Loading Dashboard...</h2>}>
      <Dashboard />
    </Suspense>
  );
}

export default App;
