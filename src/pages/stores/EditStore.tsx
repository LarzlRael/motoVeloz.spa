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
import { validateStatus, capitalizeFirstLetter } from '../../utils/utils'
import { toast } from 'react-toastify'
import { FaEye, FaTrashAlt } from 'react-icons/fa'

import './EditStore.scss'
import { H2 } from '../../components/text'
import { StoreCard } from '../../components/card/StoreCard'
import Swal from 'sweetalert2'
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
          reload()
          toast.info('Negocio editado correctamente', {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
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

  async function handleDeleteStore() {
    Swal.fire({
      title: '¿Estás seguro de Eliminar este negocio?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
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
      } else if (result.isDenied) {
        /* Swal.fire('Changes are not saved', '', 'info') */
      }
    })
  }
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="EditStore__appbar">
            <H2 color="white" fontWeight="bold">
              {response.storeName?.toLocaleUpperCase()}
            </H2>
            <div>
              <FaEye size={30} color="white" />
              <FaTrashAlt
                size={30}
                color="white"
                className="pointer"
                onClick={handleDeleteStore}
              />
            </div>
          </div>
          {/* <div onClick={handleDeleteStore}>Eliminar pyme</div> */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
              padding: '1.5rem',
            }}
          >
            <GlobalForm
              data={response}
              inputJson={storeAddOrEditForm}
              onSubmit={onSubmit}
              loading={loadingServer}
              formTitle="Editar negocio"
              titleButton="Editar"
            />
            <StoreCard store={response} />
          </div>
        </>
      )}
    </div>
  )
}
