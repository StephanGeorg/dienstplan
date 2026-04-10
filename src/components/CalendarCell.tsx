import { Show, createSignal } from 'solid-js'
import type { ScheduleDay } from '../types'
import { getDayName, isWeekend } from '../lib/date-utils'
import { getMemberById } from '../stores/members'
import DayDetailPanel from './DayDetailPanel'

interface Props {
  day: ScheduleDay
  month: string
}

export default function CalendarCell(props: Props) {
  const [showDetail, setShowDetail] = createSignal(false)
  const member = () => props.day.memberId ? getMemberById(props.day.memberId) : null
  const dayName = () => getDayName(props.day.day, props.month)
  const isWeekendDay = () => isWeekend(props.day.day, props.month)

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        class={`p-2 border-t min-h-[80px] cursor-pointer hover:bg-gray-100 ${
          isWeekendDay() ? 'bg-gray-50' : 'bg-white'
        } ${props.day.status === 'CONFLICT' ? 'bg-red-50' : ''}`}
      >
        <div class="text-sm text-gray-500 mb-1">
          {props.day.day}. {dayName()}
        </div>
        <Show when={props.day.status === 'CONFLICT'}>
          <div class="text-red-600 font-medium">Keine Deckung</div>
        </Show>
        <Show when={props.day.status !== 'CONFLICT' && member()}>
          <div class="flex items-center gap-1">
            <span class="font-medium">{member()?.name}</span>
            <Show when={props.day.violations.length > 0}>
              <span class="text-amber-500" title="Wochenlimit überschritten">⚠</span>
            </Show>
          </div>
        </Show>
        <Show when={props.day.status === 'MANUAL_OVERRIDE'}>
          <span class="text-xs text-gray-400">(manuell)</span>
        </Show>
      </div>
      <Show when={showDetail()}>
        <DayDetailPanel 
          day={props.day} 
          month={props.month} 
          onClose={() => setShowDetail(false)} 
        />
      </Show>
    </>
  )
}