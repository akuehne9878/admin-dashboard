<template>
    <div class="space-y-6">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-bold">Parameters</h2>
                <p class="text-muted-foreground">Maintain all parameters here</p>
            </div>
            <Button @click="openAddModal = true">
                <Plus class="h-4 w-4 mr-2" /> Add Parameter
            </Button>
        </div>
        <Card>
            <CardContent class="p-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Key</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead class="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="param in parameterStore.parameters" :key="param.key">
                            <TableCell>{{ param.key }}</TableCell>
                            <TableCell>{{ param.name }}</TableCell>
                            <TableCell>{{ param.description }}</TableCell>
                            <TableCell>{{ param.value }}</TableCell>
                            <TableCell class="text-right">
                                <Button variant="ghost" size="sm" @click="editParam(param)">
                                    <Edit class="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" @click="deleteParam(param.key)">
                                    <Trash2 class="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card v-if="openAddModal || openEditModal"
            class="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
            <CardContent class="w-full max-w-md bg-white rounded shadow-lg p-6">
                <h3 class="text-xl font-bold mb-4">
                    {{ openEditModal ? 'Edit Parameter' : 'Add Parameter' }}
                </h3>
                <Input v-model="modalParam.key" placeholder="Key" class="mb-2" :disabled="openEditModal" />
                <Input v-model="modalParam.name" placeholder="Name" class="mb-2" />
                <Input v-model="modalParam.description" placeholder="Description" class="mb-2" />
                <Input v-model="modalParam.value" placeholder="Value" class="mb-4" />
                <div class="flex justify-end space-x-2">
                    <Button variant="outline" @click="closeModal">Cancel</Button>
                    <Button :disabled="!modalParam.key.trim() || !modalParam.name.trim()"
                        @click="openEditModal ? updateParam() : addParam()">
                        {{ openEditModal ? 'Save' : 'Add' }}
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { useParameterStore, Parameter } from '@/stores/parameterStore'

const parameterStore = useParameterStore()
const openAddModal = ref(false)
const openEditModal = ref(false)
const modalParam = ref<Parameter>({ key: '', name: '', description: '', value: '' })
const editingKey = ref<string | null>(null)

function addParam() {
    if (!modalParam.value.key.trim() || !modalParam.value.name.trim()) return
    parameterStore.addParameter({ ...modalParam.value })
    closeModal()
}
function editParam(param: Parameter) {
    openEditModal.value = true
    editingKey.value = param.key
    modalParam.value = { ...param }
}
function updateParam() {
    if (!editingKey.value) return
    parameterStore.updateParameter(editingKey.value, { ...modalParam.value })
    closeModal()
}
function deleteParam(key: string) {
    parameterStore.deleteParameter(key)
}
function closeModal() {
    openAddModal.value = false
    openEditModal.value = false
    editingKey.value = null
    modalParam.value = { key: '', name: '', description: '', value: '' }
}
</script>