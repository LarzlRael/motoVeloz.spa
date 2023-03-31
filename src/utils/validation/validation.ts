import { PymesResponseInterface } from '../../../interfaces/pymesResponseInterface'
export const validateArray = (dataArray: any[]) => {
  return dataArray ? (dataArray.length !== 0 ? true : false) : false
}

export const preconfigArray = (
  array: PymesResponseInterface[],
): PymesResponseInterface[] => {
  return array?.map((item) => {
    if (item.urlImages.length !== 0) {
      const imagesConverted = item.urlImages.map((image, i) => {
        const splitString = image.split('upload/')
        let resizeImage = `${splitString[0]}upload/c_scale,w_300/${splitString[1]}`
        return (item.urlImages[i] = resizeImage)
      })
      return { ...item, urlImages: imagesConverted }
    }
    return { ...item }
  })
}
