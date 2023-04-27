import { GlobalForm } from '../../components/forms/GlobalForm'
import { storeAddOrEditForm } from '../../data/formsPatterns'
import { useState } from 'react'
import { postAction } from '../../provider/action/ActionAuthorization'
import { validateStatus } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './EditStore.scss'
import { processFormAppendData } from '../../utils/processData'
import BackIcon from '../../components/boxex/BackIcon'
export const CreateStore = () => {
  const [loading, setloading] = useState(false)
  const navigator = useNavigate()

  async function onSubmit(values: any) {
    setloading(true)

    postAction('/stores', processFormAppendData(values))
      .then((res: any) => {
        setloading(false)
        if (validateStatus(res.status)) {
          navigator(-1)
          toast.success('Negocio añadido correctamente!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          })
        } else {
          setloading(false)
        }
      })
      .catch((err) => {
        setloading(false)
        console.log(err)
      })
  }

  return (
    <div className="CreateStore">
      <BackIcon />
      <div className="CreateStore__form--container">
        <GlobalForm
          inputJson={storeAddOrEditForm}
          onSubmit={onSubmit}
          formTitle="Registrar Negocio"
          loading={loading}
        />
      </div>
    </div>
  )
}
