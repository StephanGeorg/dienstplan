import { Show, For } from 'solid-js'
import type { Schedule } from '../types'
import { getViolations } from '../lib/schedule-generator'
import { getMemberById } from '../stores/members'

interface Props {
  schedule: Schedule
}

export default function ViolationSummary(props: Props) {
  const violations = () => getViolations(props.schedule)

  return (
    <Show when={violations().length > 0}>
      <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <h3 class="font-medium text-amber-800 mb-2">
          {violations().length} Warnung{violations().length > 1 ? 'en' : ''}
        </h3>
        <ul class="text-sm text-amber-700">
          <For each={violations()}>
            {(day) => {
              const member = () => day.memberId ? getMemberById(day.memberId) : null
              return (
                <li>
                  {day.day}.: {member()?.name} hat 2 Wochentage in dieser Woche
                </li>
              )
            }}
          </For>
        </ul>
      </div>
    </Show>
  )
}