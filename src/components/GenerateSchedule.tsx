import { currentMonth, setCurrentMonth, hasSchedule, saveSchedule, deleteSchedule } from '../stores/schedules'
import { getMonthName, getPreviousMonth, getNextMonth } from '../lib/date-utils'
import { generateSchedule } from '../lib/schedule-generator'
import { getActiveMembers } from '../stores/members'

export default function GenerateSchedule() {
  const handleGenerate = () => {
    const schedule = generateSchedule(currentMonth())
    saveSchedule(schedule)
  }

  const handleRegenerate = () => {
    if (confirm('Dienstplan neu erstellen? Alle Änderungen gehen verloren.')) {
      handleGenerate()
    }
  }

  const alreadyExists = () => hasSchedule(currentMonth())
  const hasMembers = () => getActiveMembers().length > 0

  return (
    <>
      {alreadyExists() ? (
        <button
          onClick={handleRegenerate}
          disabled={!hasMembers()}
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
        >
          Neu erstellen
        </button>
      ) : (
        <button
          onClick={handleGenerate}
          disabled={!hasMembers()}
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Dienstplan erstellen
        </button>
      )}
    </>
  )
}