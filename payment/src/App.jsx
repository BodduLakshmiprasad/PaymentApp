import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ClubPage from './pages/ClubPage'
import EventPage from './pages/EventPage'
import PaymentPage from './pages/PaymentPage'
import Login from './pages/Login'
import Register from './pages/Register'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/clubs/:clubId" element={<ClubPage />} />
      <Route path="/events/:eventId" element={<EventPage />} />
      <Route path="/payment/:eventId" element={<PaymentPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}