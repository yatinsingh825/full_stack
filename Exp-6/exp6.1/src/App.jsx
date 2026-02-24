import { useState } from "react";
import "./App.css";

const initialState = {
  firstName: "",
  lastName: "",
  gender: "",
  address: "",
  dob: "",
  state: "",
  skills: []
};

function App() {
  const [formData, setFormData] = useState(initialState);

  // Handle text, textarea, dropdown, radio
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const handleReset = () => {
    setFormData(initialState);
  };

  // Skills checkbox handler
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter((skill) => skill !== value)
    }));
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Gender: ${formData.gender}
Address: ${formData.address}
DOB: ${formData.dob}
State: ${formData.state}
Skills: ${formData.skills.join(", ")}
    `);
  };

  return (
    <div className="page">
      {/* Heading Outside */}
      <h2 className="title">Registration Form</h2>

      <div className="card">
        <form onSubmit={handleSubmit}>

  {/* First Name */}
  <p>First Name:</p>
  <input
    type="text"
    name="firstName"
    placeholder="First Name"
    value={formData.firstName}
    onChange={handleChange}
  />

  {/* Last Name */}
  <p>Last Name:</p>
  <input
    type="text"
    name="lastName"
    placeholder="Last Name"
    value={formData.lastName}
    onChange={handleChange}
  />

  {/* Gender */}
  <p>Gender:</p>
  <div className="inline">
    <label>
      <input
        type="radio"
        name="gender"
        value="Male"
        checked={formData.gender === "Male"}
        onChange={handleChange}
      /> Male
    </label>

    <label>
      <input
        type="radio"
        name="gender"
        value="Female"
        checked={formData.gender === "Female"}
        onChange={handleChange}
      /> Female
    </label>
  </div>

  {/* Address */}
  <p>Address:</p>
  <textarea
    name="address"
    placeholder="Address"
    value={formData.address}
    onChange={handleChange}
  />

  {/* DOB */}
  <p>Date of Birth:</p>
  <input
    type="date"
    name="dob"
    value={formData.dob}
    max={new Date().toISOString().split("T")[0]}
    onChange={handleChange}
  />

  {/* State */}
  <p>State:</p>
  <select name="state" value={formData.state} onChange={handleChange}>
    <option value="">Select State</option>
    <option value="UP">UP</option>
    <option value="Bihar">Bihar</option>
    <option value="Telangana">Telangana</option>
    <option value="Delhi">Delhi</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Assam">Assam</option>
    <option value="Jammu">Jammu</option>
    <option value="Haryana">Haryana</option>
    <option value="Maharashtra">Maharashtra</option>
  </select>

  {/* Skills */}
  <p>Skills:</p>
  <div className="inline">
    <label>
      <input type="checkbox" value="HTML"
        checked={formData.skills.includes("HTML")}
        onChange={handleSkillChange}/> HTML
    </label>

    <label>
      <input type="checkbox" value="CSS"
        checked={formData.skills.includes("CSS")}
        onChange={handleSkillChange}/> CSS
    </label>

    <label>
      <input type="checkbox" value="JavaScript"
        checked={formData.skills.includes("JavaScript")}
        onChange={handleSkillChange}/> JavaScript
    </label>

    <label>
      <input type="checkbox" value="React"
        checked={formData.skills.includes("React")}
        onChange={handleSkillChange}/> React
    </label>

    <label>
      <input type="checkbox" value="Node.js"
        checked={formData.skills.includes("Node.js")}
        onChange={handleSkillChange}/> Node.js
    </label>
  </div>

  <div className="btns">
    <button type="submit">Submit</button>
    <button type="button" onClick={handleReset}>Cancel</button>
  </div>

</form>
      </div>
    </div>
  );
}

export default App;