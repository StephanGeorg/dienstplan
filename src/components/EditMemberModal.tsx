import { createSignal, Show } from 'solid-js'
import type { Member } from '../types'
import { updateMember } from '../stores/members'

interface Props {
  member: Member
  onClose: () => void
}

export default function EditMemberModal(props: Props) {
  const [name, setName] = createSignal(props.member.name)
  const [contract, setContract] = createSignal(props.member.contract)
  const [error, setError] = createSignal('')

  const handleSave = () => {
    setError('')
    const nameValue = name().trim()
    if (!nameValue) {
      setError('Name erforderlich')
      return
    }

    const success = updateMember(props.member.id, {
      name: nameValue,
      contract: contract(),
    })

    if (!success) {
      setError('Name bereits vergeben')
      return
    }

    props.onClose()
  }

  return (
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 class="font-medium text-lg mb-4">Mitarbeiter bearbeiten</h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Name</label>
            <input
              type="text"
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Vertrag</label>
            <select
              value={contract()}
              onChange={(e) => setContract(Number(e.currentTarget.value))}
              class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={1.0}>100%</option>
              <option value={0.9}>90%</option>
              <option value={0.8}>80%</option>
              <option value={0.75}>75%</option>
              <option value={0.6}>60%</option>
              <option value={0.5}>50%</option>
              <option value={0.4}>40%</option>
            </select>
          </div>
        </div>

        <Show when={error()}>
          <p class="text-red-600 text-sm mt-3">{error()}</p>
        </Show>

        <div class="flex justify-end gap-2 mt-6">
          <button
            onClick={props.onClose}
            class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  )
}