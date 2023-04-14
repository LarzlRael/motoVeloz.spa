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
import Page404 from '../components/notFound/Page404'
import { PublicRoute } from './PublicRoute'

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
        <Route
          path="/ingresar"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}
