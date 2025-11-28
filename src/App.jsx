import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import LandingPage from './Pages/LandingPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  )
}
