import { FaChevronLeft } from 'react-icons/fa'
import './NotFound.scss'
import { Button } from '../Buttons'
import { useNavigate } from 'react-router-dom'

interface NotFoundProps {
  searchTerm: string
  title?: string
  subtitle?: string
}
const NotFound = ({
  searchTerm,
  title = `No se encontró ningún resultado para "${searchTerm}"`,
  subtitle = 'Lo siento, no se encontraron resultados para su búsqueda.',
}: NotFoundProps) => {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6179/6179016.png"
          alt="Not Found"
          className="not-found__icon"
        />
        <h1 className="not-found__title">{title}</h1>
        <p className="not-found__subtitle">{subtitle}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ButtonBack />
        </div>
      </div>
    </div>
  )
}

export const ButtonBack = () => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => navigate(-1)}
      padding="1rem 4rem"
      margin="2rem 0"
      background="var(--secondary-color)"
      borderRadius="15px"
    >
      <FaChevronLeft />
      Regresar
    </Button>
  )
}

export default NotFound
