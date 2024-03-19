import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import("../components/LoginPage.vue"),
        meta:{
            title: "Login"
        }
    },
    {
        path: "/",
        name: "Mainpage",
        component: () => import("../components/MainTable.vue"),
        meta:{
            title: "Mainpage",
            requireAuth: true
        }
    },
    {
        path: "/records",
        name: "Records",
        component: () => import("../components/RecordList.vue"),
        meta:{
            title: "Records",
            requireAuth: true
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});
// router.beforeEach((to) => {
//     if(to.meta.requireAuth){
//         return {name: "Login", query: {redirect: to.fullPath}};
//     }
// });

export default router;