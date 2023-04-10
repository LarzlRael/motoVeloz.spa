import LoadingWihLogo from '../loadings/LoadingWithLogo'
import NotFound from '../notFound/NotFound'

interface ShowDataComponent {
  loading: boolean
  error: boolean
  children: React.ReactNode
}
export function ShowDataComponent({
  loading,
  error,
  children,
}: ShowDataComponent) {
  return (
    <div>
      {loading ? (
        <LoadingWihLogo />
      ) : !error ? (
        <>{children}</>
      ) : (
        <NotFound searchTerm="Esta busqueda" />
      )}
    </div>
  )
}
