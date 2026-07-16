import { CanvassPin } from '@prisma/client'

export function exportPinsToCSV(pins: CanvassPin[]) {
  const headers = ['Address', 'Status', 'Doors', 'Canvasser', 'Notes', 'Date']

  const rows = pins.map((pin) => [
    pin.address ?? `${pin.lat.toFixed(6)}, ${pin.lng.toFixed(6)}`,
    pin.status,
    pin.doors,
    pin.canvassedBy ?? '',
    pin.notes ?? '',
    new Date(pin.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    })
  ])

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `canvass-export-${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
