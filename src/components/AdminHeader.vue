<template>
  <header class="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
    <div class="flex items-center space-x-4">
      <h1 class="text-lg font-semibold">{{ pageTitle }}</h1>
    </div>

    <div class="flex items-center space-x-4">
      <!-- Search -->
      <div class="relative hidden md:block">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          class="w-64 pl-10"
        />
      </div>

      <!-- Notifications -->
      <Button variant="ghost" size="icon" class="relative">
        <Bell class="h-4 w-4" />
        <span class="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-xs flex items-center justify-center text-white">
          3
        </span>
      </Button>

      <!-- Theme Toggle -->
      <Button variant="ghost" size="icon" @click="toggleTheme">
        <Sun v-if="isDark" class="h-4 w-4" />
        <Moon v-else class="h-4 w-4" />
      </Button>

      <!-- User Menu -->
      <Button variant="ghost" size="icon">
        <User class="h-4 w-4" />
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Bell, Sun, Moon, User } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import Input from './ui/Input.vue'

const route = useRoute()
const isDark = ref(false)

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/analytics': 'Analytics',
    '/users': 'Users',
    '/orders': 'Orders',
    '/reports': 'Reports',
    '/settings': 'Settings',
  }
  return titles[route.path] || 'Dashboard'
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>