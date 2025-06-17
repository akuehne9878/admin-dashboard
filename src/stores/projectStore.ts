import { defineStore } from 'pinia'

export interface ProjectFile {
  id: string
  name: string
  type: 'file' | 'folder'
  path: string
  parentId?: string
  children?: ProjectFile[]
  size?: number
  lastModified?: string
  content?: string
}

export interface Project {
  id: string
  name: string
  description: string
  type: 'web' | 'mobile' | 'desktop' | 'api'
  status: 'active' | 'inactive' | 'archived'
  createdAt: string
  lastModified: string
  files: ProjectFile[]
  technologies: string[]
  repository?: string
}

interface State {
  projects: Project[]
  selectedProjectId: string | null
  selectedFileId: string | null
  expandedFolders: Set<string>
}

export const useProjectStore = defineStore('project', {
  state: (): State => ({
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Modern e-commerce platform built with Vue.js and Node.js',
        type: 'web',
        status: 'active',
        createdAt: '2024-01-15',
        lastModified: '2024-01-20',
        technologies: ['Vue.js', 'TypeScript', 'Node.js', 'MongoDB'],
        repository: 'https://github.com/company/ecommerce-platform',
        files: [
          {
            id: '1-1',
            name: 'src',
            type: 'folder',
            path: '/src',
            children: [
              {
                id: '1-1-1',
                name: 'components',
                type: 'folder',
                path: '/src/components',
                parentId: '1-1',
                children: [
                  {
                    id: '1-1-1-1',
                    name: 'ProductCard.vue',
                    type: 'file',
                    path: '/src/components/ProductCard.vue',
                    parentId: '1-1-1',
                    size: 2048,
                    lastModified: '2024-01-20',
                    content: '<template>\n  <div class="product-card">\n    <!-- Product card content -->\n  </div>\n</template>'
                  },
                  {
                    id: '1-1-1-2',
                    name: 'ShoppingCart.vue',
                    type: 'file',
                    path: '/src/components/ShoppingCart.vue',
                    parentId: '1-1-1',
                    size: 3072,
                    lastModified: '2024-01-19'
                  }
                ]
              },
              {
                id: '1-1-2',
                name: 'views',
                type: 'folder',
                path: '/src/views',
                parentId: '1-1',
                children: [
                  {
                    id: '1-1-2-1',
                    name: 'Home.vue',
                    type: 'file',
                    path: '/src/views/Home.vue',
                    parentId: '1-1-2',
                    size: 4096,
                    lastModified: '2024-01-18'
                  },
                  {
                    id: '1-1-2-2',
                    name: 'Products.vue',
                    type: 'file',
                    path: '/src/views/Products.vue',
                    parentId: '1-1-2',
                    size: 5120,
                    lastModified: '2024-01-20'
                  }
                ]
              }
            ]
          },
          {
            id: '1-2',
            name: 'package.json',
            type: 'file',
            path: '/package.json',
            size: 1024,
            lastModified: '2024-01-15',
            content: '{\n  "name": "ecommerce-platform",\n  "version": "1.0.0",\n  "dependencies": {\n    "vue": "^3.4.0"\n  }\n}'
          },
          {
            id: '1-3',
            name: 'README.md',
            type: 'file',
            path: '/README.md',
            size: 512,
            lastModified: '2024-01-16',
            content: '# E-commerce Platform\n\nA modern e-commerce solution built with Vue.js'
          }
        ]
      },
      {
        id: '2',
        name: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication',
        type: 'mobile',
        status: 'active',
        createdAt: '2024-01-10',
        lastModified: '2024-01-22',
        technologies: ['React Native', 'TypeScript', 'Firebase'],
        repository: 'https://github.com/company/mobile-banking',
        files: [
          {
            id: '2-1',
            name: 'src',
            type: 'folder',
            path: '/src',
            children: [
              {
                id: '2-1-1',
                name: 'screens',
                type: 'folder',
                path: '/src/screens',
                parentId: '2-1',
                children: [
                  {
                    id: '2-1-1-1',
                    name: 'LoginScreen.tsx',
                    type: 'file',
                    path: '/src/screens/LoginScreen.tsx',
                    parentId: '2-1-1',
                    size: 3584,
                    lastModified: '2024-01-22'
                  },
                  {
                    id: '2-1-1-2',
                    name: 'DashboardScreen.tsx',
                    type: 'file',
                    path: '/src/screens/DashboardScreen.tsx',
                    parentId: '2-1-1',
                    size: 4608,
                    lastModified: '2024-01-21'
                  }
                ]
              }
            ]
          },
          {
            id: '2-2',
            name: 'App.tsx',
            type: 'file',
            path: '/App.tsx',
            size: 2048,
            lastModified: '2024-01-20'
          }
        ]
      },
      {
        id: '3',
        name: 'Analytics Dashboard',
        description: 'Real-time analytics dashboard for business intelligence',
        type: 'web',
        status: 'inactive',
        createdAt: '2024-01-05',
        lastModified: '2024-01-12',
        technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
        files: [
          {
            id: '3-1',
            name: 'dashboard',
            type: 'folder',
            path: '/dashboard',
            children: [
              {
                id: '3-1-1',
                name: 'charts',
                type: 'folder',
                path: '/dashboard/charts',
                parentId: '3-1',
                children: [
                  {
                    id: '3-1-1-1',
                    name: 'LineChart.jsx',
                    type: 'file',
                    path: '/dashboard/charts/LineChart.jsx',
                    parentId: '3-1-1',
                    size: 2560,
                    lastModified: '2024-01-12'
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    selectedProjectId: null,
    selectedFileId: null,
    expandedFolders: new Set()
  }),

  getters: {
    selectedProject: (state) => 
      state.projects.find(p => p.id === state.selectedProjectId),
    
    selectedFile: (state) => {
      if (!state.selectedProjectId || !state.selectedFileId) return null
      const project = state.projects.find(p => p.id === state.selectedProjectId)
      if (!project) return null
      
      const findFile = (files: ProjectFile[]): ProjectFile | null => {
        for (const file of files) {
          if (file.id === state.selectedFileId) return file
          if (file.children) {
            const found = findFile(file.children)
            if (found) return found
          }
        }
        return null
      }
      
      return findFile(project.files)
    },

    projectsByStatus: (state) => {
      return {
        active: state.projects.filter(p => p.status === 'active'),
        inactive: state.projects.filter(p => p.status === 'inactive'),
        archived: state.projects.filter(p => p.status === 'archived')
      }
    }
  },

  actions: {
    selectProject(projectId: string) {
      this.selectedProjectId = projectId
      this.selectedFileId = null
    },

    selectFile(fileId: string) {
      this.selectedFileId = fileId
    },

    toggleFolder(folderId: string) {
      if (this.expandedFolders.has(folderId)) {
        this.expandedFolders.delete(folderId)
      } else {
        this.expandedFolders.add(folderId)
      }
    },

    expandFolder(folderId: string) {
      this.expandedFolders.add(folderId)
    },

    collapseFolder(folderId: string) {
      this.expandedFolders.delete(folderId)
    },

    addProject(project: Omit<Project, 'id' | 'createdAt' | 'lastModified'>) {
      const newProject: Project = {
        ...project,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      }
      this.projects.push(newProject)
    },

    updateProject(projectId: string, updates: Partial<Project>) {
      const index = this.projects.findIndex(p => p.id === projectId)
      if (index !== -1) {
        this.projects[index] = {
          ...this.projects[index],
          ...updates,
          lastModified: new Date().toISOString().split('T')[0]
        }
      }
    },

    deleteProject(projectId: string) {
      this.projects = this.projects.filter(p => p.id !== projectId)
      if (this.selectedProjectId === projectId) {
        this.selectedProjectId = null
        this.selectedFileId = null
      }
    }
  }
})