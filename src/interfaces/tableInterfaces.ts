export interface TableHeaderI {
  key: string
  name: string
  type?:
    | 'img'
    | 'date'
    | 'actions'
    | 'a'
    | 'textColor'
    | 'textArea'
    | 'list'
    | 'action'
    | 'actions'
  color?: string
  textBtn?: string
  actions?: actionInterface[]
  action?: actionInterface
}
export interface actionInterface {
  labelTooltip: string
  action: (id: any) => void
  icon: React.ReactNode
  textBtn?: string
}
