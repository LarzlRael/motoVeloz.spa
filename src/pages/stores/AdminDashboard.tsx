import React, { useState, useEffect } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { IconContext } from 'react-icons'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'

import {
  Link,
  Route,
  Routes,
  BrowserRouter as Router,
  useNavigate,
} from 'react-router-dom'
import { useWindowSize } from '../../hooks/useWindows'
import { accountsLink } from '../../data/infoData'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { RootState } from '../../store/store'
import { logOutSession } from '../../store/slices/slices'

import './AdminDashboard.scss'
import { CreateStore } from './CreateStore'
import { ListStore } from './ListStore'
import { EditStore } from './EditStore'
export const AdminDashBoard = () => {
  const { isLogged } = useSelector((state: RootState) => state.authSlice)
  const [openMenu, setOpenMenu] = useState(false)

  /* hooks */
  const router = useNavigate()
  const dispatch = useDispatch()
  const { windowSize } = useWindowSize()

  /* Functions */
  const handleToogleMenu = () => {
    setOpenMenu(!openMenu)
  }
  useEffect(() => {
    if (windowSize.width < 768) {
      setOpenMenu(true)
    } else {
      setOpenMenu(false)
    }
  }, [windowSize.width])

  /* Logout effet */
  /*  useEffect(() => {
    if (!isLogged) {
      router('/auth/login')
    }
  }, [isLogged])
 */
  useDocumentTitle('dashboard')

  const goToLink = () => {
    if (windowSize.width < 768) {
      handleToogleMenu()
    }
  }
  return (
    <div>
      <div className="toolbar">
        <IconContext.Provider
          value={{ className: 'Sidebar__icon1', size: '2.5rem' }}
        >
          <div onClick={() => setOpenMenu(!openMenu)}>
            {!openMenu ? <FaTimes /> : <FaBars />}
          </div>
        </IconContext.Provider>

        <h4>Panel de administracion</h4>
      </div>
      <div className="AdminDashBoard">
        <div
          className={`AdminDashBoard__dash ${
            openMenu ? 'open-menu' : 'close-menu'
          }`}
        >
          <div className="profile-image">
            <img
              className="profile-image-img"
              src="https://t4.ftcdn.net/jpg/03/40/12/49/360_F_340124934_bz3pQTLrdFpH92ekknuaTHy8JuXgG7fi.jpg"
              alt=""
            />
            <span className="profile-image-name">Nombre de Usuario</span>
          </div>
          <div className="AdminDashBoard__dash--group">
            {accountsLink.map(({ title_group, items }) => (
              <div key={uuidv4()}>
                <span className="title-dash">{title_group}</span>

                {items.map(({ to, icon, title }, index) => (
                  <div onClick={goToLink} key={index}>
                    <Link key={uuidv4()} to={to}>
                      <div className="AdminDashBoard__dash--item">
                        {icon}
                        <span
                          style={{
                            marginLeft: '10px',
                          }}
                        >
                          {title}
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <span className="title-dash"></span>
          <div
            className="AdminDashBoard__dash--group"
            onClick={() => dispatch(logOutSession())}
          >
            <ul className="AdminDashBoard__dash--item">Salir</ul>
          </div>
        </div>
        <div className="dash-content">
          <Routes>
            <Route path="crear" element={<CreateStore />} />
            <Route path="listar" element={<ListStore />} />
            <Route path="editarTienda/:id" element={<EditStore />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
