import { useField, ErrorMessage } from 'formik'
import React, { useState } from 'react'
import { OptionsI } from '../../interfaces/globalFormInterface'
import { Label } from '../text'
interface Props {
  label: string
  name: string
  [x: string]: any
  options: OptionsI[]
}
export const Select = ({ label, options, ...props }: Props) => {
  const [field, meta] = useField(props)
  return (
    <>
      <label className="Form__label--pyme" htmlFor={props.id || props.name}>
        {label}
      </label>
      <select className="Form__input--pyme" {...field} {...props}>
        {options.map((option: OptionsI) => {
          return (
            <option key={option.key} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </select>

      <ErrorMessage name={props.name} component="label" />
    </>
  )
}
