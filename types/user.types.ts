export interface UserRecord {
  id: string
  firstName: string | null
  lastName: string | null
  email: string | null
  role: string
  createdAt: Date
}
