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
  const { addToast } = useToast();

  const API = "http://localhost:8080/api";

  useEffect(() => {
    // ✅ ADD AXIOS REQUEST INTERCEPTOR - Sets token on EVERY request
    const requestInterceptor = axios.interceptors.request.use(
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
        return Promise.reject(error);
      }
    );

    // ✅ ADD AXIOS RESPONSE INTERCEPTOR - Logs all responses
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log("✅ API SUCCESS:", response.config.url, response.status, response.data);
        return response;
      },
      (error) => {
        console.error("❌ API ERROR:", {
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
        });
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userData");
    delete axios.defaults.headers.common["Authorization"];
    // ✅ Clear Authorization header from all future requests
    axios.defaults.headers.common["Authorization"] = "";
    setLoggedIn(false);
    setUserRole(null);
    setUserData({});
    addToast("Logged out successfully", "success");
    console.log("✅ Logged out, token cleared");
  };

  if (!loggedIn) {
    return <Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} setUserData={setUserData} />;
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

