<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h2 class="text-2xl font-bold">Settings</h2>
      <p class="text-muted-foreground">Manage your application settings</p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- General Settings -->
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">Site Name</label>
            <Input value="AdminHub" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Site Description</label>
            <Input value="Modern admin dashboard" />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Admin Email</label>
            <Input value="admin@example.com" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <!-- Security Settings -->
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Two-Factor Authentication</p>
              <p class="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Login Notifications</p>
              <p class="text-sm text-muted-foreground">Get notified of new logins</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Password Policy</p>
              <p class="text-sm text-muted-foreground">Set password requirements</p>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </CardContent>
      </Card>

      <!-- Notifications -->
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Email Notifications</p>
              <p class="text-sm text-muted-foreground">Receive email updates</p>
            </div>
            <Button variant="outline" size="sm">Enabled</Button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">Push Notifications</p>
              <p class="text-sm text-muted-foreground">Browser notifications</p>
            </div>
            <Button variant="outline" size="sm">Disabled</Button>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">SMS Notifications</p>
              <p class="text-sm text-muted-foreground">Text message alerts</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </CardContent>
      </Card>

      <!-- API Settings -->
      <Card>
        <CardHeader>
          <CardTitle>API Settings</CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">API Key</label>
            <div class="flex space-x-2">
              <Input value="****-****-****-1234" readonly />
              <Button variant="outline" size="sm">Regenerate</Button>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Rate Limit</label>
            <Input value="1000 requests/hour" />
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-medium">API Documentation</p>
              <p class="text-sm text-muted-foreground">Access developer resources</p>
            </div>
            <Button variant="outline" size="sm">View Docs</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Card} from '@/components/ui/card'
import {CardHeader} from '@/components/ui/card'
import {CardTitle} from '@/components/ui/card'
import {CardContent} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
</script>