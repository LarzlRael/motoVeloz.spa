import * as Yup from 'yup'
import { InputJsonI } from '../interfaces/Globalnterfaces'
import { departamentos } from './infoData'

export const firstExample: InputJsonI[] = [
  {
    type: 'text',
    name: 'firstName',
    placeholder: 'Fernando',
    label: 'First Name',
    initialValue: '',
    validate: Yup.string()
      .required('Campo requerido')
      .min(2, 'Minimo 2 caracteres'),
  },
  {
    type: 'text',
    name: 'firstName',
    placeholder: 'Fernando',
    label: 'First Name',
    initialValue: '',
    validate: Yup.string()
      .required('Campo requerido')
      .min(2, 'Minimo 2 caracteres'),
  },
]

export const storeAddOrEditForm: InputJsonI[] = [
  {
    name: 'storeName',
    type: 'text',
    placeholder: 'Ingrese el nombre de la Tienda',
    label: 'Nombre de la Tienda',
    initialValue: '',
    validate: Yup.string().required('Campo requerido'),
  },
  {
    type: 'url',
    name: 'storeUrl',
    placeholder: 'Ingrese la url de la tienda',
    label: 'URL de la tienda',
    initialValue: '',
    validate: Yup.string().required('Campo requerido'),
  },
  {
    type: 'url',
    name: 'imageUrl',
    placeholder: 'Ingrese la url de la imagen de la tienda',
    label: 'URL de la imagen de la tienda',
    initialValue: '',
  },
  {
    name: 'storeDescription',
    type: 'area',
    placeholder: 'Ingrese una descripcion',
    label: 'Descripción',
    initialValue: '',
    validate: null,
  },
  {
    name: 'storeAddress',
    type: 'text',
    placeholder: 'Ingrese la direccion',
    label: 'Dirección',
    initialValue: '',
    validate: null,
  },
  {
    name: 'storePhone',
    type: 'tel',
    placeholder: 'Ingrese el telefono',
    label: 'Telefono',
    initialValue: '',
  },
  {
    name: 'image',
    type: 'file',
    placeholder: 'Ingrese la imagen (opcional)',
    label: 'Subir imagen',
    initialValue: '',
  },
]
