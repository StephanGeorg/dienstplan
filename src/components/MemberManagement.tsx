import { A } from '@solidjs/router'
import MemberList from './MemberList'
import AddMemberForm from './AddMemberForm'

export default function MemberManagement() {
  return (
    <div class="max-w-2xl mx-auto p-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold">Mitarbeiter</h1>
        <A href="/" class="text-blue-600 hover:underline">
          Zurück zum Kalender
        </A>
      </div>
      <div class="space-y-6">
        <AddMemberForm />
        <MemberList />
      </div>
    </div>
  )
}