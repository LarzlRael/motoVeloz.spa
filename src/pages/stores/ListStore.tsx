import { LoadingExpanded } from '../../components/loadings/Loading'
import useAxios from '../../hooks/useAxios'
import { StoreResponseInterface } from '../../interfaces/ResponseInterfaces'

import { StoreCard } from '../../components/card/StoreCard'
import './ListStore.scss'
export const ListStore = () => {
  const { response, loading, reload } = useAxios<StoreResponseInterface[]>({
    url: '/stores',
    method: 'GET',
  })

  return (
    <div>
      {loading ? (
        <LoadingExpanded />
      ) : (
        <div className="ListStore__container">
          
          {response?.map((res, i) => (
            <StoreCard store={res} key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
