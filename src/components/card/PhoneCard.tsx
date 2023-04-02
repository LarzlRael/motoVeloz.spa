import { Formik, Form } from 'formik'
import './PhoneCard.scss'
import { Input } from '../forms/Input'
import { useState } from 'react'
import { Loading } from '../loadings/Loading'
interface PhoneCardProps {
  title?: string
  body?: string
  image?: string
}
export const PhoneCard = ({ title, body, image }: PhoneCardProps) => {
  const [loading, setloading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    body: '',
  })
  const initialValues = {
    title: 'gatomon',
    body: '123456',
  }
  function onSubmit({ title, body }: any) {
    console.log('sednign')
  }
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="Form__login">
          <h3 className="Form__login--title">Iniciar Sesion</h3>
          <Input
            label=""
            className="Form__input"
            placeholder="Usuario"
            name="userName"
            type="text"
            onChange={(e: any) => {
              setFormData({ ...formData, title: e.target.value })
            }}
            disabled={loading}
          />
          <br />
          <Input
            label=""
            placeholder="Contraseña"
            name="cuerpo"
            type="text"
            disabled={loading}
          />
          {loading ? (
            <Loading />
          ) : (
            <button type="submit" className="button-login pointer">
              Guardar
            </button>
          )}
        </Form>
      </Formik>
      <div className="phone">
        <div className="phone__top-bar"></div>
        <div className="phone__screen">
          <div className="phone__notification">
            <div className="phone__notification-icon">
              <img
                src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4TF1U4JPJXKhTK_3Tue-DZapvvvrEKj239H5dUwHGXw&s'}
                alt="Notification icon"
              />
            </div>
            <div className="phone__notification-content">
              <div className="phone__notification-title">
                {formData.title || 'Titulo de la notificación'}
              </div>
              <div className="phone__notification-body">
                {formData.body || 'Cuerpo de la notificación'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
