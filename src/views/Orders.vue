<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Orders</h2>
        <p class="text-muted-foreground">Manage customer orders</p>
      </div>
      <Button variant="default">
        <Plus class="h-4 w-4 mr-2" />
        New Order1
      </Button>
    </div>

    <!-- Order Stats -->
    <div class="grid gap-4 md:grid-cols-4">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Total Orders</p>
              <p class="text-2xl font-bold">1,234</p>
            </div>
            <ShoppingCart class="h-4 w-4 text-blue-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Pending</p>
              <p class="text-2xl font-bold">23</p>
            </div>
            <Clock class="h-4 w-4 text-orange-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Completed</p>
              <p class="text-2xl font-bold">1,156</p>
            </div>
            <CheckCircle class="h-4 w-4 text-green-600" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Cancelled</p>
              <p class="text-2xl font-bold">55</p>
            </div>
            <XCircle class="h-4 w-4 text-red-600" />
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Orders Table -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="order in orders" :key="order.id">
              <TableCell class="font-medium">#{{ order.id }}</TableCell>
              <TableCell>{{ order.customer }}</TableCell>
              <TableCell>${{ order.amount }}</TableCell>
              <TableCell>
                <Badge :variant="getStatusVariant(order.status)">
                  {{ order.status }}
                </Badge>
              </TableCell>
              <TableCell>{{ order.date }}</TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit class="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Plus, ShoppingCart, Clock, CheckCircle, XCircle, Eye, Edit } from 'lucide-vue-next'
import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {CardHeader} from '@/components/ui/card'
import {CardTitle} from '@/components/ui/card'
import {CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Table} from '@/components/ui/table'
import {TableHeader} from '@/components/ui/table'
import {TableBody} from '@/components/ui/table'
import {TableRow} from '@/components/ui/table'
import {TableHead} from '@/components/ui/table'
import {TableCell} from '@/components/ui/table'

const orders = [
  {
    id: '1001',
    customer: 'John Doe',
    amount: '299.99',
    status: 'Completed',
    date: 'Jan 15, 2024',
  },
  {
    id: '1002',
    customer: 'Sarah Smith',
    amount: '149.50',
    status: 'Pending',
    date: 'Jan 16, 2024',
  },
  {
    id: '1003',
    customer: 'Mike Johnson',
    amount: '89.99',
    status: 'Completed',
    date: 'Jan 17, 2024',
  },
  {
    id: '1004',
    customer: 'Emily Davis',
    amount: '199.00',
    status: 'Cancelled',
    date: 'Jan 18, 2024',
  },
  {
    id: '1005',
    customer: 'David Wilson',
    amount: '349.99',
    status: 'Processing',
    date: 'Jan 19, 2024',
  },
]

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'default'
    case 'Pending':
    case 'Processing':
      return 'secondary'
    case 'Cancelled':
      return 'destructive'
    default:
      return 'secondary'
  }
}
</script>