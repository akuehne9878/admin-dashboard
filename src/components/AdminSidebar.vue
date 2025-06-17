<template>
  <aside class="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r transition-transform duration-300 ease-in-out">
    <div class="flex h-full flex-col">
      <!-- Logo -->
      <div class="flex h-16 items-center justify-center border-b px-6">
        <div class="flex items-center space-x-2">
          <Settings class="h-8 w-8 text-primary" />
          <span class="text-xl font-bold">AdminHub</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 p-4">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.path"
          class="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          :class="{ 'bg-accent text-accent-foreground': $route.path === item.path }">
          <component :is="item.icon" class="h-4 w-4" />
          <span>{{ item.name }}</span>
        </router-link>
      </nav>

      <!-- User Profile -->
      <div class="border-t p-4">
        <div class="flex items-center space-x-3">
          <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <User class="h-4 w-4 text-primary" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium">Admin User</p>
            <p class="text-xs text-muted-foreground">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>



  </aside>
</template>

<script setup lang="ts">
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  User,
  ShoppingCart,
  FileText,
  FolderOpen
} from 'lucide-vue-next'

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Users', path: '/users', icon: Users },
  { name: 'Orders', path: '/orders', icon: ShoppingCart },
  { name: 'Reports', path: '/reports', icon: FileText },
  { name: 'Projects', path: '/projects', icon: FolderOpen },
  { name: 'Profiles', path: '/profiles', icon: Settings },
  { name: 'Parameters', path: '/parameters', icon: Settings },
  { name: 'Settings', path: '/settings', icon: Settings }
]
</script>