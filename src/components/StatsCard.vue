<template>
  <Card>
    <CardContent class="p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
          <p class="text-3xl font-bold">{{ value }}</p>
          <p class="text-xs text-muted-foreground mt-1">
            <span :class="changeType === 'increase' ? 'text-green-600' : 'text-red-600'">
              {{ change }}
            </span>
            from last month
          </p>
        </div>
        <div class="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <component :is="icon" class="h-6 w-6 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import {Card} from '@/components/ui/card'
import {CardContent} from '@/components/ui/card'

interface Props {
  title: string
  value: string
  change: string
  changeType: 'increase' | 'decrease'
  icon: any
}

defineProps<Props>()
</script>