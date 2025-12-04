import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigate'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import FcfsSimulator from './pages/FcfsSimulator'

function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/fcfs-simulator" element={<FcfsSimulator />} />
      </Routes>
    </div>
  )
}

export default App

