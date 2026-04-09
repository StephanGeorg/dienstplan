import { createSignal } from 'solid-js'
import { addMember } from '../stores/members'

export default function AddMemberForm() {
  const [name, setName] = createSignal('')
  const [contract, setContract] = createSignal(1.0)
  const [error, setError] = createSignal('')

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    setError('')

    const nameValue = name().trim()
    if (!nameValue) {
      setError('Name erforderlich')
      return
    }

    const success = addMember(nameValue, contract())
    if (!success) {
      setError('Name bereits vergeben')
      return
    }

    setName('')
    setContract(1.0)
  }

  return (
    <form onSubmit={handleSubmit} class="bg-white border rounded-lg p-4">
      <h3 class="font-medium mb-3">Neuer Mitarbeiter</h3>
      <div class="flex gap-3 items-end">
        <div class="flex-1">
          <label class="block text-sm text-gray-600 mb-1">Name</label>
          <input
            type="text"
            value={name()}
            onInput={(e) => setName(e.currentTarget.value)}
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Vorname Nachname"
          />
        </div>
        <div class="w-32">
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
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Hinzufügen
        </button>
      </div>
      {error() && <p class="text-red-600 text-sm mt-2">{error()}</p>}
    </form>
  )
}