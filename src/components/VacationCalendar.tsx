import { currentMonth } from '../stores/schedules'
import { toggleVacation, getVacation } from '../stores/vacations'
import { getDaysInMonth, parseMonth } from '../lib/date-utils'
import type { Member } from '../types'

interface Props {
  member: Member
  onClose: () => void
}

export default function VacationCalendar(props: Props) {
  const { year, monthNumber } = parseMonth(currentMonth())
  const daysInMonth = getDaysInMonth(year, monthNumber)

  const isVacation = (day: number) => {
    const date = `${year}-${String(monthNumber).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    const vac = getVacation(props.member.id, date)
    return !!vac
  }

  const handleToggle = (day: number) => {
    const date = `${year}-${String(monthNumber).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    toggleVacation(props.member.id, date)
  }

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-lg">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium text-lg">Urlaub für {props.member.name}</h3>
          <button onClick={props.onClose} class="text-gray-400 hover:text-gray-600">✕</button>
        </div>
        <p class="text-sm text-gray-500 mb-4">
          Klicke auf einen Tag, um ihn als Urlaub zu markieren oder zu entfernen.
        </p>
        <div class="grid grid-cols-7 gap-1">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
            <button
              onClick={() => handleToggle(day)}
              class={`p-2 text-sm rounded ${
                isVacation(day)
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <div class="mt-4 flex justify-end">
          <button
            onClick={props.onClose}
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Fertig
          </button>
        </div>
      </div>
    </div>
  )
}