import './StoreCard.scss'
import { StoreResponseInterface } from '../../interfaces/ResponseInterfaces'
import { P } from '../text/P'

import { capitalizeFirstLetter } from '../../utils/utils'

interface StoreCardProps {
  store: StoreResponseInterface
}
export const StoreCardDetail = ({
  store: { imageUrl, storeName, storeDescription, storeAddress, storeUrl },
}: StoreCardProps) => {
  function handleGo() {
    window.open(storeUrl, '_blank')
  }

  const renderImage = imageUrl
    ? imageUrl
    : 'https://www.abc.net.au/news/image/12000000'

  return (
    <div onClick={handleGo} className="StoreCard__detail pointer">
      <img
        className="StoreCard__img"
        src={renderImage}
        alt={storeDescription ?? storeName}
      />
      <div className="StoreCard__info-container">
        <h1 className="StoreCard__title">{capitalizeFirstLetter(storeName)}</h1>
        {<P>{capitalizeFirstLetter(storeDescription)}</P>}
        <a
          className="StoreCard__link--details"
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
