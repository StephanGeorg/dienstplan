export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export function getMonthFromDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function parseMonth(month: string): { year: number; monthNumber: number } {
  const [year, monthNum] = month.split('-').map(Number)
  return { year, monthNumber: monthNum }
}

export function formatDate(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function isWeekend(day: number, month: string): boolean {
  const { year, monthNumber } = parseMonth(month)
  const date = new Date(year, monthNumber - 1, day)
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6
}

export function isWeekday(day: number, month: string): boolean {
  return !isWeekend(day, month)
}

export function getCalendarWeek(day: number, month: string): number {
  const { year, monthNumber } = parseMonth(month)
  const date = new Date(year, monthNumber - 1, day)
  const startOfYear = new Date(year, 0, 1)
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
  return Math.ceil((days + startOfYear.getDay() + 1) / 7)
}

export function getDayOfWeek(day: number, month: string): number {
  const { year, monthNumber } = parseMonth(month)
  const date = new Date(year, monthNumber - 1, day)
  return date.getDay()
}

export function getDayName(day: number, month: string): string {
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  return days[getDayOfWeek(day, month)]
}

export function getMonthName(month: string): string {
  const { year, monthNumber } = parseMonth(month)
  const date = new Date(year, monthNumber - 1)
  return date.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })
}

export function getPreviousMonth(month: string): string {
  const { year, monthNumber } = parseMonth(month)
  if (monthNumber === 1) {
    return `${year - 1}-12`
  }
  return `${year}-${String(monthNumber - 1).padStart(2, '0')}`
}

export function getNextMonth(month: string): string {
  const { year, monthNumber } = parseMonth(month)
  if (monthNumber === 12) {
    return `${year + 1}-01`
  }
  return `${year}-${String(monthNumber + 1).padStart(2, '0')}`
}