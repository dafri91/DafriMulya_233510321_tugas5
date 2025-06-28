<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar :open="sidebarOpen" :current-filter="filter" @filter-change="handleFilterChange"
      @close="sidebarOpen = false" />
    <!-- Overlay for Mobile -->
    <div v-if="sidebarOpen" @click="sidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-70 z-40 sm:hidden transition-opacity duration-300"></div>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      <!-- Header with Hamburger -->
      <header class="relative bg-gradient-to-b from-blue-600 to-blue-600 text-white px-4 py-5 sm:px-6 sm:py-4">
        <div class="flex items-center justify-between sm:justify-start">
          <!-- Hamburger (mobile only) -->
          <button @click="sidebarOpen = !sidebarOpen" class="sm:hidden focus:outline-none relative z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <!-- Desktop title (default) -->
          <div class="hidden sm:block ml-4">
            <h1 class="text-2xl font-bold">{{ getFilterTitle() }}</h1>
            <p class="text-sm">{{ getFilterDescription() }}</p>
          </div>
        </div>

        <!-- Absolute centered for mobile only -->
        <div class="absolute inset-0 flex flex-col items-center justify-center sm:hidden pointer-events-none">
          <h1 class="text-lg font-bold">{{ getFilterTitle() }}</h1>
          <p class="text-xs">{{ getFilterDescription() }}</p>
        </div>
      </header>


      <!-- Add Todo -->
      <div class="bg-white border-b px-4 py-3 sm:px-6">
        <AddTodo @add-todo="handleAddTodo" />

        <!-- Mobile-only Counts Row -->
        <div class="mt-3 sm:hidden flex gap-2">
          <div
            class="inline-block border border-blue-400 rounded-lg px-3 py-1 text-blue-600 bg-blue-50 shadow-sm text-sm">
            {{ totalCount }} total tasks
          </div>
          <div
            class="inline-block border border-blue-400 rounded-lg px-3 py-1 text-blue-600 bg-blue-50 shadow-sm text-sm">
            {{ remainingCount }} of {{ totalCount }} tasks remaining
          </div>
        </div>
      </div>

      <!-- Todo List -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6">
        <TodoList :todos="filteredTodos" @toggle-todo="handleToggleTodo" @delete-todo="handleDeleteTodo"
          @edit-todo="handleEditTodo" />
        <div v-if="filteredTodos.length === 0"
          class="flex flex-1 flex-col justify-center items-center text-center text-gray-400 px-4">
          <div class="max-w-md">
            <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="text-lg font-semibold">{{ getEmptyStateTitle() }}</h3>
            <p class="text-sm mt-1">{{ getEmptyStateDescription() }}</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="totalCount > 0" class="bg-white border-t px-4 py-3 sm:px-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <!-- TASK COUNTS GROUP (Desktop Only) -->
          <div class="hidden sm:flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <!-- Total Tasks Box -->
            <div
              class="text-gray-800 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base w-full sm:w-auto text-center shadow-sm">
              {{ totalCount }} total tasks
            </div>

            <!-- Remaining of Total Box -->
            <div
              class="text-gray-800 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm sm:text-base w-full sm:w-auto text-center shadow-sm">
              {{ remainingCount }} of {{ totalCount }} tasks remaining
            </div>
          </div>

          <!-- Action Buttons (Always Visible) -->
          <!-- Action Buttons (Always Visible) -->
          <div class="flex gap-2
         sm:static
         fixed bottom-4 left-0 w-full px-4
         sm:w-auto sm:px-0
         sm:bottom-auto
         sm:bg-transparent
         z-40
         sm:z-auto
         justify-start
         sm:justify-start">
            <button v-if="remainingCount > 0" @click="handleMarkAllComplete" class="btn-secondary text-sm">
              Mark All Complete
            </button>
            <button v-if="completedCount > 0" @click="handleClearCompleted" class="btn-secondary text-sm">
              Clear Completed ({{ completedCount }})
            </button>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTodosStore } from "../stores/todos";
import Sidebar from "../components/Sidebar.vue";
import AddTodo from "../components/AddTodo.vue";
import TodoList from "../components/TodoList.vue";

const route = useRoute();
const router = useRouter();
const store = useTodosStore();
const sidebarOpen = ref(false);

const filter = computed(() => route.params.filter || "all");

// ✅ Make store properties reactive
const { remainingCount, totalCount, completedTodos } = storeToRefs(store);
const completedCount = computed(() => completedTodos.value.length);

const filteredTodos = computed(() => {
  switch (filter.value) {
    case "active":
      return store.activeTodos;
    case "completed":
      return store.completedTodos;
    default:
      return store.allTodos;
  }
});

function handleFilterChange(newFilter) {
  router.push(`/todos/${newFilter}`);
}

function handleAddTodo(text) {
  store.addTodo(text);
}

function handleToggleTodo(id) {
  store.toggleTodo(id);
}

function handleDeleteTodo(id) {
  store.deleteTodo(id);
}

function handleEditTodo(id, text) {
  store.editTodo(id, text);
}

function handleMarkAllComplete() {
  store.markAllComplete();
}

function handleClearCompleted() {
  store.clearCompleted();
}

function getFilterTitle() {
  return filter.value === "active"
    ? "Active Tasks"
    : filter.value === "completed"
      ? "Completed Tasks"
      : "All Tasks";
}

function getFilterDescription() {
  return filter.value === "active"
    ? "Tasks that still need to be completed"
    : filter.value === "completed"
      ? "Tasks you have finished"
      : "All your tasks in one place";
}

function getEmptyStateTitle() {
  return filter.value === "active"
    ? "No active tasks"
    : filter.value === "completed"
      ? "No completed tasks"
      : "No tasks yet";
}

function getEmptyStateDescription() {
  return filter.value === "active"
    ? "All your tasks are complete! Great job."
    : filter.value === "completed"
      ? "Complete some tasks to see them here."
      : "Add your first task to get started.";
}
</script>
