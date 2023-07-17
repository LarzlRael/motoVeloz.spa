import { FaChevronCircleLeft } from 'react-icons/fa'
import './BackIcon.scss'
import { useNavigate } from 'react-router-dom'
import Tippy from '@tippyjs/react'
import ToolTip from './ToolTip'
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
    <ToolTip content="Volver">
      <button className="BackIcon" onClick={handleClick}>
        <FaChevronCircleLeft size={20} />
        <span>Volver</span>
      </button>
    </ToolTip>
  )
}

export default BackIcon
