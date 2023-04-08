import { Link, useNavigate } from 'react-router-dom'
import './404.scss'
import {appLogo} from '../../data/constants'

const Page404 = () => {
  const navigate = useNavigate()
  return (
    <div className="page404__home">
      <div className="page404__home-img">
        <img src={appLogo} alt="text-error" />
      </div>
      <div className="page404__home-text">
        Lo sentimos, no hemos podido encontrar esta página,
        <br /> parece que nunca existió... o quizá exista en un futuro.
        <br />
        Prueba nuevamente o pulsa el siguiente botón.
        <br />
        <br />
        <Link to="/dashboard">Volver al Inicio</Link>
      </div>
    </div>
  )
}

export default Page404
