import { createSignal, batch } from 'solid-js'
import type { Member } from '../types'
import { loadMembers, saveMembers } from '../storage'

function generateId(): string {
  return `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

const [members, setMembers] = createSignal<Member[]>(loadMembers())

export { members }

export function addMember(name: string, contract: number): boolean {
  const existing = members().find(
    (m) => m.name.toLowerCase() === name.toLowerCase() && m.isActive
  )
  if (existing) return false

  const newMember: Member = {
    id: generateId(),
    name: name.trim(),
    contract,
    isActive: true,
  }

  batch(() => {
    setMembers([...members(), newMember])
    saveMembers(members())
  })

  return true
}

export function updateMember(
  id: string,
  updates: Partial<Pick<Member, 'name' | 'contract'>>
): boolean {
  const member = members().find((m) => m.id === id)
  if (!member) return false

  if (updates.name) {
    const existing = members().find(
      (m) =>
        m.id !== id &&
        m.name.toLowerCase() === updates.name!.toLowerCase() &&
        m.isActive
    )
    if (existing) return false
  }

  batch(() => {
    setMembers(
      members().map((m) =>
        m.id === id ? { ...m, ...updates, name: updates.name?.trim() ?? m.name } : m
      )
    )
    saveMembers(members())
  })

  return true
}

export function archiveMember(id: string): void {
  batch(() => {
    setMembers(
      members().map((m) => (m.id === id ? { ...m, isActive: false } : m))
    )
    saveMembers(members())
  })
}

export function restoreMember(id: string): void {
  batch(() => {
    setMembers(
      members().map((m) => (m.id === id ? { ...m, isActive: true } : m))
    )
    saveMembers(members())
  })
}

export function deleteMember(id: string): void {
  batch(() => {
    setMembers(members().filter((m) => m.id !== id))
    saveMembers(members())
  })
}

export function getMemberById(id: string): Member | undefined {
  return members().find((m) => m.id === id)
}

export function getActiveMembers(): Member[] {
  return members().filter((m) => m.isActive)
}