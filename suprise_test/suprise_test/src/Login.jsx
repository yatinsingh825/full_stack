import { useState } from "react";
import axios from "axios";
import { useToast } from "./context/ToastContext";
import { ServerStatus } from "./components/ServerStatus";
import "./styles/Login.css";

function Login({ setLoggedIn, setUserRole, setUserData }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const login = async () => {
    setLoading(true);
    try {
      if (!username || !password) {
        addToast("Please enter username and password", "warning");
        setLoading(false);
        return;
      }

      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.role);
      localStorage.setItem("userData", JSON.stringify(res.data));

      axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;

      setUserRole(res.data.role);
      setUserData(res.data);
      setLoggedIn(true);
      addToast(`Welcome ${res.data.fullName}!`, "success");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid username or password";
      addToast(errorMsg, "error");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const signup = async () => {
    setLoading(true);
    try {
      if (!username || !password || !fullName || !email) {
        addToast("Please fill in all fields", "warning");
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
        fullName,
        email,
      });

      addToast("Account created successfully! Please login.", "success");
      setIsSignup(false);
      setUsername("");
      setPassword("");
      setFullName("");
      setEmail("");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed";
      addToast(errorMsg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup ? signup() : login();
  };

  return (
    <div className="login-wrapper">
      <div className="login-background"></div>

      <div className="server-status-container">
        <ServerStatus />
      </div>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1 className="login-title">🎯 Complaint Manager</h1>
            <p className="login-subtitle">{isSignup ? "Join Us" : "Welcome Back"}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoComplete="username"
              />
            </div>

            {isSignup && (
              <>
                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    id="fullname"
                    type="text"
                    placeholder="Enter full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Processing...
                </>
              ) : (
                isSignup ? "Create Account" : "Login"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                className="toggle-btn"
                onClick={() => {
                  setIsSignup(!isSignup);
                }}
              >
                {isSignup ? "Login" : "Sign up"}
              </button>
            </p>
          </div>

          <div className="test-credentials">
            <details>
              <summary>📝 Test Credentials</summary>
              <div className="creds">
                <div className="cred-item">
                  <strong>Admin Role:</strong>
                  <code>admin / password123</code>
                </div>
                <div className="cred-item">
                  <strong>Viewer Role:</strong>
                  <code>viewer / password123</code>
                </div>
                <div className="cred-item">
                  <strong>User Role:</strong>
                  <code>user1 / password123</code>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

