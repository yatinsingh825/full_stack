import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validation Function
  const validate = () => {
    let newErrors = {};

    // ✅ Email Validation
    // must contain @ and .com/.in/any country code
    const emailRegex =/^[A-Za-z0-9][A-Za-z0-9._%+-]*@[A-Za-z0-9-]+\.(com|in|org|net|edu)$/i;

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter valid Email (.com / .in / country code)";
    }

    // ✅ Password Conditions:
    // 1) Start with Capital
    // 2) At least one number
    // 3) One special char
    // 4) Minimum 5 chars

    const passwordRegex =
      /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{4,}$/;

    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must start with Capital, include number, special char & min 5 chars";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form Submitted Successfully ✅");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          Experiment-6.2: Client Side Form Validation
        </h2>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-bold">Email ID</label>
            <input
              type="text"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="text-danger">{errors.email}</div>
            )}
          </div>

          {/* PASSWORD */}
          <div className="mb-3">
            <label className="form-label fw-bold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>

          <button className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}