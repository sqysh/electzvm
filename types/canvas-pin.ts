export interface CanvassPin {
  id: string
  lat: number
  lng: number
  address: string | null
  status: 'knocked' | 'no_answer' | 'interested' | 'hostile'
  doors: number
  notes: string | null
  canvassedBy: string | null
  createdAt: Date
}

export interface PendingPin {
  lat: number
  lng: number
  address?: string
}
