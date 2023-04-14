import { LoadingExpanded } from '../../components/loadings/Loading'
import useAxios from '../../hooks/useAxios'
import { StoreResponseInterface } from '../../interfaces/ResponseInterfaces'

import { StoreCard } from '../../components/card/StoreCard'
import './ListStore.scss'
import { InputHTMLAttributes, useEffect, useState } from 'react'
import { SearchInput } from '../../components/forms/SearchInput'
import ArrayDataComponent from '../../components/card/ArrayDataComponent'
import NotFound from '../../components/notFound/NotFound'
import { FaSearch } from 'react-icons/fa'
import { H2 } from '../../components/text'
export const ListStore = () => {
  const [search, setSearch] = useState({
    url: '/stores',
    query: '',
  })
  const [termSearch, setTermSearch] = useState('')
  const { response, loading, reload } = useAxios<StoreResponseInterface[]>({
    url:
      search.query.length > 0
        ? `${search.url}/findStoreByName/${search.query}`
        : search.url,
    method: 'GET',
  })
  let timeout: any = null

  const handleChange = (event: any) => {
    const { value } = event.target
    setSearch({
      ...search,
      query: value,
    })
    /* clearTimeout(timeout)
    timeout = setTimeout(() => {
      reload()
    }, 1000) */
  }

  /*   useEffect(() => {
    reload()
  }, [termSearch])
 */
  function handleSubmit(event: any) {
    event.preventDefault()
    reload()
  }
  return (
    <div className="ListStore__container">
      <H2 textAlign="start" fontSize="1.3rem" fontWeight="bold">
        Listado de tiendas
      </H2>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__wrapper">
          <input
            type="text"
            name="searchTerm"
            placeholder="Buscar tienda por nombre"
            onChange={handleChange}
            value={search.query}
            className="search-form__input"
          />
          <button type="submit" className="search-form__button">
            <FaSearch size={15} />
          </button>
        </div>
      </form>
      <ArrayDataComponent
        data={response}
        loading={loading}
        noResultsComponent={<NotFound searchTerm={search.query} />}
        renderComponent={(data) => (
          <div className="ListStore__container--stores">
            {data?.map((res, i) => (
              <StoreCard store={res} key={i} />
            ))}
          </div>
        )}
      />
    </div>
  )
}
