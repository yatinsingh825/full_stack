import { Routes, Route, NavLink, Navigate } from "react-router-dom"
import { Suspense, lazy } from "react"
import Loader from "./components/Loader"
import "./App.css"

/* 👇 helper function to create fake delay */
function delayImport(factory, time = 3000) {
  return new Promise(resolve => {
    setTimeout(() => resolve(factory()), time)
  })
}

/* 👇 Lazy Loaded Pages with 3–4 sec delay */
const Home = lazy(() => delayImport(() => import("./pages/Home"), 3000))
const About = lazy(() => delayImport(() => import("./pages/About"), 4000))
const Contact = lazy(() => delayImport(() => import("./pages/Contact"), 3500))

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
        {/* 👇 Suspense shows loader while lazy page loads */}
        <Suspense fallback={<Loader />}>

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
