import { For, Show } from 'solid-js'
import { members } from '../stores/members'
import MemberCard from './MemberCard'

export default function MemberList() {
  const activeMembers = () => members().filter((m) => m.isActive)
  const archivedMembers = () => members().filter((m) => !m.isActive)

  return (
    <div class="space-y-6">
      <div>
        <h2 class="text-lg font-semibold mb-3">Aktive Mitarbeiter</h2>
        <Show
          when={activeMembers().length > 0}
          fallback={<p class="text-gray-500">Keine aktiven Mitarbeiter</p>}
        >
          <div class="grid gap-3">
            <For each={activeMembers()}>{(member) => <MemberCard member={member} />}</For>
          </div>
        </Show>
      </div>

      <Show when={archivedMembers().length > 0}>
        <div>
          <h2 class="text-lg font-semibold mb-3 text-gray-500">Archiviert</h2>
          <div class="grid gap-3 opacity-60">
            <For each={archivedMembers()}>{(member) => <MemberCard member={member} />}</For>
          </div>
        </div>
      </Show>
    </div>
  )
}