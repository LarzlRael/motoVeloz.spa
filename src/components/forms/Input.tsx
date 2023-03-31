import './Input.scss'
import { ErrorMessage, useField } from 'formik'
import React, { useState } from 'react'
interface Props {
  label: string
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
  [x: string]: any
}
export const Input = ({ label, type, ...props }: Props) => {
  const [field, meta] = useField(props)
  const [check, setcheck] = useState({
    typeInput: 'password',
  })
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = e.target
    setcheck({
      typeInput: checked ? 'text' : 'password',
    })
  }
  return (
    <>
      <label className="Form__label--pyme" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className="Form__input--pyme"
        type={type !== 'password' ? type : check.typeInput}
        {...field}
        {...props}
      />
      {type === 'password' && (
        <div className="Input__check">
          <label htmlFor="checkBox">Mostrar contraseña</label>
          <input
            onChange={handleCheck}
            type="checkbox"
            name="checkBox"
            id="checkBox"
          />
        </div>
      )}
      <ErrorMessage
        name={props.name}
        component="label"
        className="Form__text-error"
      />
    </>
  )
}
