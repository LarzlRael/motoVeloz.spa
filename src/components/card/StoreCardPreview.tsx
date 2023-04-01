import './StoreCard.scss'
import React from 'react'
import { StoreResponseInterface } from '../../interfaces/ResponseInterfaces'
import { P } from '../text/P'
import { useNavigate } from 'react-router-dom'

interface StoreCarPreviewProps {
  store: StoreResponseInterface
}
export const StoreCardPreview = ({
  store: { _id, imageUrl, storeName, storeDescription },
}: StoreCarPreviewProps) => {
  const navigate = useNavigate()
  function handleGo() {
    navigate(`/dashboard/editarTienda/${_id}`)
  }
  const renderImage = imageUrl
    ? imageUrl
    : 'https://www.abc.net.au/news/image/12000000'

  return (
    <div onClick={handleGo} className="StoreCard pointer">
      <img
        className="StoreCard__img"
        src={renderImage}
        alt={storeDescription ?? storeName}
      />
      <h1 className="StoreCard__title">{storeName}</h1>
      {<P>{storeDescription}</P>}
    </div>
  )
}
