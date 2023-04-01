import { AdminDashBoard } from '../pages/stores/AdminDashboard'
import { Login } from '../pages/auth/Login'
import { CreateStore } from '../pages/stores/CreateStore'
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard/*" element={<AdminDashBoard />} />
        <Route path="/ingreso" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}
