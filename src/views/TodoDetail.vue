<template>
  <div class="max-w-3xl mx-auto px-4 py-8 flex flex-col h-screen">
    <!-- Fixed header with title + Back button -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl sm:text-3xl font-bold">Task Detail</h1>
      <button @click="goBack" class="btn-secondary ml-4">Back</button>
    </div>

    <!-- Scrollable content -->
    <div class="flex-1 overflow-y-auto">
      <div
        class="bg-white border border-gray-300 rounded-lg p-6 shadow-md whitespace-pre-wrap break-all text-gray-800">
        {{ todo?.text }}
      </div>
    </div>
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
