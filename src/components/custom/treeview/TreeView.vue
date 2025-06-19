<script setup lang="ts">
import TreeNode from './TreeNode.vue'
import type { TreeNode as Node } from '@/components/custom/treeview/types'
import { useTreeContext } from '@/components/custom/treeview/useTreeContext'

const props = defineProps<{ nodes: Node[] }>()

const { expanded, toggle, moveNode } = useTreeContext()
</script>

<template>
  <ul class="pl-4 border-l border-muted space-y-1">
    <li
      v-for="node in nodes"
      :key="node.id"
      draggable
      @dragstart="$emit('dragstart', node)"
      @drop="$emit('drop', node)"
      @dragover.prevent
    >
      <TreeNode :node="node" :expanded="expanded" @toggle="toggle" />
      <TreeView
        v-if="node.children && expanded.has(node.id)"
        :nodes="node.children"
        @dragstart="$emit('dragstart', $event)"
        @drop="$emit('drop', $event)"
      />
    </li>
  </ul>
</template>
