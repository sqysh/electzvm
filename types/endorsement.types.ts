export interface Endorsement {
  id: string
  name: string
  title: string | null
  organization: string | null
  imageUrl: string | null
  isPublished: boolean
  createdAt: Date
}

export interface EndorsementFormState {
  name: string
  title: string
  organization: string
  imageUrl: string
  isPublished: boolean
}
