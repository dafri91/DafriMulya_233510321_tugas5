<template>
  <div class="space-y-3">
    <TransitionGroup name="todo" tag="div" class="space-y-3">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="$emit('toggle-todo', todo.id)"
        @delete="$emit('delete-todo', todo.id)"
        @edit="$emit('edit-todo', todo.id, $event)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import TodoItem from "./TodoItem.vue";

defineProps({
  todos: {
    type: Array,
    required: true,
  },
});

defineEmits(["toggle-todo", "delete-todo", "edit-todo"]);
</script>

<style scoped>
.todo-enter-active,
.todo-leave-active {
  transition: all 0.3s ease;
}

.todo-enter-from {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.todo-leave-to {
  opacity: 0;
  transform: translateX(10px) scale(0.95);
}

.todo-move {
  transition: transform 0.3s ease;
}
</style>
