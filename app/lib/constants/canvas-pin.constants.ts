import { DISTRICT_BOUNDARY } from './district-boundary.constants'

export const LIBRARIES: 'places'[] = ['places']

export // Dark map style — matches ZVM theme
const MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#0a0010' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#9d7fc4' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0a0010' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#2d0060' }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#9d7fc4' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#c084fc' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#9d7fc4' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#1a0033' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#3d1a6e' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1e0038' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#2d0060' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9d7fc4' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3d1a6e' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#2d0060' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#c084fc' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#1a0033' }] },
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#9d7fc4' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#050008' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d1a6e' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] }
]

export const LIGHT_MAP_STYLES = [
  { elementType: 'geometry', stylers: [{ color: '#f3f0f8' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#3d1a6e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#ddd6f3' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#5b2d8e' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#e8e2f5' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#ddd6f3' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#6b5a8a' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e8e2f5' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#ddd6f3' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#5b2d8e' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c8b8e8' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9d7fc4' }] }
]

// Centered on Lynn MA — 9th Essex District
export const CENTER = { lat: 42.4839575, lng: -71.0251375 } // 9th Essex centroid from Census data
export const ZOOM = 13

export const STATUS_CONFIG = {
  knocked: {
    label: 'Knocked',
    color: '#00e5ff',
    bg: 'bg-secondary-light dark:bg-secondary-dark',
    border: 'border-secondary-light dark:border-secondary-dark',
    text: 'text-secondary-light dark:text-secondary-dark'
  },
  no_answer: {
    label: 'No Answer',
    color: '#9d7fc4',
    bg: 'bg-muted-light dark:bg-muted-dark',
    border: 'border-muted-light dark:border-muted-dark',
    text: 'text-muted-light dark:text-muted-dark'
  },
  interested: {
    label: 'Interested',
    color: '#a855f7',
    bg: 'bg-primary-light dark:bg-primary-dark',
    border: 'border-primary-light dark:border-primary-dark',
    text: 'text-primary-light dark:text-primary-dark'
  },
  hostile: { label: 'Hostile', color: '#ef4444', bg: 'bg-red-500', border: 'border-red-500', text: 'text-red-500' }
}

export const DISTRICT_BOUNDS = DISTRICT_BOUNDARY.reduce(
  (bounds, coord) => ({
    north: Math.max(bounds.north, coord.lat),
    south: Math.min(bounds.south, coord.lat),
    east: Math.max(bounds.east, coord.lng),
    west: Math.min(bounds.west, coord.lng)
  }),
  { north: -90, south: 90, east: -180, west: 180 }
)

export const PRIMARY_DATE = new Date('2026-09-01')
