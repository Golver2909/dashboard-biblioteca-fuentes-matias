import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/pages/Dashboard.vue";
import FormLibro from '@/pages/FormLibro.vue';
import ListaLibros from '@/pages/ListaLibros.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: Dashboard, 
      children: [
        { path: 'libros/nuevo', component: FormLibro },
        { path: 'libros',component: ListaLibros }
      ]
    }
  ],
})

export default router
