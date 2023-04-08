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
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}
