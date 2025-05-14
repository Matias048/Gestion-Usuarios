export interface Userpaginated {
  content: User[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  first: boolean
  size: number
  number: number
  sort: Sort2
  numberOfElements: number
  empty: boolean
}

export interface User {
  id: number
  name: string
  surname: string
  email: string
  roleId: number
  roleName: string
  version: number
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export interface Sort2 {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

