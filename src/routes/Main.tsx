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
import { ProtectedRoutes } from './ProtectedRoutes'

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes>
              <AdminDashBoard />
            </ProtectedRoutes>
          }
        />
        <Route path="/ingresar" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}
