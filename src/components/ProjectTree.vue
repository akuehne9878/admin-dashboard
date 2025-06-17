<template>
  <div class="project-tree">
    <div class="space-y-1">
      <div
        v-for="item in items"
        :key="item.id"
        class="select-none"
      >
        <div
          :class="[
            'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors',
            'hover:bg-accent hover:text-accent-foreground',
            selectedFileId === item.id && 'bg-accent text-accent-foreground'
          ]"
          :style="{ paddingLeft: `${level * 12 + 8}px` }"
          @click="handleItemClick(item)"
        >
          <!-- Folder toggle icon -->
          <button
            v-if="item.type === 'folder'"
            @click.stop="toggleFolder(item.id)"
            class="flex items-center justify-center w-4 h-4 hover:bg-muted rounded-sm"
          >
            <ChevronRight
              :class="[
                'h-3 w-3 transition-transform',
                isExpanded(item.id) && 'rotate-90'
              ]"
            />
          </button>
          <div v-else class="w-4" />

          <!-- File/Folder icon -->
          <component
            :is="getIcon(item)"
            class="h-4 w-4 shrink-0"
            :class="getIconColor(item)"
          />

          <!-- Name -->
          <span class="text-sm truncate">{{ item.name }}</span>

          <!-- File size (for files only) -->
          <span
            v-if="item.type === 'file' && item.size"
            class="text-xs text-muted-foreground ml-auto"
          >
            {{ formatFileSize(item.size) }}
          </span>
        </div>

        <!-- Recursive children -->
        <ProjectTree
          v-if="item.type === 'folder' && item.children && isExpanded(item.id)"
          :items="item.children"
          :level="level + 1"
          :selected-file-id="selectedFileId"
          @file-select="$emit('file-select', $event)"
          @folder-toggle="$emit('folder-toggle', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Folder, FolderOpen, FileText, File, Code, Image, Settings } from 'lucide-vue-next'
import type { ProjectFile } from '@/stores/projectStore'

interface Props {
  items: ProjectFile[]
  level?: number
  selectedFileId?: string | null
  expandedFolders?: Set<string>
}

const props = withDefaults(defineProps<Props>(), {
  level: 0,
  selectedFileId: null,
  expandedFolders: () => new Set()
})

const emit = defineEmits<{
  'file-select': [file: ProjectFile]
  'folder-toggle': [folderId: string]
}>()

function handleItemClick(item: ProjectFile) {
  if (item.type === 'file') {
    emit('file-select', item)
  } else {
    toggleFolder(item.id)
  }
}

function toggleFolder(folderId: string) {
  emit('folder-toggle', folderId)
}

function isExpanded(folderId: string) {
  return props.expandedFolders?.has(folderId) || false
}

function getIcon(item: ProjectFile) {
  if (item.type === 'folder') {
    return isExpanded(item.id) ? FolderOpen : Folder
  }
  
  const extension = item.name.split('.').pop()?.toLowerCase()
  
  switch (extension) {
    case 'vue':
    case 'js':
    case 'ts':
    case 'jsx':
    case 'tsx':
      return Code
    case 'json':
    case 'config':
      return Settings
    case 'md':
    case 'txt':
      return FileText
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
      return Image
    default:
      return File
  }
}

function getIconColor(item: ProjectFile) {
  if (item.type === 'folder') {
    return 'text-blue-600 dark:text-blue-400'
  }
  
  const extension = item.name.split('.').pop()?.toLowerCase()
  
  switch (extension) {
    case 'vue':
      return 'text-green-600 dark:text-green-400'
    case 'js':
    case 'jsx':
      return 'text-yellow-600 dark:text-yellow-400'
    case 'ts':
    case 'tsx':
      return 'text-blue-600 dark:text-blue-400'
    case 'json':
      return 'text-orange-600 dark:text-orange-400'
    case 'md':
      return 'text-gray-600 dark:text-gray-400'
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'svg':
      return 'text-purple-600 dark:text-purple-400'
    default:
      return 'text-gray-500 dark:text-gray-400'
  }
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
</script>