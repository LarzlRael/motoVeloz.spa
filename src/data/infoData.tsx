import { IoPerson } from 'react-icons/io5'
import { BsHouseAddFill } from 'react-icons/bs'
import { BiStoreAlt } from 'react-icons/bi'
import { IoNotificationsSharp } from 'react-icons/io5'

export const departamentos: OptionsI[] = [
  {
    value: '',
    key: 'Seleccione un departamento',
  },
  {
    value: 'La Paz',
    key: 'La Paz',
  },
  {
    value: 'Cochabamba',
    key: 'Cochabamba',
  },
  {
    value: 'Santa Cruz',
    key: 'Santa Cruz',
  },
  {
    value: 'Oruro',
    key: 'Oruro',
  },
  {
    value: 'Potosi',
    key: 'Potosi',
  },
  {
    value: 'Tarija',
    key: 'Tarija',
  },
  {
    value: 'Chuquisaca',
    key: 'Chuquisaca',
  },
  {
    value: 'Beni',
    key: 'Beni',
  },
  {
    value: 'Pando',
    key: 'Pando',
  },
]
export const socialNetworks = [
  'Facebook',
  'Instagram',
  'Twitter',
  'Youtube',
  'Linkedin',
  'Whatsapp',
]
export const links = [
  {
    href: '/',
    labelLink: 'Inicio',
  },
  {
    href: '/productos/confecciones',
    labelLink: 'Listado',
  },
  {
    href: '/auth/login',
    labelLink: 'Mi Cuenta',
  },
]

interface AccountsLinkInterface {
  title_group: string
  items: ItemInterface[]
}
interface ItemInterface {
  title: string
  to: string
  icon: any
}
export const accountsLink: AccountsLinkInterface[] = [
  {
    title_group: 'Usuario',
    items: [
      {
        title: 'Mi cuenta',
        to: '/dashboard/account',
        icon: <IoPerson size={25} />,
      },
    ],
  },
  {
    title_group: 'Tiendas',
    items: [
      {
        title: 'Agregar tienda',
        to: '/dashboard/crear',
        icon: <BsHouseAddFill size={25} />,
      },
      {
        title: 'Todas las tiendas',
        to: '/dashboard/listar',
        icon: <BiStoreAlt size={25} />,
      },
    ],
  },
  {
    title_group: 'Notificaciones',
    items: [
      {
        title: 'Notificaciones push',
        to: '/dashboard/pusNotifications',
        icon: <IoNotificationsSharp size={25} />,
      },
    ],
  },
]
export interface OptionsI {
  key: string
  value: string
}
