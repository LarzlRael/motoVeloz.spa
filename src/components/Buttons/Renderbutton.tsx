import { CSSProperties } from 'react'
import styled from 'styled-components'
const ButtonStyle = styled.button<any>`
  padding: 8px;
  border-radius: 5px;
  font-size: 1.6rem;
  cursor: pointer;
  background: ${(props) =>
    props.background ? props.background : 'var(--orange2)'};
  color: ${(props) => (props.color ? props.color : 'var(--white)')};
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.2;
  }
`
interface RenderButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
  background?: string
  style?: CSSProperties
}
export const RenderButton = (props: RenderButtonProps) => {
  const { children, type, onClick, disabled, style } = props
  return (
    <ButtonStyle
      className="RenderButton"
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={style}
    >
      {children}
    </ButtonStyle>
  )
}
