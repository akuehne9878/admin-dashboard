<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="border-b p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold">Project Explorer</h2>
          <p class="text-muted-foreground">Browse and manage your projects</p>
        </div>
        <div class="flex items-center gap-2">
          <Button variant="outline" @click="refreshProjects">
            <RefreshCw class="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button @click="openAddProjectDialog">
            <Plus class="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex min-h-0">
      <!-- Left Sidebar - Project Tree -->
      <div class="w-80 border-r bg-muted/20 flex flex-col">
        <!-- Project Selector -->
        <div class="p-4 border-b">
          <div class="space-y-2">
            <label class="text-sm font-medium">Select Project</label>
            <select
              v-model="selectedProjectId"
              class="w-full px-3 py-2 border rounded-md bg-background"
              @change="handleProjectChange"
            >
              <option value="">Choose a project...</option>
              <optgroup label="Active Projects">
                <option
                  v-for="project in projectStore.projectsByStatus.active"
                  :key="project.id"
                  :value="project.id"
                >
                  {{ project.name }}
                </option>
              </optgroup>
              <optgroup label="Inactive Projects" v-if="projectStore.projectsByStatus.inactive.length">
                <option
                  v-for="project in projectStore.projectsByStatus.inactive"
                  :key="project.id"
                  :value="project.id"
                >
                  {{ project.name }}
                </option>
              </optgroup>
              <optgroup label="Archived Projects" v-if="projectStore.projectsByStatus.archived.length">
                <option
                  v-for="project in projectStore.projectsByStatus.archived"
                  :key="project.id"
                  :value="project.id"
                >
                  {{ project.name }}
                </option>
              </optgroup>
            </select>
          </div>
        </div>

        <!-- File Tree -->
        <div class="flex-1 overflow-auto p-4">
          <div v-if="selectedProject" class="space-y-2">
            <div class="flex items-center gap-2 mb-4">
              <FolderOpen class="h-5 w-5 text-blue-600" />
              <span class="font-medium">{{ selectedProject.name }}</span>
            </div>
            
            <ProjectTree
              :items="selectedProject.files"
              :selected-file-id="projectStore.selectedFileId"
              :expanded-folders="projectStore.expandedFolders"
              @file-select="handleFileSelect"
              @folder-toggle="handleFolderToggle"
            />
          </div>
          
          <div v-else class="flex items-center justify-center h-32 text-muted-foreground">
            <div class="text-center">
              <Folder class="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p class="text-sm">Select a project to view files</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content - Project Details -->
      <div class="flex-1 overflow-auto">
        <div class="p-6">
          <ProjectDetails
            :project="selectedProject"
            :selected-file="projectStore.selectedFile"
          />
        </div>
      </div>
    </div>

    <!-- Add Project Dialog -->
    <Dialog v-model:open="showAddProjectDialog">
      <DialogContent class="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">Project Name</label>
            <Input v-model="newProject.name" placeholder="Enter project name" />
          </div>
          <div>
            <label class="text-sm font-medium">Description</label>
            <Textarea v-model="newProject.description" placeholder="Project description" />
          </div>
          <div>
            <label class="text-sm font-medium">Type</label>
            <select v-model="newProject.type" class="w-full px-3 py-2 border rounded-md">
              <option value="web">Web Application</option>
              <option value="mobile">Mobile Application</option>
              <option value="desktop">Desktop Application</option>
              <option value="api">API/Backend</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">Technologies</label>
            <Input
              v-model="technologiesInput"
              placeholder="e.g., Vue.js, TypeScript, Node.js (comma separated)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" @click="showAddProjectDialog = false">
            Cancel
          </Button>
          <Button @click="createProject" :disabled="!newProject.name.trim()">
            Create Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Plus, RefreshCw, FolderOpen, Folder } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import ProjectTree from '@/components/ProjectTree.vue'
import ProjectDetails from '@/components/ProjectDetails.vue'
import { useProjectStore, type ProjectFile } from '@/stores/projectStore'

const projectStore = useProjectStore()

const selectedProjectId = ref<string>('')
const showAddProjectDialog = ref(false)
const technologiesInput = ref('')

const newProject = ref({
  name: '',
  description: '',
  type: 'web' as 'web' | 'mobile' | 'desktop' | 'api',
  status: 'active' as 'active' | 'inactive' | 'archived',
  technologies: [] as string[],
  files: [] as ProjectFile[]
})

const selectedProject = computed(() => projectStore.selectedProject)

function handleProjectChange() {
  if (selectedProjectId.value) {
    projectStore.selectProject(selectedProjectId.value)
  }
}

function handleFileSelect(file: ProjectFile) {
  projectStore.selectFile(file.id)
}

function handleFolderToggle(folderId: string) {
  projectStore.toggleFolder(folderId)
}

function refreshProjects() {
  // In a real app, this would fetch projects from an API
  console.log('Refreshing projects...')
}

function openAddProjectDialog() {
  showAddProjectDialog.value = true
  // Reset form
  newProject.value = {
    name: '',
    description: '',
    type: 'web',
    status: 'active',
    technologies: [],
    files: []
  }
  technologiesInput.value = ''
}

function createProject() {
  if (!newProject.value.name.trim()) return

  // Parse technologies from input
  const technologies = technologiesInput.value
    .split(',')
    .map(tech => tech.trim())
    .filter(tech => tech.length > 0)

  projectStore.addProject({
    ...newProject.value,
    technologies,
    files: [
      {
        id: `${Date.now()}-readme`,
        name: 'README.md',
        type: 'file',
        path: '/README.md',
        size: 256,
        lastModified: new Date().toISOString().split('T')[0],
        content: `# ${newProject.value.name}\n\n${newProject.value.description}`
      }
    ]
  })

  showAddProjectDialog.value = false
}
</script>