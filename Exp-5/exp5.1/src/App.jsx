import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./Component/Loader";

// ⏱️ Fake 1 second delay
const Dashboard = lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(import("./Component/Dashboard"));
    }, 3000); // 1000ms = 1 second
  })
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Dashboard />
    </Suspense> 
  );
}

export default App;
