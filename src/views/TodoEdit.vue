<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Edit Task</h1>

    <form @submit.prevent="handleSave" class="space-y-4">
      <textarea
        v-model="editText"
        placeholder="Edit your note..."
        class="input-field w-full text-gray-800 bg-white border border-gray-300 resize-y min-h-[200px]"
      />

      <div class="flex gap-3">
        <button type="submit" class="btn-gradient px-6 py-2">Save</button>
        <button type="button" @click="goBack" class="btn-secondary px-6 py-2">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTodosStore } from '../stores/todos'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const store = useTodosStore()

const { todos } = storeToRefs(store)
const todo = todos.value.find(t => String(t.id) === route.params.id)

const editText = ref(todo?.text || '')

function handleSave() {
  if (todo && editText.value.trim()) {
    store.editTodo(todo.id, editText.value)
  }
  router.push(`/todos/all`)
}

function goBack() {
  router.back()
}
</script>
