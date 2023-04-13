import { Formik, Form } from 'formik'
import './PhoneCard.scss'
import { Input } from '../forms/Input'
import { useEffect, useRef, useState } from 'react'
import { Loading } from '../loadings/Loading'
import { capitalizeFirstLetter, getTimeNow, validateStatus } from '../../utils/utils'
import {
  postAction,
  putAction,
} from '../../provider/action/ActionAuthorization'
import { Button } from '../Buttons/Button'
import { FaAccessibleIcon, FaPen } from 'react-icons/fa'
import { TbSend } from 'react-icons/tb'
import { appLogo, appName } from '../../data/constants'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import useAxiosAuth from '../../hooks/useAxiosAuth'
import DropzoneInput from '../DragNDrop/DragZone'
import { processFormAppendData } from '../../utils/processData'
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
  const [file, setFile] = useState<any>()
  const [selected, setSelected] = useState(1)
  const [isexpanded, setIsexpanded] = useState(false)
  const { response, loading: storeLoading } = useAxiosAuth<any>({
    method: 'GET',
    url: '/stores/getNamesAndUrl',
  })
  
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

  function onSubmit() {
    setloading(true)
    if (formData.title === '' || formData.body === '') {
      setloading(false)
      return Swal.fire({
        icon: 'error',
        title: 'Por favor llene los campos requeridos',
        text: 'Titulo y cuerpo de la notificacion son requeridos',
      })
    }

    postAction(
      '/notifications/createNotification',
      processFormAppendData({
        ...formData,
        image: file.image,
      }),
    )
      .then((res: any) => {
        setloading(false)
        if (validateStatus(res.status)) {
          toast.success('Notificacion enviada correctamente', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          reload()
        } else {
          toast.error('Hubo un error al enviar la notificacion', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
        }
      })
      .catch((err) => {
        setloading(false)
        toast.error('Hubo un error al enviar la notificacion', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      })
  }
  function editNotification() {
    setloading(true)
    putAction(`/notifications/updateNotification/${_id}`, formData)
      .then((res: any) => {
        setloading(false)
        if (validateStatus(res.status)) {
          toast.info('Notificación editada correctamente', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
          reload()
        } else {
          toast.error('Hubo un error', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
        }
      })
      .catch((err) => {
        setloading(false)
        toast.error('Notificación editada correctamente', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      })
  }
  function onChange(e: any) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  return (
    <div className="PhoneCard">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className="Form__login">
          <h3 className="Form__login--title">Crear nueva notificacion push</h3>
          <br />
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
          {storeLoading ? (
            <Loading />
          ) : (
            <>
              <label className="Form__label--pyme">
                O puedes escoger una imagen de tu tienda
              </label>
              <select
                disabled={loading}
                name="imageUrl"
                onChange={onChange}
                value={formData.imageUrl}
                className="Form__select"
              >
                {[
                  {
                    imageUrl: '',
                    storeName: 'Selecciona una imagen',
                  },
                  ...response,
                ].map((store: any) => (
                  <option value={store.imageUrl} key={store.storeName}>
                    {capitalizeFirstLetter(store.storeName)}
                  </option>
                ))}
              </select>
              <DropzoneInput
                label="Subir Imagen"
                name="image"
                uploadFiles={setFile}
              />
            </>
          )}

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
      <div className="Notification__preview">
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <span
            className={
              selected === 1 ? '  Notifications__selected ' : 'selected'
            }
            onClick={() => {
              setSelected(1)
              setIsexpanded(false)
            }}
          >
            Estado inicial
          </span>
          <span
            className={
              selected === 2 ? ' Notifications__selected ' : 'selected'
            }
            onClick={() => {
              setSelected(2)
              setIsexpanded(true)
            }}
          >
            Vista expandida
          </span>
        </div>

        <div
          className="notification"
          style={{
            height: isexpanded ? '240px' : '150px',
            transition: 'all 0.1s ease',
          }}
        >
          <div className="notification__header">
            <img className="notification__logo" src={appLogo} alt="App Logo" />
            <span className="notification__title">{appName}</span>
            <span className="notification__time">{getTimeNow()}</span>
          </div>

          <div
            className={`notification__body ${
              isexpanded && 'notification__body-expanded'
            }`}
          >
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
    </div>
  )
}
