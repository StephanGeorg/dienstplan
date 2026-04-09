import { For, Show } from 'solid-js'
import type { ScheduleDay } from '../types'
import { getMemberById, getActiveMembers } from '../stores/members'
import { applyManualOverride } from '../stores/schedules'
import { getDayName, formatDate, parseMonth } from '../lib/date-utils'

interface Props {
  day: ScheduleDay
  month: string
  onClose: () => void
}

export default function DayDetailPanel(props: Props) {
  const { year, monthNumber } = parseMonth(props.month)
  const date = () => formatDate(year, monthNumber, props.day.day)
  
  const assignedMember = () => 
    props.day.memberId ? getMemberById(props.day.memberId) : null

  const handleOverride = (memberId: string) => {
    applyManualOverride(props.month, props.day.day, memberId)
  }

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-medium text-lg">
            {props.day.day}. {getDayName(props.day.day, props.month)}
          </h3>
          <button 
            onClick={props.onClose} 
            class="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div class="space-y-4">
          <Show when={props.day.status === 'CONFLICT'}>
            <div class="p-3 bg-red-50 text-red-700 rounded">
              Kein Mitarbeiter verfügbar
            </div>
          </Show>

          <Show when={assignedMember()}>
            <div class="p-3 bg-gray-50 rounded">
              <div class="text-sm text-gray-500">Zugewiesen</div>
              <div class="font-medium">{assignedMember()?.name}</div>
              <Show when={props.day.violations.length > 0}>
                <div class="text-amber-600 text-sm mt-1">
                  ⚠ Wochenlimit überschritten
                </div>
              </Show>
            </div>
          </Show>

          <div>
            <div class="text-sm text-gray-500 mb-2">Manuell zuweisen:</div>
            <div class="grid grid-cols-2 gap-2">
              <For each={getActiveMembers()}>
                {(member) => (
                  <button
                    onClick={() => handleOverride(member.id)}
                    class={`px-3 py-2 text-sm rounded border ${
                      props.day.memberId === member.id
                        ? 'bg-blue-50 border-blue-300 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    {member.name}
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <button
            onClick={props.onClose}
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  )
}