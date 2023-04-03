import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { Navigate, useNavigate } from 'react-router-dom'
import { getAction } from '../provider/action/ActionAuthorization'
import { useEffect, useState } from 'react'
import { startSession } from '../store/slices/slices'
import { validateStatus } from '../utils/utils'
import { Loading } from '../components/loadings/Loading'

export const PublicRoutes = ({ children }: any) => {
  const { isLogged } = useSelector((state: RootState) => state.authSlice)

  /* const navigate = useNavigate() */
  if (isLogged) {
    return children
  } else {
    return <Navigate to="/ingresar" />
  }
}
