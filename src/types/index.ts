export type ContractPercent = number

export type DayStatus = 'ASSIGNED' | 'CONFLICT' | 'MANUAL_OVERRIDE'

export type ViolationType = 'WEEKDAY_LIMIT_EXCEEDED'

export interface Member {
  id: string
  name: string
  contract: ContractPercent
  isActive: boolean
}

export interface Vacation {
  memberId: string
  date: string
  note?: string
}

export interface ScheduleDay {
  day: number
  memberId: string | null
  status: DayStatus
  violations: ViolationType[]
}

export interface Schedule {
  month: string
  generatedAt: string
  days: ScheduleDay[]
}