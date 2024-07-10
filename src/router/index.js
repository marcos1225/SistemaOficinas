import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/PaginaPrincipal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/GestionarEtiquetas/:id',
      name: 'gestionar-etiquetas',
      component: () => import('../views/GestionarEtiquetas.vue')
    },
    {
      path: '/GestionarOficinas/:id',
      name: 'gestionar-oficinas',
      component: () => import('../views/GestionarOficinas.vue')
    },
    {
      path: '/CrearOficinas',
      name: 'crear-oficina',
      component: () => import('../views/CrearOficinas.vue')
    },
    {
      path: '/EliminarOficina/:id',
      name: 'eliminar-oficina',
      component: () => import('../views/PaginaPrincipal.vue')
    },
    {
      path: '/ImagenesOficina/:id',
      name: 'ver-detalle',
      component: () => import('../views/ImagenesOficina.vue')
    },
  ]
}) 



export default router
