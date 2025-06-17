<template>
  <div v-if="project" class="space-y-6">
    <!-- Project Header -->
    <div class="border-b pb-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-3xl font-bold">{{ project.name }}</h1>
          <p class="text-muted-foreground mt-2">{{ project.description }}</p>
        </div>
        <Badge :variant="getStatusVariant(project.status)">
          {{ project.status }}
        </Badge>
      </div>
      
      <div class="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
        <div class="flex items-center gap-1">
          <Calendar class="h-4 w-4" />
          Created: {{ formatDate(project.createdAt) }}
        </div>
        <div class="flex items-center gap-1">
          <Clock class="h-4 w-4" />
          Modified: {{ formatDate(project.lastModified) }}
        </div>
        <div class="flex items-center gap-1">
          <Layers class="h-4 w-4" />
          {{ project.type }}
        </div>
      </div>
    </div>

    <!-- Technologies -->
    <div>
      <h3 class="text-lg font-semibold mb-3">Technologies</h3>
      <div class="flex flex-wrap gap-2">
        <Badge
          v-for="tech in project.technologies"
          :key="tech"
          variant="secondary"
        >
          {{ tech }}
        </Badge>
      </div>
    </div>

    <!-- Repository -->
    <div v-if="project.repository">
      <h3 class="text-lg font-semibold mb-3">Repository</h3>
      <div class="flex items-center gap-2">
        <Github class="h-4 w-4" />
        <a
          :href="project.repository"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-600 hover:underline"
        >
          {{ project.repository }}
        </a>
        <ExternalLink class="h-3 w-3" />
      </div>
    </div>

    <!-- File Content -->
    <div v-if="selectedFile">
      <h3 class="text-lg font-semibold mb-3">File Content</h3>
      <Card>
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <component
                :is="getFileIcon(selectedFile)"
                class="h-4 w-4"
                :class="getFileIconColor(selectedFile)"
              />
              <span class="font-medium">{{ selectedFile.name }}</span>
            </div>
            <div class="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{{ selectedFile.path }}</span>
              <span v-if="selectedFile.size">{{ formatFileSize(selectedFile.size) }}</span>
              <span v-if="selectedFile.lastModified">{{ formatDate(selectedFile.lastModified) }}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div v-if="selectedFile.content" class="relative">
            <pre class="bg-muted p-4 rounded-lg overflow-x-auto text-sm"><code>{{ selectedFile.content }}</code></pre>
            <Button
              variant="outline"
              size="sm"
              class="absolute top-2 right-2"
              @click="copyToClipboard(selectedFile.content)"
            >
              <Copy class="h-3 w-3" />
            </Button>
          </div>
          <div v-else class="text-center py-8 text-muted-foreground">
            <FileText class="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No content available for this file</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Project Statistics -->
    <div>
      <h3 class="text-lg font-semibold mb-3">Project Statistics</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent class="p-4">
            <div class="text-center">
              <div class="text-2xl font-bold">{{ getTotalFiles(project.files) }}</div>
              <div class="text-sm text-muted-foreground">Total Files</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4">
            <div class="text-center">
              <div class="text-2xl font-bold">{{ getTotalFolders(project.files) }}</div>
              <div class="text-sm text-muted-foreground">Folders</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4">
            <div class="text-center">
              <div class="text-2xl font-bold">{{ formatFileSize(getTotalSize(project.files)) }}</div>
              <div class="text-sm text-muted-foreground">Total Size</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4">
            <div class="text-center">
              <div class="text-2xl font-bold">{{ project.technologies.length }}</div>
              <div class="text-sm text-muted-foreground">Technologies</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-64">
    <div class="text-center">
      <FolderOpen class="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
      <h3 class="text-lg font-semibold mb-2">No Project Selected</h3>
      <p class="text-muted-foreground">Select a project from the tree to view its details</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Calendar,
  Clock,
  Layers,
  Github,
  ExternalLink,
  FolderOpen,
  FileText,
  File,
  Code,
  Image,
  Settings,
  Copy
} from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Project, ProjectFile } from '@/stores/projectStore'

interface Props {
  project?: Project | null
  selectedFile?: ProjectFile | null
}

const props = defineProps<Props>()

function getStatusVariant(status: string) {
  switch (status) {
    case 'active':
      return 'default'
    case 'inactive':
      return 'secondary'
    case 'archived':
      return 'destructive'
    default:
      return 'secondary'
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getFileIcon(file: ProjectFile) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  
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

function getFileIconColor(file: ProjectFile) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  
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

function getTotalFiles(files: ProjectFile[]): number {
  let count = 0
  for (const file of files) {
    if (file.type === 'file') {
      count++
    } else if (file.children) {
      count += getTotalFiles(file.children)
    }
  }
  return count
}

function getTotalFolders(files: ProjectFile[]): number {
  let count = 0
  for (const file of files) {
    if (file.type === 'folder') {
      count++
      if (file.children) {
        count += getTotalFolders(file.children)
      }
    }
  }
  return count
}

function getTotalSize(files: ProjectFile[]): number {
  let size = 0
  for (const file of files) {
    if (file.type === 'file' && file.size) {
      size += file.size
    } else if (file.children) {
      size += getTotalSize(file.children)
    }
  }
  return size
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}
</script>