import type { Member, Schedule, ScheduleDay } from '../types'
import { selectMemberForDay } from './schedule-utils'
import { getDaysInMonth, parseMonth } from './date-utils'
import { members } from '../stores/members'

export function generateSchedule(month: string): Schedule {
  const { year, monthNumber } = parseMonth(month)
  const daysInMonth = getDaysInMonth(year, monthNumber)
  const allMembers = members()

  const days: ScheduleDay[] = []

  for (let day = 1; day <= daysInMonth; day++) {
    const result = selectMemberForDay(day, month, allMembers, days)

    days.push({
      day,
      memberId: result.memberId,
      status: result.status,
      violations: result.violations as ScheduleDay['violations'],
    })
  }

  return {
    month,
    generatedAt: new Date().toISOString(),
    days,
  }
}

export function getConflictCount(schedule: Schedule): number {
  return schedule.days.filter((d) => d.status === 'CONFLICT').length
}

export function getViolationCount(schedule: Schedule): number {
  return schedule.days.filter((d) => d.violations.length > 0).length
}

export function getConflicts(schedule: Schedule): ScheduleDay[] {
  return schedule.days.filter((d) => d.status === 'CONFLICT')
}

export function getViolations(schedule: Schedule): ScheduleDay[] {
  return schedule.days.filter((d) => d.violations.length > 0)
}

export function getMemberAssignmentCount(
  schedule: Schedule,
  memberId: string
): number {
  return schedule.days.filter(
    (d) => d.memberId === memberId && d.status !== 'CONFLICT'
  ).length
}