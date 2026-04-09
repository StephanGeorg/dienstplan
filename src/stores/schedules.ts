import { createSignal, batch } from 'solid-js'
import type { Schedule, ScheduleDay, DayStatus } from '../types'
import { loadSchedules, saveSchedules } from '../storage'

const [schedules, setSchedules] = createSignal<Map<string, Schedule>>(
  new Map(Object.entries(loadSchedules()))
)

function getCurrentMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

const [currentMonth, setCurrentMonth] = createSignal<string>(getCurrentMonth())

export { schedules, currentMonth, setCurrentMonth }

export function getSchedule(month: string): Schedule | undefined {
  return schedules().get(month)
}

export function currentSchedule(): Schedule | undefined {
  return getSchedule(currentMonth())
}

export function saveSchedule(schedule: Schedule): void {
  batch(() => {
    const newMap = new Map(schedules())
    newMap.set(schedule.month, schedule)
    setSchedules(newMap)
    saveSchedules(Object.fromEntries(newMap))
  })
}

export function deleteSchedule(month: string): void {
  batch(() => {
    const newMap = new Map(schedules())
    newMap.delete(month)
    setSchedules(newMap)
    saveSchedules(Object.fromEntries(newMap))
  })
}

export function getScheduleDay(month: string, day: number): ScheduleDay | undefined {
  const schedule = getSchedule(month)
  return schedule?.days.find((d) => d.day === day)
}

export function updateScheduleDay(
  month: string,
  day: number,
  updates: Partial<ScheduleDay>
): void {
  const schedule = getSchedule(month)
  if (!schedule) return

  batch(() => {
    const newDays = schedule.days.map((d) =>
      d.day === day ? { ...d, ...updates } : d
    )
    saveSchedule({ ...schedule, days: newDays })
  })
}

export function setDayAssignment(
  month: string,
  day: number,
  memberId: string | null,
  status: DayStatus
): void {
  const schedule = getSchedule(month)
  if (!schedule) return

  batch(() => {
    const newDays = schedule.days.map((d) =>
      d.day === day ? { ...d, memberId, status, violations: [] } : d
    )
    saveSchedule({ ...schedule, days: newDays })
  })
}

export function hasSchedule(month: string): boolean {
  return schedules().has(month)
}

export function getMemberAssignments(
  month: string,
  memberId: string
): ScheduleDay[] {
  const schedule = getSchedule(month)
  if (!schedule) return []
  return schedule.days.filter((d) => d.memberId === memberId)
}

export function applyManualOverride(
  month: string,
  day: number,
  memberId: string
): void {
  setDayAssignment(month, day, memberId, 'MANUAL_OVERRIDE')
}