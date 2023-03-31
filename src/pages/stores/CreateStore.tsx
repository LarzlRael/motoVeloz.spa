import { GlobalForm } from '../../components/forms/GlobalForm'
import { storeAddOrEditForm } from '../../data/formsPatterns'
import { useState } from 'react'
import { postAction } from '../../provider/action/ActionAuthorization'
import { validateStatus } from '../../utils/utils'

export const CreateStore = () => {
  const [loading, setloading] = useState(false)
  async function onSubmit(values: any) {
    setloading(true)

    postAction('/stores', values)
      .then((res: any) => {
        setloading(false)
        if (validateStatus(res.status)) {
          console.log('ok :D')
        } else {
          setloading(false)
        }
      })
      .catch((err) => {
        setloading(false)
        console.log(err)
      })

    /* if (validateStatus(action.status)) {
      dispatch(startSession({ token: action.data.token }))
      window.localStorage.setItem('token', action.data.token.accessToken)
      push('/auth/adminDashboard')
    } else {
      console.log('login fail')
    } */
  }
  return (
    <div>
      <GlobalForm
        inputJson={storeAddOrEditForm}
        onSubmit={onSubmit}
        formTitle="Registrar Pyme"
        loading={loading}
      />
    </div>
  )
}
