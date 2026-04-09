import { For, Show } from 'solid-js'
import { currentSchedule } from '../stores/schedules'
import { getMonthName } from '../lib/date-utils'
import CalendarGrid from './CalendarGrid'
import GenerateSchedule from './GenerateSchedule'
import ConflictSummary from './ConflictSummary'
import ViolationSummary from './ViolationSummary'
import MonthNavigation from './MonthNavigation'
import { A } from '@solidjs/router'

export default function CalendarView() {
  const schedule = currentSchedule

  return (
    <div class="max-w-5xl mx-auto p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Rufdienstplan</h1>
        <A href="/members" class="text-blue-600 hover:underline">
          Mitarbeiter verwalten
        </A>
      </div>

      <MonthNavigation />

      <Show when={schedule()}>
        <div class="mb-4 flex items-center gap-4">
          <GenerateSchedule />
          <span class="text-sm text-gray-500">
            Erstellt: {new Date(schedule()!.generatedAt).toLocaleString('de-DE')}
          </span>
        </div>
        <ConflictSummary schedule={schedule()!} />
        <ViolationSummary schedule={schedule()!} />
        <CalendarGrid schedule={schedule()!} />
      </Show>

      <Show when={!schedule()}>
        <div class="text-center py-12">
          <p class="text-gray-500 mb-4">Noch kein Dienstplan für diesen Monat</p>
          <GenerateSchedule />
        </div>
      </Show>
    </div>
  )
}