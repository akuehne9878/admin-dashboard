<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold">Analytics</h2>
      <p class="text-muted-foreground">Track your performance metrics</p>
    </div>

    <!-- Key Metrics -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Page Views</p>
              <p class="text-2xl font-bold">127,543</p>
            </div>
            <TrendingUp class="h-4 w-4 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Unique Visitors</p>
              <p class="text-2xl font-bold">24,891</p>
            </div>
            <Users class="h-4 w-4 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Bounce Rate</p>
              <p class="text-2xl font-bold">34.2%</p>
            </div>
            <Activity class="h-4 w-4 text-orange-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Conversion Rate</p>
              <p class="text-2xl font-bold">8.7%</p>
            </div>
            <Target class="h-4 w-4 text-purple-600" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Charts -->
    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-80 w-full bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <BarChart3 class="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <p class="text-muted-foreground">Interactive traffic chart would go here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-80 w-full bg-linear-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <PieChart class="h-16 w-16 text-green-600 mx-auto mb-4" />
              <p class="text-muted-foreground">Engagement metrics chart would go here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Top Pages -->
    <Card>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div v-for="page in topPages" :key="page.path" class="flex items-center justify-between">
            <div>
              <p class="font-medium">{{ page.title }}</p>
              <p class="text-sm text-muted-foreground">{{ page.path }}</p>
            </div>
            <div class="text-right">
              <p class="font-medium">{{ page.views }}</p>
              <p class="text-sm text-muted-foreground">{{ page.percentage }}%</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { TrendingUp, Users, Activity, Target, BarChart3, PieChart } from 'lucide-vue-next'
import {Card} from '@/components/ui/card'
import {CardHeader} from '@/components/ui/card'
import {CardTitle} from '@/components/ui/card'
import {CardContent} from '@/components/ui/card'

const topPages = [
  { title: 'Homepage', path: '/', views: '45,231', percentage: '35.6' },
  { title: 'Product Page', path: '/products', views: '23,456', percentage: '18.4' },
  { title: 'About Us', path: '/about', views: '12,789', percentage: '10.0' },
  { title: 'Contact', path: '/contact', views: '8,945', percentage: '7.0' },
  { title: 'Blog', path: '/blog', views: '6,123', percentage: '4.8' },
]
</script>