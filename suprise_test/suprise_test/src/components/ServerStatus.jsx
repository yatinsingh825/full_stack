import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/ServerStatus.css';

// Create a separate axios instance for health checks (no auth)
const healthAxios = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function ServerStatus() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkServer = async () => {
      try {
        // ✅ Use separate axios instance to avoid interceptor
        await healthAxios.get('/api/auth/health');
        setStatus('online');
        console.log("✅ Server is online");
      } catch (err) {
        console.log("Server check error:", err.message);

        // Connection refused = offline
        if (err.code === 'ECONNREFUSED' || err.message.includes('ERR_INVALID_URL') || err.message.includes('Network Error')) {
          setStatus('offline');
        }
        // Timeout = offline
        else if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
          setStatus('offline');
        }
        // Any response (including 401) = server is online
        else {
          setStatus('online');
        }
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`server-status status-${status}`}>
      <span className="status-dot"></span>
      <span className="status-text">
        {status === 'online' && 'Server Online'}
        {status === 'offline' && 'Server Offline'}
        {status === 'checking' && 'Checking...'}
      </span>
    </div>
  );
}
