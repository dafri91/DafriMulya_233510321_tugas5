import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTodosStore = defineStore("todos", () => {
  const todos = ref([
    {
      id: 1,
      text: "Welcome to your new Todo App! Supports multiple lines,emoji 😊, and spaces!",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: 2,
      text: "Try adding a new task",
      completed: false,
      createdAt: new Date(),
    },
  ]);

  const nextId = ref(3);

  const allTodos = computed(() => todos.value);
  const activeTodos = computed(() => todos.value.filter((t) => !t.completed));
  const completedTodos = computed(() => todos.value.filter((t) => t.completed));
  const remainingCount = computed(() => activeTodos.value.length);
  const totalCount = computed(() => todos.value.length);

  function addTodo(text) {
    if (!text) return;
    todos.value.unshift({
      id: nextId.value++,
      text,
      completed: false,
      createdAt: new Date(),
    });
  }

  function toggleTodo(id) {
    const todo = todos.value.find((t) => t.id === id);
    if (todo) todo.completed = !todo.completed;
  }

  function deleteTodo(id) {
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  function editTodo(id, newText) {
    const todo = todos.value.find((t) => t.id === id);
    if (todo && newText) {
      todo.text = newText;
    }
  }

  function clearCompleted() {
    todos.value = todos.value.filter((t) => !t.completed);
  }

  function markAllComplete() {
    todos.value.forEach((t) => (t.completed = true));
  }

  return {
    todos,
    allTodos,
    activeTodos,
    completedTodos,
    remainingCount,
    totalCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    markAllComplete,
  };
});
