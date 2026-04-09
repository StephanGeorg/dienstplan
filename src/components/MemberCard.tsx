import { Show, createSignal } from 'solid-js'
import type { Member } from '../types'
import { archiveMember, restoreMember, deleteMember } from '../stores/members'
import EditMemberModal from './EditMemberModal'
import VacationCalendar from './VacationCalendar'

interface Props {
  member: Member
}

export default function MemberCard(props: Props) {
  const [showEdit, setShowEdit] = createSignal(false)
  const [showVacation, setShowVacation] = createSignal(false)

  const handleArchive = () => {
    if (confirm(`${props.member.name} archivieren?`)) {
      archiveMember(props.member.id)
    }
  }

  const handleRestore = () => {
    restoreMember(props.member.id)
  }

  const handleDelete = () => {
    if (confirm(`${props.member.name} endgültig löschen?`)) {
      deleteMember(props.member.id)
    }
  }

  return (
    <>
      <div class="bg-white border rounded-lg p-4 flex items-center justify-between">
        <div>
          <div class="font-medium">{props.member.name}</div>
          <div class="text-sm text-gray-500">{Math.round(props.member.contract * 100)}% Vertrag</div>
        </div>
        <div class="flex gap-2">
          <Show
            when={props.member.isActive}
            fallback={
              <>
                <button
                  onClick={handleRestore}
                  class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                >
                  Wiederherstellen
                </button>
                <button
                  onClick={handleDelete}
                  class="px-3 py-1 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded"
                >
                  Löschen
                </button>
              </>
            }
          >
            <button
              onClick={() => setShowVacation(true)}
              class="px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 text-blue-600 rounded"
            >
              Urlaub
            </button>
            <button
              onClick={() => setShowEdit(true)}
              class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            >
              Bearbeiten
            </button>
            <button
              onClick={handleArchive}
              class="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded"
            >
              Archivieren
            </button>
          </Show>
        </div>
      </div>
      <Show when={showEdit()}>
        <EditMemberModal member={props.member} onClose={() => setShowEdit(false)} />
      </Show>
      <Show when={showVacation()}>
        <VacationCalendar member={props.member} onClose={() => setShowVacation(false)} />
      </Show>
    </>
  )
}