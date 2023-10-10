import { createRouter, createWebHistory } from "vue-router";
import { auth } from "@/configs/firebase";

const requireAuth = (to, from, next) => {
  const user = auth.currentUser;
  if (!user) next({ name: "SignIn", params: {} });
  else next();
};
const routes = [
  {
    path: "/",
    name: "UploadView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UploadView.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignIn.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SignUp.vue"),
  },
  {
    path: "/storage",
    name: "StorageView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/StorageView.vue"),
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
