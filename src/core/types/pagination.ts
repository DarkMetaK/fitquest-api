type Filter<T> = Partial<T>

type SortDirection = 'asc' | 'desc'

type Sort<T> = {
  [K in keyof T]?: SortDirection
}

export type Pagination<T = unknown> = {
  page: number
  perPage: number
  filter?: Filter<T>
  orderBy?: Sort<T>
}

export type PaginationResponse<T> = {
  total: number
  data: T[]
} & Pick<Pagination<T>, 'page' | 'perPage'>
