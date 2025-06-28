<template>
  <div class="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition relative group"
    :class="{ 'opacity-75': todo.completed }">
    <div class="flex items-start gap-4">
      <!-- Checkbox -->
      <button @click="$emit('toggle')"
        class="mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200" :class="todo.completed
          ? 'bg-green-500 border-green-500 text-white'
          : 'bg-white border-gray-300 text-gray-400 hover:border-green-500 hover:text-green-500'">
        <svg v-if="todo.completed" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
        </svg>
      </button>

      <!-- Text (clickable for detail) -->
      <div class="flex-1">
        <p @click="goToDetail" :class="[
          'whitespace-pre-wrap break-all cursor-pointer line-clamp-3 hover:underline transition-colors duration-300',
          todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
        ]">
          {{ todo.text }}
        </p>

      </div>

      <!-- 3-dot Menu Button -->
      <div class="relative">
        <button @click="toggleMenu" class="p-2 text-xl text-gray-800 hover:text-black focus:outline-none">
          ⋯
        </button>

        <transition name="fade">
          <div v-if="menuOpen"
            class="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-50 w-32">
            <button @click="goToEdit" class="block w-full text-left px-4 py-2 hover:bg-gray-100">Edit</button>
            <button @click="confirmDelete"
              class="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">Delete</button>
          </div>
        </transition>
      </div>
    </div>

    <!-- Confirm Delete Modal -->
    <Modal v-if="confirmDeleteModal" @close="confirmDeleteModal = false">
      <template #header>Confirm Delete</template>
      <template #body>
        Are you sure you want to delete this task?
      </template>
      <template #footer>
        <button @click="deleteItem" class="btn-secondary">Yes, Delete</button>
        <button @click="confirmDeleteModal = false" class="btn-secondary">Cancel</button>
      </template>
    </Modal>

    <!-- Edit Modal with TEXTAREA -->
    <Modal v-if="editModal" @close="cancelEdit">
      <template #header>Edit Task</template>
      <template #body>
        <textarea v-model="editText" class="input-field w-full resize-y min-h-[150px]"
          placeholder="Edit your note..." />
      </template>
      <template #footer>
        <button @click="saveEdit" class="btn-futuristic">Save</button>
        <button @click="cancelEdit" class="btn-secondary">Cancel</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import Modal from './Modal.vue'
import { useRouter } from 'vue-router'

const props = defineProps({ todo: Object })
const emit = defineEmits(['toggle', 'delete', 'edit'])

const router = useRouter()
const menuOpen = ref(false)
const confirmDeleteModal = ref(false)
const editModal = ref(false)
const editText = ref('')

function goToDetail() {
  router.push(`/todos/${props.todo.id}`)
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function confirmDelete() {
  confirmDeleteModal.value = true
  menuOpen.value = false
}

function deleteItem() {
  emit('delete')
  confirmDeleteModal.value = false
}

function goToEdit() {
  router.push(`/todos/${props.todo.id}/edit`)
}

function saveEdit() {
  emit('edit', editText.value)
  editModal.value = false
}

function cancelEdit() {
  editModal.value = false
}
</script>
