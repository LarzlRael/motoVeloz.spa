import React from 'react'
import styled from 'styled-components'

import { ReactElement } from 'react'
import { sizeMedia } from '../../styles/mediaQuerys'
export const ButtonStyle = styled.button<{
  textColor?: string
  backGroundColor?: string
  margin?: string
  borderRadius?: string
  padding?: string
}>`
  background: ${({ backGroundColor }) =>
    backGroundColor ? backGroundColor : '#444752'};
  color: ${({ textColor }) => (textColor ? textColor : 'white')};

  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
  border: none;
  padding: ${({ padding }) => padding ?? '0.7rem'};
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin: ${({ margin }) => margin};

  cursor: pointer;
  &:hover {
    background: darken(0.9, ${({ backGroundColor }) => backGroundColor});
  }
  @media ${sizeMedia('xs_sm')} {
    padding: 0.7rem;
    width: 100%;
    &:nth-child(1) {
      margin-right: 10px;
    }
  }
`
interface ButtonProps {
  children: React.ReactNode
  icon?: ReactElement<any, any>
  onClick?: () => void
  background?: string
  textColor?: string
  type?: 'button' | 'submit'
  margin?: string
  className?: string
  borderRadius?: string
  padding?: string
}
export const Button = ({
  children,
  onClick,
  icon,
  background,
  textColor,
  type = 'button',
  margin = '0',
  className,
  borderRadius,
  padding,
}: ButtonProps) => {
  return (
    <ButtonStyle
      type={type}
      backGroundColor={background}
      onClick={onClick}
      textColor={textColor}
      margin={margin}
      borderRadius={borderRadius}
      className={className}
      padding={padding}
    >
      {children}

      {icon && (
        <>
          <div
            style={{
              marginLeft: '10px',
            }}
          />
          {icon}
        </>
      )}
    </ButtonStyle>
  )
}
