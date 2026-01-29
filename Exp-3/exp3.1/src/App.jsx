import { Routes, Route, NavLink, Navigate } from "react-router-dom"
import "./App.css"

function Home() {
  return <h2>Dashboard</h2>
}

function About() {
  return <h2>About Page</h2>
}

function Contact() {
  return <h2>Contact Page</h2>
}

function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h3 className="title">My App</h3>

        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </aside>

      <main className="main">
        <Routes>
          {/* default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
