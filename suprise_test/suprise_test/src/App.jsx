import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Login from "./Login";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import ViewerDashboard from "./components/ViewerDashboard";
import { ToastProvider, useToast } from "./context/ToastContext";
import "./styles/Toast.css";
import "./styles/ServerStatus.css";

function AppContent() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData") || "{}"));
  const [interceptorReady, setInterceptorReady] = useState(false);
  const { addToast } = useToast();

  const API = "http://localhost:8080/api";

  useEffect(() => {
    // ✅ Setup axios interceptors FIRST before any components make requests
    console.log("⚙️ Setting up axios interceptors...");

    let requestInterceptorId = null;
    let responseInterceptorId = null;

    // ✅ ADD AXIOS REQUEST INTERCEPTOR - Sets token on EVERY request
    requestInterceptorId = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("✅ TOKEN ADDED TO REQUEST:", token.substring(0, 20) + "... for " + config.url);
        } else {
          console.warn("⚠️ NO TOKEN FOUND IN LOCALSTORAGE for", config.url);
        }
        return config;
      },
      (error) => {
        console.error("❌ Request Error:", error.message);
        return Promise.reject(error);
      }
    );

    // ✅ ADD AXIOS RESPONSE INTERCEPTOR - Handle all responses
    responseInterceptorId = axios.interceptors.response.use(
      (response) => {
        console.log("✅ API SUCCESS:", response.config.url, response.status);
        return response;
      },
      (error) => {
        // Log the error but don't log full details to reduce noise
        if (error.response) {
          console.error("❌ API ERROR:", error.response.status, error.config.url);

          // Handle 401 Unauthorized - token expired or invalid
          if (error.response.status === 401) {
            console.warn("⚠️ Unauthorized (401)! Redirecting to login...");
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            localStorage.removeItem("userData");
            // Force reload to login page
            setTimeout(() => window.location.href = "/", 500);
          }
        } else {
          console.error("❌ Network Error:", error.message);
        }
        return Promise.reject(error);
      }
    );

    // Mark that interceptor is ready
    console.log("✅ Axios interceptors setup complete");
    setInterceptorReady(true);

    return () => {
      // Cleanup interceptors
      if (requestInterceptorId !== null) {
        axios.interceptors.request.eject(requestInterceptorId);
      }
      if (responseInterceptorId !== null) {
        axios.interceptors.response.eject(responseInterceptorId);
      }
    };
  }, []);

  const handleLogout = () => {
    console.log("🚪 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    setLoggedIn(false);
    setUserRole(null);
    setUserData({});
    addToast("Logged out successfully", "success");
  };

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} setUserData={setUserData} />;
  }

  // ✅ Only render dashboards AFTER interceptor is ready to prevent 401 errors
  if (!interceptorReady) {
    return (
      <div className="app-wrapper">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h2 className="brand-title">🎯 Complaint Manager</h2>
            <span className="role-badge">{userRole?.toUpperCase()}</span>
          </div>
          <div className="navbar-user">
            <span className="user-info">{userData.fullName}</span>
            <span className="user-email">{userData.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="main-container">
        {userRole === "ADMIN" && <AdminDashboard userData={userData} />}
        {userRole === "USER" && <UserDashboard userData={userData} />}
        {userRole === "VIEWER" && <ViewerDashboard userData={userData} />}
      </div>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
