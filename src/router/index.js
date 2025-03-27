import { createRouter, createWebHistory } from "vue-router";
const routes= [
    {
        path: "/",
        redirect:'/home'
    },
    {
        path: '/home',
        component: () => import('@/views/home/index.vue')
    },
    {
        path: '/table',
        component: () => import('@/views/table/index.vue')
    }
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [...routes,]
});

export default router;

