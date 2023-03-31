import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Loading } from '../../components/loadings/Loading'
import useAxios from '../../hooks/useAxios'
import { StoreResponseInterface } from '../../interfaces/ResponseInterfaces'
import { GlobalForm } from '../../components/forms/GlobalForm'
import { storeAddOrEditForm } from '../../data/formsPatterns'
import {
  putAction,
  deleteAction,
} from '../../provider/action/ActionAuthorization'
import { validateStatus } from '../../utils/utils'

export const EditStore = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loadingServer, setLoadingServer] = useState(false)
  const { response, loading, reload } = useAxios<StoreResponseInterface>({
    url: `stores/${id}`,
    method: 'GET',
  })
  const [loadingForm, setloadingForm] = useState(false)
  async function onSubmit(values: any) {
    setLoadingServer(true)
    putAction(`/stores/${id}`, values)
      .then((res: any) => {
        setLoadingServer(false)
        if (validateStatus(res.status)) {
          console.log('Editado :D')
          reload()
        } else {
          setloadingForm(false)
        }
      })
      .catch((err) => {
        setloadingForm(false)
        console.log(err)
      })
  }

  async function handleDeleteStore() {
    setloadingForm(true)
    deleteAction(`/stores/${id}`)
      .then((res: any) => {
        setLoadingServer(false)
        if (validateStatus(res.status)) {
          console.log('Eliminado :D')
          navigate(-1)
        } else {
          setloadingForm(false)
        }
      })
      .catch((err) => {
        setloadingForm(false)
        console.log(err)
      })
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div onClick={handleDeleteStore}>Eliminar pyme</div>
          <GlobalForm
            data={response}
            inputJson={storeAddOrEditForm}
            onSubmit={onSubmit}
            loading={loadingForm}
            formTitle="Editar Pyme"
          />
        </>
      )}
    </div>
  )
}
