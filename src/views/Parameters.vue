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

        <Dialog :open="openAddModal || openEditModal" @update:open="closeModal">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {{ openEditModal ? 'Edit Parameter' : 'Add Parameter' }}</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <div class="flex flex-col items-center space-x-2">
                    <div class="w-full max-w-md">
                        <label class="text-sm font-medium">Key</label>
                        <Input v-model="modalParam.key" placeholder="Key" class="mb-2" :disabled="openEditModal" />
                    </div>
                    <div class="w-full max-w-md">
                        <label class="text-sm font-medium">Name</label>
                        <Input v-model="modalParam.name" placeholder="Name" class="mb-2" />
                    </div>
                    <div class="w-full max-w-md">
                        <label class="text-sm font-medium">Description</label>
                        <Input v-model="modalParam.description" placeholder="Description" class="mb-2" />
                    </div>
                    <div class="w-full max-w-md">
                        <label class="text-sm font-medium">Value</label>
                        <Input v-model="modalParam.value" placeholder="Value" class="mb-4" />
                    </div>
                </div>

                <DialogFooter class="flex justify-end space-x-2">
                    <DialogClose as-child>
                        <Button variant="outline" @click="closeModal">Cancel</Button>
                    </DialogClose>
                    <Button :disabled="!modalParam.key.trim() || !modalParam.name.trim()"
                        @click="openEditModal ? updateParam() : addParam()">
                        {{ openEditModal ? 'Save' : 'Add' }}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>

        <TreeView :nodes="projectTree" />

    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit, Trash2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogTitle, DialogContent } from '@/components/ui/dialog'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { useParameterStore, Parameter } from '@/stores/parameterStore'
import TreeView from '@/components/custom/treeview/TreeView.vue'

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


const projectTree = [
    {
        id: '1',
        name: 'Frontend',
        children: [
            {
                id: '1-1',
                name: 'UI-Komponenten',
                children: [
                    { id: '1-1-1', name: 'Button.vue' },
                    { id: '1-1-2', name: 'Modal.vue' },
                ],
            },
            {
                id: '1-2',
                name: 'Pages',
                children: [
                    { id: '1-2-1', name: 'Home.vue' },
                    { id: '1-2-2', name: 'About.vue' },
                ],
            },
        ],
    },
    {
        id: '2',
        name: 'Backend',
        children: [
            {
                id: '2-1',
                name: 'API',
                children: [
                    { id: '2-1-1', name: 'auth.ts' },
                    { id: '2-1-2', name: 'user.ts' },
                ],
            },
            { id: '2-2', name: 'utils.ts' },
        ],
    },
    {
        id: '3',
        name: 'README.md',
    },
]

</script>