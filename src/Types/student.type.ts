export interface StudentType {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  country: string
  avatar: string
  btc_address: string
}
export type StudentListType = Pick<StudentType, 'id' | 'avatar' | 'last_name' | 'email'>[]
