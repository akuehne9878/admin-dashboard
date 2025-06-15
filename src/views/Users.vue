<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Users</h2>
        <p class="text-muted-foreground">Manage your user accounts</p>
      </div>
      <Button>
        <Plus class="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>

    <!-- Filters -->
    <div class="flex items-center space-x-2">
      <Input placeholder="Search users..." class="max-w-sm" />
      <Button variant="outline">
        <Filter class="h-4 w-4 mr-2" />
        Filter
      </Button>
    </div>

    <!-- Users Table -->
    <Card>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="user in users" :key="user.id">
              <TableCell>
                <div class="flex items-center space-x-3">
                  <div class="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User class="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p class="font-medium">{{ user.name }}</p>
                    <p class="text-sm text-muted-foreground">{{ user.username }}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{{ user.email }}</TableCell>
              <TableCell>
                <Badge :variant="user.role === 'Admin' ? 'default' : 'secondary'">
                  {{ user.role }}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge :variant="user.status === 'Active' ? 'default' : 'secondary'">
                  {{ user.status }}
                </Badge>
              </TableCell>
              <TableCell>{{ user.joined }}</TableCell>
              <TableCell class="text-right">
                <div class="flex items-center justify-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit class="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 class="h-4 w-4" />
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
import { Plus, Filter, User, Edit, Trash2 } from 'lucide-vue-next'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Card} from '@/components/ui/card'
import {CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Table} from '@/components/ui/table'
import {TableHeader} from '@/components/ui/table'
import {TableBody} from '@/components/ui/table'
import {TableRow} from '@/components/ui/table'
import {TableHead} from '@/components/ui/table'
import {TableCell} from '@/components/ui/table'

const users = [
  {
    id: 1,
    name: 'John Doe',
    username: '@johndoe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Jan 15, 2024',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    username: '@sarahsmith',
    email: 'sarah@example.com',
    role: 'User',
    status: 'Active',
    joined: 'Jan 20, 2024',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    username: '@mikejohnson',
    email: 'mike@example.com',
    role: 'User',
    status: 'Inactive',
    joined: 'Jan 25, 2024',
  },
  {
    id: 4,
    name: 'Emily Davis',
    username: '@emilydavis',
    email: 'emily@example.com',
    role: 'User',
    status: 'Active',
    joined: 'Feb 01, 2024',
  },
  {
    id: 5,
    name: 'David Wilson',
    username: '@davidwilson',
    email: 'david@example.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Feb 05, 2024',
  },
]
</script>