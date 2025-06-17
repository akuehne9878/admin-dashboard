<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Profiles</h2>
        <p class="text-muted-foreground">Maintainable groups of parameters</p>
      </div>
      <Button @click="openAddModal = true">
        <Plus class="h-4 w-4 mr-2" /> Add Profile
      </Button>
    </div>
    <Card>
      <CardContent class="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Parameters</TableHead>
              <TableHead class="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="profile in profileStore.profiles" :key="profile.id">
              <TableCell>
                <a href="#" class="text-blue-600 hover:underline" @click.prevent="goToDetail(profile.id)">
                  {{ profile.name }}
                </a>
              </TableCell>
              <TableCell>{{ profile.parameterKeys.length }}</TableCell>
              <TableCell class="text-right">
                <Button variant="ghost" size="sm" @click="editProfile(profile)">
                  <Edit class="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" @click="deleteProfile(profile.id)">
                  <Trash2 class="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
    <Card v-if="openAddModal || openEditModal" class="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
      <CardContent class="w-full max-w-md bg-white rounded shadow-lg p-6">
        <h3 class="text-xl font-bold mb-4">
          {{ openEditModal ? 'Edit Profile' : 'Add Profile' }}
        </h3>
        <Input v-model="modalProfileName" placeholder="Profile Name" class="mb-4" @keyup.enter="openEditModal ? updateProfile() : addProfile()"/>
        <div class="flex justify-end space-x-2">
          <Button variant="outline" @click="closeModal">Cancel</Button>
          <Button :disabled="!modalProfileName.trim()" @click="openEditModal ? updateProfile() : addProfile()">
            {{ openEditModal ? 'Save' : 'Add' }}
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { useProfileStore } from '@/stores/profileStore'

const profileStore = useProfileStore()
const openAddModal = ref(false)
const openEditModal = ref(false)
const modalProfileName = ref('')
const editingId = ref<number | null>(null)
const router = useRouter()

function addProfile() {
  if (!modalProfileName.value.trim()) return
  profileStore.addProfile(modalProfileName.value)
  closeModal()
}
function editProfile(profile: { id: number, name: string }) {
  openEditModal.value = true
  editingId.value = profile.id
  modalProfileName.value = profile.name
}
function updateProfile() {
  if (editingId.value === null) return
  profileStore.updateProfile(editingId.value, modalProfileName.value)
  closeModal()
}
function deleteProfile(id: number) {
  profileStore.deleteProfile(id)
}
function closeModal() {
  openAddModal.value = false
  openEditModal.value = false
  editingId.value = null
  modalProfileName.value = ''
}
function goToDetail(id: number) {
  router.push({ name: 'ProfileDetail', params: { id } })
}
</script>