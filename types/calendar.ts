export interface Event {
  id: string
  title: string
  date: string // YYYY-MM-DD format
  time: string // HH:MM format
  duration: number // in minutes
  category: string
  description?: string
}