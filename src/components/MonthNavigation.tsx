import { currentMonth, setCurrentMonth } from '../stores/schedules'
import { getMonthName, getPreviousMonth, getNextMonth } from '../lib/date-utils'

export default function MonthNavigation() {
  const month = currentMonth

  const handlePrev = () => {
    setCurrentMonth(getPreviousMonth(month()))
  }

  const handleNext = () => {
    setCurrentMonth(getNextMonth(month()))
  }

  return (
    <div class="flex items-center justify-between mb-4">
      <button
        onClick={handlePrev}
        class="p-2 hover:bg-gray-100 rounded"
      >
        ←
      </button>
      <h2 class="text-xl font-semibold">{getMonthName(month())}</h2>
      <button
        onClick={handleNext}
        class="p-2 hover:bg-gray-100 rounded"
      >
        →
      </button>
    </div>
  )
}