import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "@/pages/Dashboard.vue";
import FormLibro from '@/components/FormLibro.vue';
import ListaLibros from '@/components/ListaLibros.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: Dashboard, 
      children: [
        { path: 'form', component: FormLibro },
        { path: 'list',component: ListaLibros }
      ]
      /* children: [
        { path: 'racers', component: Racers },
        { path: 'telemetry', component: Telemetry },

      ] */
    }
  ],
})

export default router
