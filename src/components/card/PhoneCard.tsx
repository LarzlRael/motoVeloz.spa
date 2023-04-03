import { Formik, Form } from 'formik'
import './PhoneCard.scss'
import { Input } from '../forms/Input'
import { useEffect, useRef, useState } from 'react'
import { Loading } from '../loadings/Loading'
import { capitalizeFirstLetter, validateStatus } from '../../utils/utils'
import {
  postAction,
  putAction,
} from '../../provider/action/ActionAuthorization'
import LogoApp from '../../../public/moto_veloz_logo.jpeg'
import { Button } from '../Buttons/Button'
import { FaAccessibleIcon, FaPen } from 'react-icons/fa'
import { TbSend } from 'react-icons/tb'
import { appName } from '../../data/constants'
interface PhoneCardProps {
  title?: string
  body?: string
  imageUrl: string
  _id?: string
  reload?: any
}
export const PhoneCard = ({
  title,
  body,
  imageUrl,
  _id,
  reload,
}: PhoneCardProps) => {
  const [loading, setloading] = useState(false)
  const [formData, setFormData] = useState({
    _id: _id,
    title: title,
    body: body,
    imageUrl: imageUrl,
  })
  const initialValues = {
    title: formData.title,
    body: formData.body,
    imageUrl: formData.imageUrl,
  }
  useEffect(() => {
    if (!loading) {
      setFormData({ ...formData, title, body, imageUrl })
    }
  }, [title, body, imageUrl, loading])
  const timeNow = () => {
    let date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes} ${hours > 12 ? 'PM' : 'AM'}`
  }
  function onSubmit() {
    setloading(true)

    postAction('/notifications/createNotification', formData)
    .then((res: any) => {
      setloading(false)
      if (validateStatus(res.status)) {
        console.log('creado :D')
        reload()
      } else {
        console.log('error :(')
      }
    })
    .catch((err) => {
      setloading(false)
      console.log('error :(')
    })

    postAction('/notifications/sendNotification', formData)
      .then((res: any) => {
        setloading(false)
        if (validateStatus(res.status)) {
          console.log('creado :D')
          reload()
        } else {
          console.log('error :(')
        }
      })
      .catch((err) => {
        setloading(false)
        console.log('error :(')
      })
  }
  function editNotification() {
    setloading(true)
    putAction(`/notifications/updateNotification/${_id}`, formData)
      .then((res: any) => {
        setloading(false)
        if (validateStatus(res.status)) {
          console.log('editado :D :D')
          reload()
        } else {
          console.log('error :(')
        }
      })
      .catch((err) => {
        setloading(false)
        console.log('error :(')
      })
  }
  function onChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className="PhoneCard">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="Form__login">
          <h3 className="Form__login--title">Notificaciones Push</h3>
          <label className="Form__label--pyme">Titulo de la notificación</label>
          <Input
            label=""
            placeholder="Título de la notificación"
            name="title"
            type="text"
            onChange={onChange}
            value={initialValues.title}
            disabled={loading}
          />
          <label className="Form__label--pyme">Texto de la notificación</label>
          <Input
            label=""
            placeholder="Contenido de la notificación"
            name="body"
            type="text"
            disabled={loading}
            onChange={onChange}
            value={formData.body}
          />
          <label className="Form__label--pyme">
            Image de la notificación (opcional)
          </label>

          <Input
            label=""
            placeholder="Ejemplo: https://tuapp.com/imagen.png"
            name="imageUrl"
            type="text"
            disabled={loading}
            onChange={onChange}
            value={formData.imageUrl}
          />
          {loading ? (
            <Loading />
          ) : (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {_id && (
                <Button
                  background="orange"
                  onClick={editNotification}
                  icon={<FaPen size="20" />}
                >
                  Editar Notification
                </Button>
              )}
              <Button
                background="green"
                type="submit"
                icon={<TbSend size={20} />}
              >
                Enviar notificación
              </Button>
            </div>
          )}
        </Form>
      </Formik>
      <div className="notification">
        <div className="notification__header">
          <img className="notification__logo" src={LogoApp} alt="App Logo" />
          <span className="notification__title">{appName}</span>
          <span className="notification__time">{timeNow()}</span>
        </div>

        <div className="notification__body">
          <div className="notification__content">
            <span className="notification__content-title">
              {capitalizeFirstLetter(formData.title) ||
                'Titulo de la notificación'}
            </span>

            <span className="notification__content-text">
              {capitalizeFirstLetter(formData.body) ||
                'Contenido de la notificación'}
            </span>
          </div>
          <img
            className="notification__image"
            src={formData.imageUrl || 'https://via.placeholder.com/100x100'}
            alt="Notification Image"
          />
        </div>
      </div>
    </div>
  )
}
