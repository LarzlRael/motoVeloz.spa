import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
/* import { postAction } from '../../src/provider/action/action' */

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { startSession } from '../../store/slices/slices'

import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/forms/Input'
import { Loading } from '../../components/loadings/Loading'
import { H2 } from '../../components/text/H2'
import { validateStatus } from '../../utils/utils'
import { postAction } from '../../provider/action/ActionAuthorization'
import Swal from 'sweetalert2'
import { appName } from '../../data/constants'
import LogoApp from '../../../public/moto_veloz_logo.jpeg'
import { Button } from '../../components/Buttons/Button'
export const Login = () => {
  const { isLogged } = useSelector((state: RootState) => state.authSlice)
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const push = useNavigate()

  async function onSubmit({ password, userName }: initialValuesI) {
    setloading(true)
    postAction('auth/login', { password, userName })
      .then((res: any) => {
        setloading(false)
        if (validateStatus(res.status)) {
          dispatch(startSession({ token: res.data.token }))
          window.localStorage.setItem('token', res.data.token)
          push('/dashboard/listar')
        } else {
          setloading(false)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario o contraseña incorrectos!',
          })
        }
      })
      .catch((err) => {
        setloading(false)
        console.log(err)
      })

    /* if (validateStatus(action.status)) {
      dispatch(startSession({ token: action.data.token }))
      window.localStorage.setItem('token', action.data.token.accessToken)
      push('/auth/adminDashboard')
    } else {
      console.log('login fail')
    } */
  }

  interface initialValuesI {
    userName: string
    password: string
  }
  const initialValues = {
    userName: 'gatomon',
    password: '123456',
  }
  return (
    <div className="Form__container-main animate__animated animate__fadeIn">
      <div className="Form__container animate__animated animate__fadeInUp">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="Form__login">
            <h3 className="Form__login--title">{appName}</h3>
            <img className="Form__login--logo" src={LogoApp} alt="" />
            <h3 className="Form__login--title">Iniciar Sesion</h3>
            <label className="Form__label--pyme" htmlFor="">
              Ingrese su usuario o email
            </label>
            <Input
              label=""
              className="Form__input--pyme"
              placeholder="Usuario"
              name="userName"
              type="text"
              disabled={loading}
            />
            <br />
            <label className="Form__label--pyme" htmlFor="">
              Ingrese su contraseña
            </label>
            <Input
              label=""
              className="Form__input--pyme"
              placeholder="Contraseña"
              name="password"
              type="password"
              disabled={loading}
            />
            {loading ? (
              <Loading />
            ) : (
              <Button
                background="var(--secondary-color)"
                type="submit"
                className="button-login pointer"
                margin='1rem 0'
                borderRadius='20px'
              >
                Iniciar Sesion
              </Button>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  )
}
