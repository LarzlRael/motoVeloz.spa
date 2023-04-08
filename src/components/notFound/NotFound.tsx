import './NotFound.scss'

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
      </div>
    </div>
  )
}

export default NotFound
