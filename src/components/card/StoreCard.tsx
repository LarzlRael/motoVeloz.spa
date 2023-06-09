import './StoreCard.scss'
import React from 'react'
import { StoreResponseInterface } from '../../interfaces/ResponseInterfaces'
import { P } from '../text/P'
import { useNavigate } from 'react-router-dom'
import { capitalizeFirstLetter } from '../../utils/utils'

interface StoreCardProps {
  store: StoreResponseInterface
}
export const StoreCard = ({
  store: {
    _id,
    imageUrl,
    storeName,
    storeDescription,
    storeAddress,
    storePhone,
    storeUrl,
  },
}: StoreCardProps) => {
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
      <div className="StoreCard__info-container">
        <h1 className="StoreCard__title">{capitalizeFirstLetter(storeName)}</h1>
        {<P>{capitalizeFirstLetter(storeDescription)}</P>}
        <a
          className="StoreCard__link"
          href={storeUrl}
          target="_blank"
          rel="noreferrer"
        >
          {storeUrl.length > 30 ? storeUrl.slice(0, 35) + '...' : storeUrl}
        </a>
        {<P>{capitalizeFirstLetter(storeAddress)}</P>}
      </div>
    </div>
  )
}
