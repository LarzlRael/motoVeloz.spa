import { useEffect } from 'react'
import { postAction } from '../provider/action/ActionAuthorization'
import { useDispatch } from 'react-redux'
import { startSession, logOutSession } from '../store/slices/slices'
import { validateStatus } from '../components/utils/utils'
import { useRouter } from 'next/navigation'

export const useVerifyLogginHook = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  function checkToken() {
    postAction('/auth/renewToken', {})
      .then((res: any) => {
        if (validateStatus(res.status)) {
          dispatch(startSession({ token: res.data.accessToken }))
          window.localStorage.setItem('token', res.data.accessToken)
          /* router.push('/auth/adminDashboard') */
        } else {
          dispatch(logOutSession())
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch(logOutSession())
        router.push('/auth/login')
      })
  }
  useEffect(() => {
    checkToken()
  }, [])
}
