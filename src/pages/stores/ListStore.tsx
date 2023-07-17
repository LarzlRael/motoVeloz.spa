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
import { FloatingActionButton } from '../../components/Buttons/FloatingActionButton'
import { useNavigate, useNavigation } from 'react-router-dom'
export const ListStore = () => {
  const navigator = useNavigate()
  const [querySearch, setQuerySearch] = useState('')
  const { response, loading, reload } = useAxios<StoreResponseInterface[]>({
    url:
      querySearch.length > 0
        ? `/stores/findStoreByName/${querySearch}`
        : '/stores',
    method: 'GET',
  })

  useEffect(() => {
    reload()
  }, [querySearch])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    reload()
  }

  return (
    <div className="ListStore__container">
      <H2
        textAlign="start"
        fontSize="1.3rem"
        fontWeight="bold"
        color="var(--color-text)"
      >
        Listado de tiendas
      </H2>
      {/* <form className="search-form" onSubmit={(e) => onSubmitFormDebounced(e)}>
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
      </form> */}
      <FloatingActionButton onClick={() => navigator('/dashboard/crear')} />
      <SearchInput
        onDebounce={(value) => setQuerySearch(value)}
        placeholder="Buscar tienda por nombre"
        callback={reload}
      />
      <ArrayDataComponent
        data={response}
        loading={loading}
        noResultsComponent={
          <NotFound
            searchTerm={querySearch}
            title={`No se encontró ningún resultado para "${querySearch}"`}
            subtitle="Lo siento, no se encontraron resultados para su búsqueda."
            showButtonBack={false}
          />
        }
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
