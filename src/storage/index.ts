import type { Member, Schedule, Vacation } from '../types'

const STORAGE_KEYS = {
  MEMBERS: 'dienstplan_members',
  VACATIONS: 'dienstplan_vacations',
  SCHEDULES: 'dienstplan_schedules',
} as const

export function loadMembers(): Member[] {
  const data = localStorage.getItem(STORAGE_KEYS.MEMBERS)
  return data ? JSON.parse(data) : []
}

export function saveMembers(members: Member[]): void {
  localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(members))
}

export function loadVacations(): Record<string, Vacation> {
  const data = localStorage.getItem(STORAGE_KEYS.VACATIONS)
  return data ? JSON.parse(data) : {}
}

export function saveVacations(vacations: Record<string, Vacation>): void {
  localStorage.setItem(STORAGE_KEYS.VACATIONS, JSON.stringify(vacations))
}

export function loadSchedules(): Record<string, Schedule> {
  const data = localStorage.getItem(STORAGE_KEYS.SCHEDULES)
  return data ? JSON.parse(data) : {}
}

export function saveSchedules(schedules: Record<string, Schedule>): void {
  localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules))
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEYS.MEMBERS)
  localStorage.removeItem(STORAGE_KEYS.VACATIONS)
  localStorage.removeItem(STORAGE_KEYS.SCHEDULES)
}