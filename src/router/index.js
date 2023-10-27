import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Profissoes.vue')
    },
    {
      path: '/profissao',
      name: 'formularioNovaProfissao',
      component: () => import('../views/Profissao.vue')
    },
    {
      path: '/profissao/:codigoProfissao',
      name: 'formularioAlterarProfissao',
      component: () => import('../views/Profissao.vue')
    }
  ]
})

export default router
