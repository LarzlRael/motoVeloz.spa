import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { startSession } from '../../store/slices/slices'

import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/forms/Input'
import { Loading } from '../../components/loadings/Loading'
import { validateStatus } from '../../utils/utils'
import { postAction } from '../../provider/action/ActionAuthorization'
import { appLogo, appName } from '../../data/constants'
import './../../styles/_media.scss'
import { Button } from '../../components/Buttons/Button'
export const Login = () => {
  const status = useSelector((state: RootState) => state.authSlice)
  const dispatch = useDispatch()
  const [loading, setloading] = useState(false)
  const push = useNavigate()
  useEffect(() => {
    if (status.isLogged) {
      push('/dashboard/listar')
    }
  }, [])

  async function onSubmit({ password, userName }: initialValuesI) {
    if (password === '' || userName === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'LLene todos los campos!',
      })
    }
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
          return Swal.fire({
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
  }

  interface initialValuesI {
    userName: string
    password: string
  }
  const initialValues = {
    userName: '',
    password: '',
  }
  return (
    <div className="Form__container-main animate__animated animate__fadeIn">
      <div className="Form__container animate__animated animate__fadeInUp">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <Form className="Form__login">
            <h3 className="Form__login--title">{appName}</h3>
            <img className="Form__login--logo" src={appLogo} alt="" />
            <h3 className="Form__login--title">Iniciar Sesion</h3>
            <label className="Form__label--pyme" htmlFor="">
              Usuario
            </label>
            <Input
              label=""
              className="Form__input--pyme"
              placeholder="Ingrese su usuario o email"
              name="userName"
              type="text"
              disabled={loading}
              /* showClearIcon={true} */
            />
            <label className="Form__label--pyme" htmlFor="">
              Contraseña
            </label>
            <Input
              label=""
              className="Form__input--pyme"
              placeholder="Ingrese su contraseña"
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
                margin="1rem 0"
                borderRadius="20px"
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
