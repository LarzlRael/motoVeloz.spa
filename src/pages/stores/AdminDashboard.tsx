import { useState, useEffect, useRef } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { IconContext } from 'react-icons'
import { FaBars, FaPowerOff, FaTimes } from 'react-icons/fa'
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
import '../../styles/_media.scss'
import { CreateStore } from './CreateStore'
import { ListStore } from './ListStore'
import { EditStore } from './EditStore'
import { PushNotifications } from './PushNotifications'
import { Account } from '../auth/Account'
import { H2 } from '../../components/text'
import { appLogo } from '../../data/constants'
import Page404 from '../../components/notFound/Page404'
import { NavLink } from 'react-router-dom'
import { Spacer } from '../../components/boxex/Spacer'
export const AdminDashBoard = () => {
  const [isOpenMenu, setOpenMenu] = useState(false)

  /* hooks */
  const dispatch = useDispatch()
  const { windowSize } = useWindowSize()
  const dropdownRef = useRef<HTMLDivElement>(null)
  /* Functions */
  const handleToogleMenu = () => {
    if (isOpenMenu) {
      setOpenMenu(false)
    } else {
      setOpenMenu(true)
    }
  }
  useEffect(() => {
    if (windowSize.width < 768) {
      setOpenMenu(false)
    } else {
      setOpenMenu(true)
    }
  }, [windowSize.width])
  const [titleDocumento, setTitleDocumento] = useState('Adminstracion')
  useDocumentTitle(titleDocumento)

  const goToLink = (title: string) => {
    if (windowSize.width < 768) {
      handleToogleMenu()
    }
    setTitleDocumento(title)
  }

  /*   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        console.log(isOpenMenu)
        setOpenMenu(false)
        console.log(isOpenMenu)
        console.log('outside')
      } else {
        console.log('inside')
      }
    }

    // Agrega el event listener cuando el componente está montado
    window.addEventListener('click', handleClickOutside)

    // Elimina el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, []) */
  return (
    <div
      style={{
        height: '100%',
      }}
    >
      <div className="toolbar">
        <IconContext.Provider
          value={{ className: 'Sidebar__icon1', size: '1rem' }}
        >
          <div onClick={handleToogleMenu}>
            {isOpenMenu ? <FaTimes /> : <FaBars />}
          </div>
        </IconContext.Provider>
        <img
          src={appLogo}
          style={{
            margin: '0 0 0 0.5rem',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '5px',
          }}
        />
        <H2
          margin="0 0 0 0.5rem"
          color="white"
          textAlign="left"
          className="toolbar__title"
        >
          Panel de administración
        </H2>
      </div>
      <div className="AdminDashBoard">
        <div
          ref={dropdownRef}
          className={`AdminDashBoard__dash ${
            isOpenMenu ? 'opened-menu' : 'closed-menu'
          }`}
        >
          <div className="profile-image">
            <img className="profile-image-img" src={appLogo} alt="" />
            <span className="profile-image-name">RockerOscar</span>
          </div>
          <div className="AdminDashBoard__dash--group">
            {accountsLink.map(({ title_group, items }) => (
              <div key={uuidv4()}>
                <span className="title-dash">{title_group}</span>
                {items.map(({ to, icon, title }, index) => (
                  <div onClick={() => goToLink(title)} key={uuidv4()}>
                    <NavLink
                      to={to}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      {({ isActive }) => (
                        <div
                          className={
                            isActive
                              ? 'AdminDashBoard__dash--item active '
                              : 'AdminDashBoard__dash--item'
                          }
                        >
                          {icon}
                          <span
                            style={{
                              marginLeft: '10px',
                            }}
                          >
                            {title}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Spacer />

          <div
            className="AdminDashBoard__dash--group"
            onClick={() => dispatch(logOutSession())}
          >
            <div className="AdminDashBoard__dash--item">
              <FaPowerOff color="white" size="20" />
              <span
                style={{
                  marginLeft: '10px',
                  fontWeight: '400',
                  fontSize: '0.9rem',
                  textTransform: 'none',
                }}
              >
                Cerrar sesión
              </span>
            </div>
          </div>
        </div>
        <div className="AdminDashBoard__dash--maincontent">
          <Routes>
            <Route path="/" element={<ListStore />} />
            <Route path="crear" element={<CreateStore />} />
            <Route path="account" element={<Account />} />
            <Route path="listar" element={<ListStore />} />
            <Route path="editarTienda/:id" element={<EditStore />} />
            <Route path="pusNotifications" element={<PushNotifications />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
