import { Show, For } from 'solid-js'
import type { Schedule } from '../types'
import { getConflicts } from '../lib/schedule-generator'

interface Props {
  schedule: Schedule
}

export default function ConflictSummary(props: Props) {
  const conflicts = () => getConflicts(props.schedule)

  return (
    <Show when={conflicts().length > 0}>
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <h3 class="font-medium text-red-800 mb-2">
          {conflicts().length} Tag{conflicts().length > 1 ? 'e' : ''} ohne Deckung
        </h3>
        <ul class="text-sm text-red-700">
          <For each={conflicts()}>
            {(day) => <li>{day.day}. des Monats</li>}
          </For>
        </ul>
      </div>
    </Show>
  )
}