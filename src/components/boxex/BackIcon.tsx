import { FaChevronCircleLeft } from 'react-icons/fa'
import './BackIcon.scss'
interface BackIconProps {
  onClick: any
}
const BackIcon = ({ onClick }: BackIconProps) => {
  return (
    <div className="BackIcon" onClick={onClick}>
      <FaChevronCircleLeft size={20} />
      <span>Volver</span>
    </div>
  )
}

export default BackIcon
