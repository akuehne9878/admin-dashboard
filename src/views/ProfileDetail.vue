<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Profile: {{ profile?.name }}</h2>
        <p class="text-muted-foreground">Assign parameters and values to this profile</p>
      </div>
    </div>
    <div v-if="profile">
      <!-- Assignment Form -->
      <div class="flex items-end gap-4 mb-6">
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1" for="param-select">Parameter</label>
          <select
            id="param-select"
            v-model="selectedParamKey"
            class="block w-full border rounded px-3 py-2"
          >
            <option value="" disabled>Select parameter</option>
            <option v-for="param in availableParams" :key="param.key" :value="param.key">
              {{ param.name }} ({{ param.key }})
            </option>
          </select>
        </div>
        <div class="flex-1">
          <label class="block text-sm font-medium mb-1" for="param-value">Value</label>
          <Input
            id="param-value"
            v-model="paramValue"
            placeholder="Enter value"
            class="w-full"
          />
        </div>
        <Button
          :disabled="!selectedParamKey || !paramValue"
          @click="assignParam"
        >
          Assign
        </Button>
      </div>

      <!-- Assigned Parameters Table -->
      <Card>
        <CardContent class="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Value</TableHead>
                <TableHead class="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="pp in profile.params" :key="pp.key">
                <TableCell>
                  <span class="font-semibold">{{ getParamName(pp.key) }}</span>
                  <span class="text-xs text-muted-foreground ml-1">({{ pp.key }})</span>
                </TableCell>
                <TableCell>
                  <span class="text-xs">{{ getParamDesc(pp.key) }}</span>
                </TableCell>
                <TableCell>
                  {{ pp.value }}
                </TableCell>
                <TableCell class="text-right">
                  <Button variant="ghost" size="sm" @click="removeParam(pp.key)">
                    <Trash2 class="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    <div v-else>
      <p class="text-red-600">Profile not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Trash2 } from 'lucide-vue-next'
import { useProfileStore } from '@/stores/profileStore'
import { useParameterStore } from '@/stores/parameterStore'

const route = useRoute()
const profileStore = useProfileStore()
const parameterStore = useParameterStore()

const profileId = Number(route.params.id)
const profile = computed(() => profileStore.profiles.find(p => p.id === profileId))

const selectedParamKey = ref('')
const paramValue = ref('')

const availableParams = computed(() => parameterStore.parameters)

// Helpers to get parameter name and description from key
function getParamName(key: string) {
  const param = parameterStore.parameters.find(p => p.key === key)
  return param ? param.name : key
}
function getParamDesc(key: string) {
  const param = parameterStore.parameters.find(p => p.key === key)
  return param ? param.description : ''
}

function assignParam() {
  if (profile.value && selectedParamKey.value && paramValue.value) {
    profileStore.assignParam(profile.value.id, selectedParamKey.value, paramValue.value)
    selectedParamKey.value = ''
    paramValue.value = ''
  }
}
function removeParam(key: string) {
  if (profile.value) profileStore.removeParam(profile.value.id, key)
}
</script>