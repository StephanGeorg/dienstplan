import type { Member, ScheduleDay } from '../types'
import { isOnVacation } from '../stores/vacations'
import { formatDate, parseMonth, isWeekday, getCalendarWeek } from './date-utils'

export function getAvailableMembers(
  members: Member[],
  month: string,
  day: number
): Member[] {
  const { year, monthNumber } = parseMonth(month)
  const date = formatDate(year, monthNumber, day)
  return members.filter((m) => m.isActive && !isOnVacation(m.id, date))
}

export function hasConsecutiveConstraint(
  memberId: string,
  day: number,
  days: ScheduleDay[]
): boolean {
  const prev1 = days.find((d) => d.day === day - 1)
  const prev2 = days.find((d) => d.day === day - 2)
  const prev3 = days.find((d) => d.day === day - 3)

  const has3Consecutive =
    prev1?.memberId === memberId &&
    prev2?.memberId === memberId &&
    prev3?.memberId === memberId

  return has3Consecutive
}

export function getWeekdayCountForMember(
  memberId: string,
  weekNumber: number,
  month: string,
  days: ScheduleDay[]
): number {
  return days.filter((d) => {
    if (d.memberId !== memberId) return false
    if (!isWeekday(d.day, month)) return false
    return getCalendarWeek(d.day, month) === weekNumber
  }).length
}

export function wouldExceedWeekdayLimit(
  memberId: string,
  day: number,
  month: string,
  days: ScheduleDay[]
): boolean {
  if (!isWeekday(day, month)) return false

  const weekNumber = getCalendarWeek(day, month)
  const currentCount = getWeekdayCountForMember(memberId, weekNumber, month, days)

  return currentCount >= 1
}

export function calculateFairnessDeficit(
  memberId: string,
  memberContract: number,
  days: ScheduleDay[],
  availableMembers: Member[]
): number {
  const assignedCount = days.filter((d) => d.memberId === memberId).length
  const totalWeight = availableMembers.reduce((sum, m) => sum + m.contract, 0)
  const totalDays = days.filter((d) => d.memberId !== null).length
  const expectedShare = totalWeight > 0 ? (memberContract / totalWeight) * totalDays : 0

  return assignedCount - expectedShare
}

export interface AssignmentResult {
  memberId: string | null
  status: 'ASSIGNED' | 'CONFLICT'
  violations: string[]
}

export function selectMemberForDay(
  day: number,
  month: string,
  allMembers: Member[],
  currentDays: ScheduleDay[]
): AssignmentResult {
  const available = getAvailableMembers(allMembers, month, day)

  if (available.length === 0) {
    return { memberId: null, status: 'CONFLICT', violations: [] }
  }

  const filteredByHardConstraints = available.filter(
    (m) => !hasConsecutiveConstraint(m.id, day, currentDays)
  )

  if (filteredByHardConstraints.length === 0) {
    return { memberId: null, status: 'CONFLICT', violations: [] }
  }

  const withWeekdayViolation = filteredByHardConstraints.filter((m) =>
    wouldExceedWeekdayLimit(m.id, day, month, currentDays)
  )
  const withoutWeekdayViolation = filteredByHardConstraints.filter(
    (m) => !wouldExceedWeekdayLimit(m.id, day, month, currentDays)
  )

  const candidates =
    withoutWeekdayViolation.length > 0
      ? withoutWeekdayViolation
      : withWeekdayViolation

  const sorted = [...candidates].sort((a, b) => {
    const deficitA = calculateFairnessDeficit(
      a.id,
      a.contract,
      currentDays,
      available
    )
    const deficitB = calculateFairnessDeficit(
      b.id,
      b.contract,
      currentDays,
      available
    )
    if (deficitA !== deficitB) return deficitA - deficitB
    return b.contract - a.contract
  })

  const selected = sorted[0]
  const violations: string[] = []

  if (wouldExceedWeekdayLimit(selected.id, day, month, currentDays)) {
    violations.push('WEEKDAY_LIMIT_EXCEEDED')
  }

  return {
    memberId: selected.id,
    status: 'ASSIGNED',
    violations,
  }
}