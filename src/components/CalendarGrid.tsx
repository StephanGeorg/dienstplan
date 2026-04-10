import { For } from 'solid-js'
import type { Schedule } from '../types'
import CalendarCell from './CalendarCell'

interface Props {
  schedule: Schedule
}

export default function CalendarGrid(props: Props) {
  const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

  return (
    <div class="border rounded-lg overflow-hidden">
      <div class="grid grid-cols-7 bg-gray-100">
        <For each={weekdays}>{(day) => <div class="p-2 text-center text-sm font-medium">{day}</div>}</For>
      </div>
      <div class="grid grid-cols-7">
        <For each={props.schedule.days}>{(day) => <CalendarCell day={day} month={props.schedule.month} />}</For>
      </div>
    </div>
  )
}