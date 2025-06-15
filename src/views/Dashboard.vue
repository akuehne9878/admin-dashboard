<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Users"
        value="2,543"
        change="+12.5%"
        changeType="increase"
        :icon="Users"
      />
      <StatsCard
        title="Revenue"
        value="$45,231"
        change="+8.2%"
        changeType="increase"
        :icon="DollarSign"
      />
      <StatsCard
        title="Orders"
        value="1,234"
        change="-2.4%"
        changeType="decrease"
        :icon="ShoppingCart"
      />
      <StatsCard
        title="Growth"
        value="24.5%"
        change="+4.1%"
        changeType="increase"
        :icon="TrendingUp"
      />
    </div>

    <!-- Charts Section -->
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Revenue Chart -->
      <Card>
        <CardHeader>
          <CardTitle>Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-80 w-full bg-muted/20 rounded-lg flex items-center justify-center">
            <p class="text-muted-foreground">Revenue Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>

      <!-- User Growth Chart -->
      <Card>
        <CardHeader>
          <CardTitle>User Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-80 w-full bg-muted/20 rounded-lg flex items-center justify-center">
            <p class="text-muted-foreground">User Growth Chart Placeholder</p>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Activity -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center space-x-4">
            <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <component :is="activity.icon" class="h-4 w-4 text-primary" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium">{{ activity.title }}</p>
              <p class="text-xs text-muted-foreground">{{ activity.description }}</p>
            </div>
            <div class="text-xs text-muted-foreground">
              {{ activity.timestamp }}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Users, DollarSign, ShoppingCart, TrendingUp, UserPlus, Package, CreditCard } from 'lucide-vue-next'
import StatsCard from '@/components/StatsCard.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'

const recentActivities = [
  {
    id: 1,
    title: 'New user registered',
    description: 'John Doe created an account',
    timestamp: '2 minutes ago',
    icon: UserPlus,
  },
  {
    id: 2,
    title: 'Order completed',
    description: 'Order #1234 has been processed',
    timestamp: '5 minutes ago',
    icon: Package,
  },
  {
    id: 3,
    title: 'Payment received',
    description: '$299.99 payment from Alice Smith',
    timestamp: '10 minutes ago',
    icon: CreditCard,
  },
  {
    id: 4,
    title: 'New user registered',
    description: 'Sarah Johnson created an account',
    timestamp: '15 minutes ago',
    icon: UserPlus,
  },
]
</script>