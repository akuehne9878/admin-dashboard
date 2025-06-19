import { ref } from 'vue'

export function useTreeContext() {
  const expanded = ref<Set<string>>(new Set())

  const toggle = (id: string) => {
    if (expanded.value.has(id)) {
      expanded.value.delete(id)
    } else {
      expanded.value.add(id)
    }
  }

  const moveNode = (fromId: string, toId: string) => {
    console.log(`Move ${fromId} → ${toId}`)
    // hier könntest du den Tree rekursiv aktualisieren
  }

  return { expanded, toggle, moveNode }
}
