<script setup lang="ts">
import { ref } from 'vue'
import type { TreeNode as Node } from '@/components/custom/treeview/types'
//import { cn } from '@/lib/utils' // falls du classnames nutzt

const props = defineProps<{
  node: Node
  expanded: Set<string>
}>()
const emit = defineEmits(['toggle'])

const showMenu = ref(false)
const isFolder = !!props.node.children?.length

const icon = isFolder ? (props.expanded.has(props.node.id) ? '📂' : '📁') : '📄'
</script>

<template>
  <div class="flex items-center justify-between group relative">
    <div class="flex items-center space-x-1 cursor-pointer" @click="emit('toggle', node.id)">
      <span v-if="isFolder" class="w-4">{{ icon }}</span>
      <span>{{ node.name }}</span>
    </div>
    <button
      @click.stop="showMenu = !showMenu"
      class="invisible group-hover:visible px-2 text-muted-foreground"
    >⋮</button>

    <div
      v-if="showMenu"
      class="absolute right-0 mt-6 w-32 rounded-md border bg-background shadow-lg z-10"
    >
      <ul class="text-sm">
        <li class="hover:bg-muted px-3 py-1 cursor-pointer">Umbenennen</li>
        <li class="hover:bg-muted px-3 py-1 cursor-pointer">Löschen</li>
        <li class="hover:bg-muted px-3 py-1 cursor-pointer">Neues File</li>
      </ul>
    </div>
  </div>
</template>
