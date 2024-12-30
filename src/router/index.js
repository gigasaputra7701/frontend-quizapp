import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Test from "../views/Test.vue";
import Result from "../views/Result.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import NotFound from "../views/NotFound.vue";
import AdminHome from "../views/admin/HomeAdmin.vue";
import ListUsers from "../views/admin/ListUsers.vue";
import ListQuestions from "../views/admin/ListQuestions.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/test",
      name: "test",
      component: Test,
    },
    {
      path: "/result",
      name: "result",
      component: Result,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/admin/home",
      name: "AdminHome",
      component: AdminHome,
    },
    {
      path: "/admin/users",
      name: "ListUsers",
      component: ListUsers,
    },
    {
      path: "/admin/questions",
      name: "ListQuestions",
      component: ListQuestions,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFound,
    },
  ],
});

export default router;
