import React, { ReactElement } from 'react'
import { isValidArray } from '../../utils/validation/validation'
import LoadingWihLogo from '../loadings/LoadingWithLogo'

interface ArrayDataComponentProps<T> {
  data: T[]
  initialData?: T[]
  renderComponent: (data: T[]) => ReactElement
  noResultsComponent?: ReactElement
  loading?: boolean
}

function ArrayDataComponent<T>({
  data,
  renderComponent,
  noResultsComponent = <div>No results found</div>,
  loading = false,
  initialData,
}: ArrayDataComponentProps<T>): ReactElement {
  console.log(initialData)

  if (loading) {
    return <LoadingWihLogo />
  }

  if (!isValidArray(data)) {
    return noResultsComponent
  }
  if (initialData && !isValidArray(initialData)) {
    return renderComponent(initialData)
  }
  return renderComponent(data)
}

export default ArrayDataComponent
