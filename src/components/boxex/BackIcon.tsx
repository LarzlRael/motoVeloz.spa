import { FaChevronCircleLeft } from 'react-icons/fa'
import './BackIcon.scss'
import { useNavigate } from 'react-router-dom'
interface BackIconProps {
  onClick?: () => void
}
const BackIcon = ({ onClick }: BackIconProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="BackIcon" onClick={handleClick}>
      <FaChevronCircleLeft size={20} />
      <span>Volver</span>
    </div>
  )
}

export default BackIcon
