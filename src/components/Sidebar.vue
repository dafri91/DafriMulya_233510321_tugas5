<template>
  <aside
    class="fixed inset-y-0 z-50 w-64 bg-gradient-to-b from-blue-600 to-blue-400 text-white transform transition-transform duration-300 sm:static sm:translate-x-0 shadow-lg"
    :class="open ? 'translate-x-0' : '-translate-x-full'">
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 ">
      <div>
        <h2 class="text-2xl font-extrabold tracking-tight">TodoList</h2>
        <p class="text-[0.75rem] opacity-80">Task Management</p>
      </div>
      <!-- Close button for mobile -->
      <button @click="emit('close')" class="sm:hidden p-2 text-white hover:text-blue-200 focus:outline-none"
        aria-label="Close Sidebar">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Filters -->
    <nav class="flex-1 px-4 py-5">
      <div class="space-y-2">
        <button v-for="item in filters" :key="item.value" @click="changeFilter(item.value)" :class="[
          'w-full text-left px-4 py-2 rounded-lg transition',
          currentFilter === item.value
            ? 'bg-white bg-opacity-20 border border-white/30 font-semibold'
            : 'hover:bg-white/10'
        ]">
          {{ item.label }}
        </button>
      </div>
    </nav>

    <!-- Stats -->
    <div class="px-5 py-4 border-t border-blue-500 bg-blue-700/30">
      <div class="text-center">
        <div class="text-lg font-bold">{{ completionPercentage }}%</div>
        <div class="text-xs opacity-80">Completion Rate</div>
        <div class="mt-2 bg-blue-400 rounded-full h-2 overflow-hidden">
          <div class="bg-white h-2 rounded-full transition-all duration-300"
            :style="{ width: `${completionPercentage}%` }"></div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useTodosStore } from '../stores/todos'

const props = defineProps({
  open: Boolean,
  currentFilter: String
})

const emit = defineEmits(['filter-change', 'close'])

const filters = [
  { label: 'All Tasks', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' }
]

function changeFilter(filter) {
  emit('filter-change', filter)
  emit('close')
}

const store = useTodosStore()
const completedCount = computed(() => store.completedTodos.length)
const totalCount = computed(() => store.totalCount)
const completionPercentage = computed(() =>
  totalCount.value ? Math.round((completedCount.value / totalCount.value) * 100) : 0
)
</script>
