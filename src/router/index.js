import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";
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
      meta: { requiresAuth: true, roles: ["participant"] },
    },
    {
      path: "/test",
      name: "test",
      component: Test,
      meta: { requiresAuth: true, roles: ["participant"] },
    },
    {
      path: "/result",
      name: "result",
      component: Result,
      meta: { requiresAuth: true, roles: ["participant"] },
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
      path: "/admin",
      name: "AdminHome",
      component: AdminHome,
      meta: { requiresAuth: true, roles: ["proctor", "recruiter", "manager"] },
    },
    {
      path: "/admin/users",
      name: "ListUsers",
      component: ListUsers,
      meta: { requiresAuth: true, roles: ["proctor", "recruiter", "manager"] },
    },
    {
      path: "/admin/questions",
      name: "ListQuestions",
      component: ListQuestions,
      meta: { requiresAuth: true, roles: ["proctor", "recruiter", "manager"] },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = !!localStorage.getItem("token");

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next("/login");
    }

    if (!userStore.isLoggedIn) {
      await userStore.fetchUserData();
    }

    const userRole = userStore.userData.role;
    const allowedRoles = to.meta.roles;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // Jika peran pengguna tidak diizinkan, redirect ke halaman 403 atau halaman lain
      return next("/notFound");
    }
  }

  next();
});

export default router;
