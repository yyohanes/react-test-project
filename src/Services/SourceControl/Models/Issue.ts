import { User } from './User'
import { Label } from './Label'

export type Issue = {
  id: number | string
  reference: number | string
  title: string
  body: string
  url: string
  state: string
  createdAt: Date
  updatedAt: Date
  labels: Label[]
  user: User
}
