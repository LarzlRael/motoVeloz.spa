import React, { useState } from 'react'
import { PhoneCard } from '../../components/card/PhoneCard'
import useAxiosAuth from '../../hooks/useAxiosAuth'
import { FaTrash } from 'react-icons/fa'
import { deleteAction } from '../../provider/action/ActionAuthorization'
import TableMain from '../../components/table/TableMain'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

export const PushNotifications = () => {
  const { response, loading, reload } = useAxiosAuth<any>({
    method: 'GET',
    url: '/notifications/getNotifications',
  })
  const [selecteNotification, setSelecteNotification] = useState({
    title: '',
    body: '',
    imageUrl: '',
  })
  function selecteNotificationHandler(item: any) {
    setSelecteNotification(item)
  }
  function handleDleteNotification(id: any) {
    Swal.fire({
      title: '¿Estás seguro de eliminar esta notificación?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      selecteNotificationHandler(null)
      if (result.isConfirmed) {
        deleteAction(`/notifications/deleteNotification/${id}`)
          .then((res: any) => {
            toast.info('Notificacion eliminada correctamente', {
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
          })
          .catch((err: any) => {})
      } else if (result.isDenied) {
        /* Swal.fire('Changes are not saved', '', 'info') */
      }
    })
  }

  return (
    <div style={{
      padding: '1rem',
    }}>
      <h3 className="Form__login--title">Notificaciones Push</h3>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TableMain
          header={[
            { key: 'title', name: 'Titulo' },
            { key: 'body', name: 'Contenido de la aplicación' },

            { key: 'createdAt', name: 'Creado en ', type: 'date' },
            /* { key: 'imageUrl', name: 'Creado en ', type: 'img' }, */
            {
              key: 'action',
              name: 'Acciones',
              type: 'actions',
              actions: [
                {
                  labelTooltip: 'Eliminar notificación',
                  action: (e) => {
                    handleDleteNotification(e._id)
                  },
                  icon: <FaTrash color="#f44336" size={20}/>,
                },
              ],
            },
          ]}
          main={response}
          handleInfo={selecteNotificationHandler}
        />
      )}
      <PhoneCard {...selecteNotification} reload={reload} />
    </div>
  )
}
