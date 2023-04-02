import React, { useState } from 'react'
import { PhoneCard } from '../../components/card/PhoneCard'
import useAxiosAuth from '../../hooks/useAxiosAuth'
import { FaTrash } from 'react-icons/fa'
import { deleteAction } from '../../provider/action/ActionAuthorization'

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
    console.log(selecteNotification)
  }
  function handleDleteNotification(id: any) {
    console.log(id)
    deleteAction(`/notifications/deleteNotification/${id}`)
      .then((res: any) => {
        console.log(res)
        reload()
      })
      .catch((err: any) => {})
  }
  return (
    <>
      <div>PushNotifications Page</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        response?.map((item: any) => {
          return (
            <div
              key={item.id}
              onClick={() => {
                selecteNotificationHandler(item)
              }}
            >
              <div>{item.title}</div>
              <div>{item.body}</div>
              <FaTrash onClick={() => handleDleteNotification(item._id)} />
            </div>
          )
        })
      )}
      <PhoneCard {...selecteNotification} reload={reload} />
    </>
  )
}
