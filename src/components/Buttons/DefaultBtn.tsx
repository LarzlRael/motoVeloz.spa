import React from 'react'
import DefaultStyle from '../boxex/styles/DefaultStyle'

interface DefaultBtnProps {
  children: React.ReactNode
  background?: string
  color?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  width?: string
  padding?: string
  onClick?: () => void
  fontSize?: string
  fontWeight?: string
  border?: string
}

export const DefaultBtn = (props: DefaultBtnProps) => {
  return (
    <DefaultStyle
      className="DefaultBtn"
      background={props.background}
      color={props.color}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
      width={props.width}
      padding={props.padding}
      fontSize={props.fontSize}
      fontWeight={props.fontWeight}
    >
      {props.children}
    </DefaultStyle>
  )
}


