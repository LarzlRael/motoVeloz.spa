import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
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
import { FaTrashAlt } from 'react-icons/fa'

import './EditStore.scss'
import { H2 } from '../../components/text'
import { StoreCard } from '../../components/card/StoreCard'

import { processFormAppendData } from '../../utils/processData'
import LoadingWihLogo from '../../components/loadings/LoadingWithLogo'
import Swal from 'sweetalert2'
import NotFound from '../../components/notFound/NotFound'
import BackIcon from '../../components/boxex/BackIcon'
import { StoreCardDetail } from '../../components/card/StoreCardDetail'
import BoxFlex from '../../components/boxex/BoxFlex'
import { Spacer } from '../../components/boxex/Spacer'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'

export const EditStore = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loadingServer, setLoadingServer] = useState(false)

  const { response, loading, reload, error } = useAxios<StoreResponseInterface>(
    {
      url: `stores/${id}`,
      method: 'GET',
    },
  )
  useDocumentTitle(loading ? 'Cargando...' : response!.storeName!!)

  async function onSubmit(values: any) {
    setLoadingServer(true)
    putAction(`/stores/${id}`, processFormAppendData(values))
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
          /* navigate(-1) */
        } else {
          setLoadingServer(false)
        }
      })
      .catch((err) => {
        setLoadingServer(false)
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
      if (result.isConfirmed) {
        setLoadingServer(true)
        deleteAction(`/stores/${id}`)
          .then((res: any) => {
            setLoadingServer(false)
            if (validateStatus(res.status)) {
              console.log('Eliminado :D')
              navigate(-1)
            } else {
              setLoadingServer(false)
            }
          })
          .catch((err) => {
            setLoadingServer(false)
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
        <LoadingWihLogo />
      ) : !error ? (
        <div className="EditStore__container">
          <div className="EditStore__appbar animate__animated animate__fadeIn">
            <BoxFlex direction="row">
              <img
                src={response.imageUrl}
                className="EditStore__appbar--logo"
                alt={response.storeName}
              />
              <H2 color="white" fontWeight="bold" fontSize="1rem">
                {response.storeName?.toLocaleUpperCase()}
              </H2>
            </BoxFlex>
            <Spacer />

            <FaTrashAlt
              size={25}
              color="white"
              className="pointer"
              onClick={handleDeleteStore}
            />
          </div>
          <div
            style={{
              padding: '1rem',
            }}
          >
            <BackIcon
              onClick={() => {
                navigate(-1)
              }}
            />
            <div className="EditStore__form--container animate__animated animate__fadeIn">
              <GlobalForm
                data={response}
                inputJson={storeAddOrEditForm}
                onSubmit={onSubmit}
                loading={loadingServer}
                formTitle="Editar negocio"
                titleButton="Editar"
              />
              <div
                style={{
                  width: '300px',
                  height: '300px',
                  margin: '0 auto',
                }}
              >
                {/* <StoreCardDetail store={response} /> */}
                <StoreCard
                  store={response}
                  selectedItem={({ storeUrl }) => {
                    window.open(storeUrl, '_blank')
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NotFound
          searchTerm="Esta busqueda"
          showButtonBack={false}
          subtitle=""
          title=""
        />
      )}
    </div>
  )
}
