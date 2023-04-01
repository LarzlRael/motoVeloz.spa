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
          /* push('/auth/adminDashboard') */
        } else {
          setloading(false)
          console.log('login fail')
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
            <h3 className="Form__login--title">Iniciar Sesion</h3>
            <Input
              label=""
              className="Form__input"
              placeholder="Usuario"
              name="userName"
              type="text"
              disabled={loading}
            />
            <br />
            <Input
              label=""
              placeholder="Contraseña"
              name="password"
              type="password"
              disabled={loading}
            />
            {loading ? (
              <Loading />
            ) : (
              <button type="submit" className="button-login">
                Iniciar Sesion
              </button>
            )}
          </Form>
        </Formik>
      </div>
      <div className="Form__info-login animate__animated animate__fadeInDown">
        <H2 margin="0.5rem 0" color="white" fontSize="2rem">
          MotoVeloz
        </H2>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. A qui ipsam
          numquam dolore quo, aperiam voluptates labore, error totam rem hic,
          minus incidunt autem nesciunt ea laborum temporibus enim tempora.
        </span>
      </div>
    </div>
  )
}
