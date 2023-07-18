import React, { ReactElement } from 'react'
import { isValidArray } from '../../utils/validation/validation'
import LoadingWihLogo from '../loadings/LoadingWithLogo'

interface ArrayDataComponentProps<T> {
  data: T[]
  renderComponent: (data: T[]) => ReactElement
  noResultsComponent?: ReactElement
  loading?: boolean
}

function ArrayDataComponent<T>({
  data,
  renderComponent,
  noResultsComponent = <div>No results found</div>,
  loading = false,
}: ArrayDataComponentProps<T>): ReactElement {
  if (loading) {
    return <LoadingWihLogo />
  }

  if (!isValidArray(data)) {
    return noResultsComponent
  }

  return renderComponent(data)
}

export default ArrayDataComponent
