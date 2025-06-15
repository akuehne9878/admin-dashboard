<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Reports</h2>
        <p class="text-muted-foreground">Generate and view detailed reports</p>
      </div>
      <Button>
        <Download class="h-4 w-4 mr-2" />
        Export Report
      </Button>
    </div>

    <!-- Report Types -->
    <div class="grid gap-4 md:grid-cols-3">
      <Card class="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <BarChart3 class="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 class="font-semibold">Sales Report</h3>
              <p class="text-sm text-muted-foreground">Monthly sales analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <TrendingUp class="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 class="font-semibold">Performance Report</h3>
              <p class="text-sm text-muted-foreground">System performance metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card class="cursor-pointer hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center space-x-4">
            <div class="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Users class="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 class="font-semibold">User Report</h3>
              <p class="text-sm text-muted-foreground">User activity and engagement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent Reports -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div v-for="report in recentReports" :key="report.id" class="flex items-center justify-between p-4 border rounded-lg">
            <div class="flex items-center space-x-4">
              <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText class="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 class="font-medium">{{ report.name }}</h4>
                <p class="text-sm text-muted-foreground">{{ report.description }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <Badge variant="secondary">{{ report.status }}</Badge>
              <Button variant="ghost" size="sm">
                <Download class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Report Analytics -->
    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Report Generation Frequency</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-64 w-full bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <PieChart class="h-16 w-16 text-orange-600 mx-auto mb-4" />
              <p class="text-muted-foreground">Report frequency chart</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Download Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="h-64 w-full bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <Activity class="h-16 w-16 text-teal-600 mx-auto mb-4" />
              <p class="text-muted-foreground">Download activity chart</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Download, BarChart3, TrendingUp, Users, FileText, PieChart, Activity } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Badge from '@/components/ui/Badge.vue'

const recentReports = [
  {
    id: 1,
    name: 'Monthly Sales Report',
    description: 'Sales performance for January 2024',
    status: 'Completed',
  },
  {
    id: 2,
    name: 'User Engagement Report',
    description: 'User activity metrics and insights',
    status: 'Processing',
  },
  {
    id: 3,
    name: 'Financial Summary',
    description: 'Revenue and expense breakdown',
    status: 'Completed',
  },
  {
    id: 4,
    name: 'Performance Analytics',
    description: 'System performance and uptime',
    status: 'Scheduled',
  },
]
</script>