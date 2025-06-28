<template>
    <div class="max-w-3xl mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Task Detail</h1>
        <div
            class="bg-white border border-gray-300 rounded-lg p-6 shadow-md whitespace-pre-wrap break-all text-gray-800">
            {{ todo?.text }}
        </div>

        <button @click="goBack" class="mt-6 btn-secondary">Back</button>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTodosStore } from '../stores/todos'

const route = useRoute()
const router = useRouter()
const store = useTodosStore()

const { todos } = storeToRefs(store)
const todo = todos.value.find(t => String(t.id) === route.params.id)

function goBack() {
    router.back()
}
</script>
