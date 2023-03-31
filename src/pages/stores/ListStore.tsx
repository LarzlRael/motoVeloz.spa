import React from 'react'
import { Loading } from '../../components/loadings/Loading'
import useAxios from '../../hooks/useAxios'
import { StoreResponseInterface } from '../../interfaces/ResponseInterfaces'
import { useNavigate } from 'react-router-dom'

export const ListStore = () => {
  const push = useNavigate()
  const { response, loading, reload } = useAxios<StoreResponseInterface[]>({
    url: '/stores',
    method: 'GET',
  })
  function handleGo(id: number | string) {
    push(`/dashboard/editarTienda/${id}`)
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {response.map((res) => (
            <div onClick={() => handleGo(res._id)}>{res.storeName}</div>
          ))}
        </div>
      )}
    </div>
  )
}
