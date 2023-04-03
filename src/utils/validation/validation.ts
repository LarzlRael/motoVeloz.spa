export const validateArray = (dataArray: any[]) => {
  return dataArray ? (dataArray.length !== 0 ? true : false) : false
}

