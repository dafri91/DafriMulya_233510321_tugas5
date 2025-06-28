import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import TodoApp from './views/TodoApp.vue'
import TodoDetail from './views/TodoDetail.vue'
import TodoEdit from './views/TodoEdit.vue'

const routes = [
  { path: '/', redirect: '/todos/all' },
  { path: '/todos/:filter(all|active|completed)?', component: TodoApp },
  { path: '/todos/:id(\\d+)', component: TodoDetail },
  { path: '/todos/:id(\\d+)/edit', component: TodoEdit },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
