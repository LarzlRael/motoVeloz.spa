import { FaPlus } from 'react-icons/fa'
import './FloatingActionButton.scss'
import Tippy from '@tippyjs/react'

interface FloatingActionButtonProps {
  onClick?: () => void
}

export const FloatingActionButton = ({
  onClick,
}: FloatingActionButtonProps) => {
  return (
    <Tippy
      theme="light"
      content={
        <span
          style={{
            fontSize: '0.9rem',
            /* fontWeight: '500', */

            color: 'var(--secondary-color)',
          }}
        >
          {`Agregar tienda`}
        </span>
      }
    >
      <button onClick={onClick} className="FloatingActionButton">
        <FaPlus size={25} color="white" />
      </button>
    </Tippy>
  )
}
