<template>
  <div class="w-full px-0 md:px-3">
    <form @submit.prevent="handleSubmit" class="flex gap-3 items-start">
      <textarea v-model="newTodoText" ref="inputRef" @input="autoResize" placeholder="Add a new note or task..."
        rows="1"
        class="input-field flex-1 text-gray-800 bg-white border border-gray-300 overflow-hidden resize-none min-h-[40px] max-h-[300px]" />
      <button type="submit" :disabled="!newTodoText.trim()"
        class="btn-gradient disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2">
        Add
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const emit = defineEmits(['add-todo'])
const newTodoText = ref('')
const inputRef = ref(null)

async function handleSubmit() {
  if (!newTodoText.value.trim()) return
  emit('add-todo', newTodoText.value)
  newTodoText.value = ''
  await nextTick()
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
    inputRef.value.focus()
  }
}

function autoResize(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = el.scrollHeight + 'px'
}
</script>