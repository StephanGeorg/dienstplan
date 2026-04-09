import { createSignal, batch } from 'solid-js'
import type { Vacation } from '../types'
import { loadVacations, saveVacations } from '../storage'

const [vacations, setVacations] = createSignal<Map<string, Vacation>>(
  new Map(Object.entries(loadVacations()))
)

export { vacations }

export function getVacationKey(memberId: string, date: string): string {
  return `${memberId}_${date}`
}

export function isOnVacation(memberId: string, date: string): boolean {
  return vacations().has(getVacationKey(memberId, date))
}

export function addVacation(
  memberId: string,
  date: string,
  note?: string
): void {
  const key = getVacationKey(memberId, date)
  const vacation: Vacation = { memberId, date, note }

  batch(() => {
    const newMap = new Map(vacations())
    newMap.set(key, vacation)
    setVacations(newMap)
    saveVacations(Object.fromEntries(newMap))
  })
}

export function removeVacation(memberId: string, date: string): void {
  const key = getVacationKey(memberId, date)

  batch(() => {
    const newMap = new Map(vacations())
    newMap.delete(key)
    setVacations(newMap)
    saveVacations(Object.fromEntries(newMap))
  })
}

export function toggleVacation(
  memberId: string,
  date: string,
  note?: string
): void {
  if (isOnVacation(memberId, date)) {
    removeVacation(memberId, date)
  } else {
    addVacation(memberId, date, note)
  }
}

export function getVacationsForMember(memberId: string): Vacation[] {
  return [...vacations().values()].filter((v) => v.memberId === memberId)
}

export function getVacationsForMemberInMonth(
  memberId: string,
  month: string
): Vacation[] {
  return getVacationsForMember(memberId).filter((v) => v.date.startsWith(month))
}

export function getVacation(memberId: string, date: string): Vacation | undefined {
  return vacations().get(getVacationKey(memberId, date))
}