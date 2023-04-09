import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { RootState } from '../store/store'
import { getAction } from '../provider/action/ActionAuthorization'
import { useEffect, useState } from 'react'
import { startSession } from '../store/slices/slices'
import { validateStatus } from '../utils/utils'
import { Loading } from '../components/loadings/Loading'
import LoadingWihLogo from '../components/loadings/LoadingWithLogo'

export const ProtectedRoutes = ({ children }: any) => {
  const { isLogged } = useSelector((state: RootState) => state.authSlice)
  const [isTokenVerified, setIsTokenVerified] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function verifyTokenValidation() {
    getAction('auth/verifyToken')
      .then((res: any) => {
        if (!validateStatus(res.status)) {
          navigate('/ingresar')
        } else {
          dispatch(startSession({ token: res.data.token }))
        }
      })
      .catch((err: any) => {
        navigate('/ingresar')
      })
      .finally(() => {
        setIsTokenVerified(true)
      })
  }
  useEffect(() => {
    verifyTokenValidation()
  }, [isLogged])
  if (!isTokenVerified) {
    return <LoadingWihLogo />
  } else if (!isLogged) {
    return <Navigate to="/ingresar" />
  } else {
    return children
  }
}
