import React from 'react'
import { Loading } from '../../components/loadings/Loading'
import useAxios from '../../hooks/useAxios'
import { StoreResponseInterface } from '../../interfaces/ResponseInterfaces'
import { useNavigate } from 'react-router-dom'
import { StoreCard } from '../../components/card/StoreCard'

export const ListStore = () => {
  const push = useNavigate()
  const { response, loading, reload } = useAxios<StoreResponseInterface[]>({
    url: '/stores',
    method: 'GET',
  })

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div
          style={{
            padding: '1rem',
            /* background: '#eef0f2', */
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(19rem, 1fr))',
            gap: '1rem',
          }}
        >
          {response.map((res,i) => (
            <StoreCard store={res} key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
