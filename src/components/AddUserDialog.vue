<template>
    <Dialog :open="open" @close="open = false">
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
            <AutoForm :schema="userSchema">
                <template #submit="{ handleSubmit }">
                    <Button type="submit" @click="handleSubmit">Create User</Button>
                </template>
            </AutoForm>
        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { AutoForm } from '@/components/ui/auto-form';

const open = ref(false);

const userSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    role: z.enum(['Admin', 'User'], {
        required_error: 'Please select a role',
    }),
    status: z.enum(['Active', 'Inactive'], {
        required_error: 'Please select a status',
    }),
});
</script>
