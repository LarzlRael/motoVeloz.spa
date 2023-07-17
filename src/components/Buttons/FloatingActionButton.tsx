import { FaPlus } from 'react-icons/fa'
import './FloatingActionButton.scss'
import Tippy from '@tippyjs/react'
import ToolTip from '../boxex/ToolTip'

interface FloatingActionButtonProps {
  onClick?: () => void
}

export const FloatingActionButton = ({
  onClick,
}: FloatingActionButtonProps) => {
  return (
    <ToolTip content="Agregar tienda">
      <button onClick={onClick} className="FloatingActionButton">
        <FaPlus size={25} color="white" />
      </button>
    </ToolTip>
  )
}
